import { useEffect, useMemo, useState } from 'react'
import { createRoute, getRoutes } from '../services/routeService'
import { useClients } from '../state/ClientContext'
import { useDrivers } from '../state/DriverContext'
import { useOrders } from '../state/OrderContext'
import { useVehicles } from '../state/VehicleContext'

function getToday() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function formatWindow(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })
}

function formatWeight(value) {
  return Number(value || 0).toLocaleString('es-PE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

const initialForm = {
  fecha_planificada: getToday(),
  hora_inicio: '08:00',
  conductor_id: '',
  vehiculo_id: '',
}

export default function RoutesPage() {
  const { drivers, loading: driversLoading } = useDrivers()
  const { vehicles, loading: vehiclesLoading } = useVehicles()
  const { orders, loading: ordersLoading, loadOrders } = useOrders()
  const { clients } = useClients()

  const [routes, setRoutes] = useState([])
  const [form, setForm] = useState({ ...initialForm })
  const [selectedOrderIds, setSelectedOrderIds] = useState([])
  const [loadingRoutes, setLoadingRoutes] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const activeDrivers = useMemo(
    () => drivers.filter((driver) => driver.estado === 'ACTIVO'),
    [drivers],
  )
  const availableVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.estado === 'DISPONIBLE'),
    [vehicles],
  )
  const pendingOrders = useMemo(
    () => orders.filter((order) => order.estado === 'PENDIENTE'),
    [orders],
  )
  const clientNames = useMemo(
    () => new Map(clients.map((client) => [client.cliente_id, client.nombre])),
    [clients],
  )
  const selectedOrders = useMemo(
    () => pendingOrders.filter((order) => selectedOrderIds.includes(order.pedido_id)),
    [pendingOrders, selectedOrderIds],
  )
  const selectedWeight = selectedOrders.reduce((total, order) => total + Number(order.peso_kg || 0), 0)
  const selectedVehicle = availableVehicles.find((vehicle) => vehicle.vehiculo_id === form.vehiculo_id)
  const selectedDriver = activeDrivers.find((driver) => driver.conductor_id === form.conductor_id)
  const exceedsCapacity = selectedVehicle && selectedWeight > Number(selectedVehicle.capacidad_kg)
  const lookupLoading = driversLoading || vehiclesLoading || ordersLoading

  async function loadRoutes() {
    setLoadingRoutes(true)
    try {
      const data = await getRoutes()
      setRoutes(data)
      setMessage('')
      setMessageType('')
      return true
    } catch (error) {
      setMessage(error.message || 'No se pudieron consultar las rutas.')
      setMessageType('error')
      return false
    } finally {
      setLoadingRoutes(false)
    }
  }

  useEffect(() => {
    void loadRoutes()
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function toggleOrder(orderId) {
    setSelectedOrderIds((current) => (
      current.includes(orderId)
        ? current.filter((id) => id !== orderId)
        : [...current, orderId]
    ))
  }

  async function submitRoute(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    if (selectedOrderIds.length === 0) {
      setMessage('Selecciona al menos un pedido pendiente.')
      setMessageType('error')
      return
    }
    if (!selectedDriver || !selectedVehicle) {
      setMessage('Selecciona un conductor activo y un vehículo disponible.')
      setMessageType('error')
      return
    }
    if (form.hora_inicio < selectedDriver.disponibilidad_inicio || form.hora_inicio >= selectedDriver.disponibilidad_fin) {
      setMessage(`El conductor está disponible de ${selectedDriver.disponibilidad_inicio.slice(0, 5)} a ${selectedDriver.disponibilidad_fin.slice(0, 5)}.`)
      setMessageType('error')
      return
    }
    if (exceedsCapacity) {
      setMessage('La carga seleccionada supera la capacidad del vehículo.')
      setMessageType('error')
      return
    }

    setSaving(true)
    try {
      await createRoute({
        fecha_planificada: form.fecha_planificada,
        hora_inicio: form.hora_inicio,
        conductor_id: form.conductor_id,
        vehiculo_id: form.vehiculo_id,
        pedido_ids: selectedOrderIds,
      })
      setSelectedOrderIds([])
      setForm({ ...initialForm, fecha_planificada: form.fecha_planificada })
      const routesRefreshed = await loadRoutes()
      await loadOrders()
      setMessageType(routesRefreshed ? 'success' : 'error')
      setMessage(
        routesRefreshed
          ? 'Ruta planificada y pedidos asignados correctamente.'
          : 'La ruta se registró, pero no se pudo actualizar el listado. Usa “Actualizar listado”.',
      )
    } catch (error) {
      setMessageType('error')
      setMessage(error.message || 'No se pudo planificar la ruta.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="container">
      <header className="page-heading">
        <div>
          <p className="section-kicker">PLANIFICACIÓN OPERATIVA · US-013</p>
          <h1>Rutas y asignaciones</h1>
          <p>Asigna pedidos pendientes a un conductor activo y un vehículo disponible, respetando la capacidad de carga y el horario declarado.</p>
        </div>
        <span className="status success-status">Planificación manual</span>
      </header>

      <div className="route-notice" role="note">
        Esta versión registra las asignaciones y la secuencia elegida de pedidos. El cálculo automático de distancias y la optimización por carretera son una mejora posterior.
      </div>

      <section className="grid routes-grid">
        <article className="card form-card">
          <div className="card-heading">
            <div>
              <p className="section-kicker">US-013 · Nueva ruta</p>
              <h2>Planificar ruta</h2>
              <p>Selecciona los recursos y el orden de entrega.</p>
            </div>
          </div>

          {activeDrivers.length === 0 || availableVehicles.length === 0 || pendingOrders.length === 0 ? (
            <div className="empty-state">
              <p>
                {activeDrivers.length === 0 && 'Registra al menos un conductor activo. '}
                {availableVehicles.length === 0 && 'Necesitas un vehículo disponible. '}
                {pendingOrders.length === 0 && 'No hay pedidos pendientes para asignar.'}
              </p>
              {activeDrivers.length === 0 && <button className="secondary" type="button" onClick={() => { window.location.hash = '/conductores' }}>Ir a Conductores</button>}
              {availableVehicles.length === 0 && <button className="secondary" type="button" onClick={() => { window.location.hash = '/flota' }}>Ir a Flota</button>}
              {pendingOrders.length === 0 && <button className="secondary" type="button" onClick={() => { window.location.hash = '/pedidos' }}>Ir a Pedidos</button>}
            </div>
          ) : (
            <form onSubmit={submitRoute}>
              <div className="route-form-grid">
                <label>
                  Fecha planificada <span className="required-mark">*</span>
                  <input type="date" name="fecha_planificada" value={form.fecha_planificada} onChange={updateField} required />
                </label>
                <label>
                  Hora de salida <span className="required-mark">*</span>
                  <input type="time" name="hora_inicio" value={form.hora_inicio} onChange={updateField} required />
                </label>
                <label className="full-width">
                  Conductor <span className="required-mark">*</span>
                  <select name="conductor_id" value={form.conductor_id} onChange={updateField} required>
                    <option value="">Selecciona conductor</option>
                    {activeDrivers.map((driver) => (
                      <option key={driver.conductor_id} value={driver.conductor_id}>
                        {driver.nombre_completo} · {driver.disponibilidad_inicio.slice(0, 5)}–{driver.disponibilidad_fin.slice(0, 5)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="full-width">
                  Vehículo <span className="required-mark">*</span>
                  <select name="vehiculo_id" value={form.vehiculo_id} onChange={updateField} required>
                    <option value="">Selecciona vehículo</option>
                    {availableVehicles.map((vehicle) => (
                      <option key={vehicle.vehiculo_id} value={vehicle.vehiculo_id}>
                        {vehicle.placa} · {vehicle.tipo} · {formatWeight(vehicle.capacidad_kg)} kg
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="route-order-heading">
                <div>
                  <h3>Pedidos para la ruta</h3>
                  <p>El orden de selección determina la secuencia registrada.</p>
                </div>
                <span className="module-badge">{selectedOrderIds.length} seleccionado(s)</span>
              </div>

              <div className="route-order-list">
                {pendingOrders.map((order) => (
                  <label className="route-order-option" key={order.pedido_id}>
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.includes(order.pedido_id)}
                      onChange={() => toggleOrder(order.pedido_id)}
                    />
                    <span>
                      <strong>{clientNames.get(order.cliente_id) || 'Cliente sin nombre'}</strong>
                      <small>{formatWeight(order.peso_kg)} kg · {order.prioridad} · entrega: {formatWindow(order.ventana_inicio)}</small>
                    </span>
                  </label>
                ))}
              </div>

              <div className={`route-capacity ${exceedsCapacity ? 'over-capacity' : ''}`}>
                <span>Carga seleccionada</span>
                <strong>{formatWeight(selectedWeight)} kg{selectedVehicle ? ` / ${formatWeight(selectedVehicle.capacidad_kg)} kg` : ''}</strong>
              </div>

              <button type="submit" disabled={saving || lookupLoading || selectedOrderIds.length === 0 || Boolean(exceedsCapacity)}>
                {saving ? 'Planificando…' : 'Crear ruta y asignar pedidos'}
              </button>
            </form>
          )}

          {lookupLoading && <p className="message" role="status">Actualizando conductores, vehículos y pedidos…</p>}
          {message && <p className={`message ${messageType}`} role="status" aria-live="polite">{message}</p>}
        </article>

        <article className="card wide">
          <div className="card-heading">
            <div>
              <h2>Rutas planificadas</h2>
              <p>Asignaciones registradas en el backend.</p>
            </div>
            <button className="secondary" type="button" onClick={() => void loadRoutes()} disabled={loadingRoutes}>
              {loadingRoutes ? 'Actualizando…' : 'Actualizar listado'}
            </button>
          </div>
          <p className="result-count">{routes.length} ruta(s) registrada(s).</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Salida</th>
                  <th>Conductor</th>
                  <th>Vehículo</th>
                  <th>Pedidos</th>
                  <th>Carga total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.ruta_id}>
                    <td>{route.fecha_planificada}</td>
                    <td>{route.hora_inicio ? String(route.hora_inicio).slice(0, 5) : '—'}</td>
                    <td>{route.conductor_nombre || 'Sin asignar'}</td>
                    <td>{route.vehiculo_placa || 'Sin asignar'}</td>
                    <td>{route.cantidad_pedidos}</td>
                    <td>{formatWeight(route.peso_total_kg)} kg</td>
                    <td><span className="status-chip is-active">{route.estado}</span></td>
                  </tr>
                ))}
                {routes.length === 0 && (
                  <tr><td colSpan="7">{loadingRoutes ? 'Cargando rutas…' : 'Todavía no hay rutas. Registra la primera con el formulario.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  )
}

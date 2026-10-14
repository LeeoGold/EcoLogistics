import { useState } from 'react'
import { useClients } from '../../state/ClientContext'
import { useOrders } from '../../state/OrderContext'
import { createOrder } from '../../services/orderService'

const initialForm = {
  cliente_id: '',
  peso_kg: '',
  volumen_m3: '',
  ventana_inicio: '',
  ventana_fin: '',
  prioridad: 'ESTANDAR',
  tipo_producto: 'NO_PERECEDERO',
  referencia_entrega: '',
}

export default function OrderForm() {
  const { clients, loading: clientsLoading, message: clientsMessage, messageType: clientsMessageType, loadClients } = useClients()
  const { loadOrders } = useOrders()
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function registerOrder(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setMessageType('')

    if (new Date(form.ventana_inicio) >= new Date(form.ventana_fin)) {
      setMessageType('error')
      setMessage('La fecha y hora de inicio debe ser anterior a la fecha y hora de fin.')
      setSaving(false)
      return
    }

    const payload = {
      cliente_id: form.cliente_id,
      peso_kg: Number(form.peso_kg),
      volumen_m3: Number(form.volumen_m3),
      // datetime-local representa la hora local del navegador; ISO conserva el instante.
      ventana_inicio: new Date(form.ventana_inicio).toISOString(),
      ventana_fin: new Date(form.ventana_fin).toISOString(),
      prioridad: form.prioridad,
      tipo_producto: form.tipo_producto,
      estado: 'PENDIENTE',
      referencia_entrega: form.referencia_entrega.trim() || null,
    }

    try {
      await createOrder(payload)
      await loadOrders()
      setForm({ ...initialForm })
      setMessageType('success')
      setMessage('Pedido registrado correctamente.')
    } catch (error) {
      setMessageType('error')
      setMessage(error.message || 'No se pudo registrar el pedido.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="card form-card wide">
      <div className="card-heading stacked-mobile">
        <div>
          <p className="section-kicker">US-003 · Registro</p>
          <h2>Nuevo pedido</h2>
          <p className="form-help">
            Registra la carga y la ventana solicitada para preparar la planificación logística.
          </p>
        </div>
        <span className="module-badge">Pendiente de planificación</span>
      </div>

      {clients.length === 0 && !clientsLoading ? (
        <div className="empty-state" role="status">
          {clientsMessageType === 'error' ? (
            <>
              <p>No se pudo cargar la lista de clientes. {clientsMessage}</p>
              <button className="secondary" type="button" onClick={() => loadClients()}>
                Reintentar
              </button>
            </>
          ) : (
            <>
              <p>Primero debes registrar al menos un cliente para asociar el pedido.</p>
              <button type="button" onClick={() => { window.location.hash = '/clientes' }}>
                Ir a Clientes
              </button>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={registerOrder}>
          <div className="form-section">
            <p className="form-section-title">Datos de la carga</p>
            <div className="order-create-grid">
              <label>
                Cliente <span className="required-mark">*</span>
                <select name="cliente_id" value={form.cliente_id} onChange={updateField} required disabled={clientsLoading}>
                  <option value="">Selecciona un cliente</option>
                  {clients.map((client) => (
                    <option key={client.cliente_id} value={client.cliente_id}>
                      {client.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Peso (kg) <span className="required-mark">*</span>
                <input name="peso_kg" type="number" min="0.01" step="0.01" value={form.peso_kg} onChange={updateField} placeholder="25.5" required />
              </label>

              <label>
                Volumen (m³) <span className="required-mark">*</span>
                <input name="volumen_m3" type="number" min="0.0001" step="0.0001" value={form.volumen_m3} onChange={updateField} placeholder="0.45" required />
              </label>
            </div>
          </div>

          <div className="form-section">
            <p className="form-section-title">Ventana de entrega</p>
            <div className="order-create-grid">
              <label>
                Fecha y hora desde <span className="required-mark">*</span>
                <input type="datetime-local" name="ventana_inicio" value={form.ventana_inicio} onChange={updateField} required />
              </label>
              <label>
                Fecha y hora hasta <span className="required-mark">*</span>
                <input type="datetime-local" name="ventana_fin" value={form.ventana_fin} onChange={updateField} required />
              </label>
              <label>
                Prioridad <span className="required-mark">*</span>
                <select name="prioridad" value={form.prioridad} onChange={updateField} required>
                  <option value="EXPRESS">EXPRESS</option>
                  <option value="ESTANDAR">ESTÁNDAR</option>
                  <option value="ECONOMICO">ECONÓMICO</option>
                </select>
              </label>
              <label>
                Tipo de producto <span className="required-mark">*</span>
                <select name="tipo_producto" value={form.tipo_producto} onChange={updateField} required>
                  <option value="PERECEDERO">PERECEDERO</option>
                  <option value="NO_PERECEDERO">NO PERECEDERO</option>
                </select>
              </label>
              <label className="order-reference-field">
                Referencia para la entrega
                <input name="referencia_entrega" value={form.referencia_entrega} onChange={updateField} maxLength="255" placeholder="Ej. ingreso por puerta lateral" />
              </label>
            </div>
          </div>

          <button type="submit" disabled={saving || clientsLoading || clients.length === 0}>
            {saving ? 'Registrando…' : 'Registrar pedido'}
          </button>
        </form>
      )}

      {message && (
        <p className={`message ${messageType}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
    </article>
  )
}

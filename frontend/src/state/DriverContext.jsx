import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createDriver, getDrivers } from '../services/driverService'

const DriverContext = createContext(null)

const initialForm = {
  nombre_completo: '',
  documento_identidad: '',
  licencia: '',
  categoria_licencia: '',
  anios_experiencia: '0',
  disponibilidad_inicio: '08:00',
  disponibilidad_fin: '17:00',
  contacto: '',
  estado: 'ACTIVO',
}

export function DriverProvider({ children }) {
  const [drivers, setDrivers] = useState([])
  const [form, setForm] = useState({ ...initialForm })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  async function loadDrivers({ clearMessage = true } = {}) {
    setLoading(true)
    try {
      const data = await getDrivers()
      setDrivers(data)
      if (clearMessage) {
        setMessage('')
        setMessageType('')
      }
      return true
    } catch (error) {
      setMessage(error.message || 'No se pudieron consultar los conductores.')
      setMessageType('error')
      return false
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadDrivers()
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function registerDriver(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    if (form.disponibilidad_inicio >= form.disponibilidad_fin) {
      setMessageType('error')
      setMessage('La hora de inicio debe ser anterior a la hora de fin.')
      return
    }

    const payload = {
      ...form,
      nombre_completo: form.nombre_completo.trim(),
      documento_identidad: form.documento_identidad.trim(),
      licencia: form.licencia.trim(),
      categoria_licencia: form.categoria_licencia.trim(),
      contacto: form.contacto.trim(),
      anios_experiencia: Number(form.anios_experiencia),
    }

    setSaving(true)
    try {
      await createDriver(payload)
      setForm({ ...initialForm })
      setSearchTerm('')
      setStatusFilter('')
      const refreshed = await loadDrivers({ clearMessage: false })
      setMessageType(refreshed ? 'success' : 'error')
      setMessage(
        refreshed
          ? 'Conductor registrado correctamente.'
          : 'El conductor se registró, pero no se pudo actualizar el listado. Usa “Actualizar listado”.',
      )
    } catch (error) {
      setMessageType('error')
      setMessage(error.message || 'No se pudo registrar el conductor.')
    } finally {
      setSaving(false)
    }
  }

  const filteredDrivers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    return drivers.filter((driver) => {
      const searchableText = [
        driver.nombre_completo,
        driver.documento_identidad,
        driver.licencia,
        driver.contacto,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return (
        (!normalizedSearch || searchableText.includes(normalizedSearch)) &&
        (!statusFilter || driver.estado === statusFilter)
      )
    })
  }, [drivers, searchTerm, statusFilter])

  function clearFilters() {
    setSearchTerm('')
    setStatusFilter('')
  }

  return (
    <DriverContext.Provider
      value={{
        drivers,
        filteredDrivers,
        form,
        message,
        messageType,
        loading,
        saving,
        searchTerm,
        statusFilter,
        updateField,
        registerDriver,
        loadDrivers,
        setSearchTerm,
        setStatusFilter,
        clearFilters,
      }}
    >
      {children}
    </DriverContext.Provider>
  )
}

export function useDrivers() {
  const context = useContext(DriverContext)
  if (!context) {
    throw new Error('useDrivers debe utilizarse dentro de DriverProvider.')
  }
  return context
}

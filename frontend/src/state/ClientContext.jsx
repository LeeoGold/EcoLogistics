import { createContext, useContext, useEffect, useState } from 'react'
import { createClient, getClients } from '../services/clientService'

const ClientContext = createContext(null)

const initialForm = {
  nombre: '',
  contacto: '',
  direccion_referencia: '',
  latitud: '',
  longitud: '',
  horario_preferido_inicio: '',
  horario_preferido_fin: '',
  restricciones_acceso: '',
}

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadClients({ clearMessage = true } = {}) {
    setLoading(true)

    try {
      const data = await getClients()
      setClients(data)
      if (clearMessage) {
        setMessage('')
        setMessageType('')
      }
    } catch (error) {
      setMessageType('error')
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function registerClient(event) {
    event.preventDefault()
    setMessage('')
    setMessageType('')

    const payload = {
      ...form,
      latitud: Number(form.latitud),
      longitud: Number(form.longitud),
    }

    if (!form.horario_preferido_inicio && !form.horario_preferido_fin) {
      delete payload.horario_preferido_inicio
      delete payload.horario_preferido_fin
    }

    try {
      await createClient(payload)
      setForm({ ...initialForm })
      await loadClients({ clearMessage: false })
      setMessageType('success')
      setMessage('Cliente registrado correctamente.')
    } catch (error) {
      setMessageType('error')
      setMessage(error.message)
    }
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        form,
        message,
        messageType,
        loading,
        updateField,
        registerClient,
        loadClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export function useClients() {
  const context = useContext(ClientContext)

  if (!context) {
    throw new Error('useClients debe utilizarse dentro de ClientProvider.')
  }

  return context
}

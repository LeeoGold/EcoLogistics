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
  const [loading, setLoading] = useState(false)

  async function loadClients() {
    setLoading(true)

    try {
      const data = await getClients()
      setClients(data)
      setMessage('')
    } catch (error) {
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

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function registerClient(event) {
    event.preventDefault()
    setMessage('')

    try {
      await createClient({
        ...form,
        latitud: Number(form.latitud),
        longitud: Number(form.longitud),
      })

      setMessage('Cliente registrado correctamente.')
      setForm({ ...initialForm })
      await loadClients()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <ClientContext.Provider
      value={{
        clients,
        form,
        message,
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

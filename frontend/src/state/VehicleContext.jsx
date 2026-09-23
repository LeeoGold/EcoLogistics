import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createVehicle, getVehicles } from '../services/vehicleService'

const VehicleContext = createContext(null)

const initialForm = {
  placa: '',
  tipo: 'CAMIONETA',
  capacidad_kg: '',
  consumo_km_l: '',
  factor_co2_kg_km: '',
  anio_fabricacion: new Date().getFullYear(),
  estado: 'DISPONIBLE',
}

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  async function loadVehicles() {
    setLoading(true)
    try {
      const data = await getVehicles()
      setVehicles(data)
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function registerVehicle(event) {
    event.preventDefault()
    setMessage('')

    try {
      await createVehicle({
        ...form,
        capacidad_kg: Number(form.capacidad_kg),
        consumo_km_l: Number(form.consumo_km_l),
        factor_co2_kg_km: Number(form.factor_co2_kg_km),
        anio_fabricacion: Number(form.anio_fabricacion),
      })
      setMessage('Vehículo registrado correctamente.')
      setForm({ ...initialForm, anio_fabricacion: new Date().getFullYear() })
      await loadVehicles()
    } catch (error) {
      setMessage(error.message)
    }
  }

  const filteredVehicles = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return vehicles.filter((vehicle) => {
      const matchesPlate =
        !normalizedSearch || vehicle.placa.toLowerCase().includes(normalizedSearch)
      const matchesStatus = !statusFilter || vehicle.estado === statusFilter
      return matchesPlate && matchesStatus
    })
  }, [vehicles, searchTerm, statusFilter])

  function clearFilters() {
    setSearchTerm('')
    setStatusFilter('')
  }

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filteredVehicles,
        form,
        message,
        loading,
        searchTerm,
        statusFilter,
        updateField,
        registerVehicle,
        loadVehicles,
        setSearchTerm,
        setStatusFilter,
        clearFilters,
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export function useVehicles() {
  const context = useContext(VehicleContext)
  if (!context) {
    throw new Error('useVehicles debe utilizarse dentro de VehicleProvider.')
  }
  return context
}

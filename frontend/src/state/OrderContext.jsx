import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getOrders } from '../services/orderService'

const OrderContext = createContext(null)

const initialFilters = {
  estado: '',
  prioridad: '',
  fecha: '',
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadOrders() {
    setLoading(true)

    try {
      const data = await getOrders()
      setOrders(data)
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  function updateFilter(event) {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  function clearFilters() {
    setFilters(initialFilters)
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const orderDate = order.ventana_inicio ? order.ventana_inicio.slice(0, 10) : ''

      const matchesStatus = !filters.estado || order.estado === filters.estado
      const matchesPriority = !filters.prioridad || order.prioridad === filters.prioridad
      const matchesDate = !filters.fecha || orderDate === filters.fecha

      return matchesStatus && matchesPriority && matchesDate
    })
  }, [orders, filters])

  return (
    <OrderContext.Provider
      value={{
        orders,
        filteredOrders,
        filters,
        message,
        loading,
        updateFilter,
        clearFilters,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error('useOrders debe utilizarse dentro de OrderProvider.')
  }

  return context
}

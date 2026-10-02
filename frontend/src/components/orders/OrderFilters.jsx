import { useOrders } from '../../state/OrderContext'

export default function OrderFilters() {
  const { filters, updateFilter, clearFilters } = useOrders()

  return (
    <div className="filters order-filters">
      <label>
        Estado
        <select name="estado" value={filters.estado} onChange={updateFilter}>
          <option value="">Todos</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="EN_RUTA">EN_RUTA</option>
          <option value="ENTREGADO">ENTREGADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>
      </label>

      <label>
        Prioridad
        <select name="prioridad" value={filters.prioridad} onChange={updateFilter}>
          <option value="">Todas</option>
          <option value="EXPRESS">EXPRESS</option>
          <option value="ESTANDAR">ESTANDAR</option>
          <option value="ECONOMICO">ECONOMICO</option>
        </select>
      </label>

      <label>
        Fecha de entrega
        <input
          type="date"
          name="fecha"
          value={filters.fecha}
          onChange={updateFilter}
        />
      </label>

      <button className="secondary filter-clear" type="button" onClick={clearFilters}>
        Limpiar filtros
      </button>
    </div>
  )
}

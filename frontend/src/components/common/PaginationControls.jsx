export default function PaginationControls({ page, pageSize = 12, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize)
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, total)

  return (
    <nav className="pagination-controls" aria-label="Paginación de resultados" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
      <span className="result-count">Mostrando {first}–{last} de {total}</span>
      <div className="pagination-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button className="secondary" type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Anterior
        </button>
        <span aria-live="polite">Página {total === 0 ? 0 : page} de {totalPages}</span>
        <button className="secondary" type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          Siguiente
        </button>
      </div>
    </nav>
  )
}

function formatFieldLocation(location) {
  if (!Array.isArray(location)) return ''

  const parts = location.filter((part) => part !== 'body')
  if (parts.length === 0) return ''

  const labels = {
    nombre: 'Nombre',
    contacto: 'Contacto',
    direccion_referencia: 'Dirección de referencia',
    latitud: 'Latitud',
    longitud: 'Longitud',
    horario_preferido_inicio: 'Horario desde',
    horario_preferido_fin: 'Horario hasta',
    restricciones_acceso: 'Restricciones de acceso',
    cliente_id: 'Cliente',
    peso_kg: 'Peso',
    volumen_m3: 'Volumen',
    ventana_inicio: 'Ventana desde',
    ventana_fin: 'Ventana hasta',
    prioridad: 'Prioridad',
    tipo_producto: 'Tipo de producto',
    estado: 'Estado',
  }

  const field = parts[parts.length - 1]
  return labels[field] || String(field)
}

function formatValidationDetail(detail) {
  if (!Array.isArray(detail)) return null

  const messages = detail
    .map((item) => {
      if (typeof item === 'string') return item

      const message = item?.msg || item?.message
      if (!message) return null

      const field = formatFieldLocation(item?.loc)
      return field ? `${field}: ${message}` : message
    })
    .filter(Boolean)

  return messages.length > 0 ? messages.join(' ') : null
}

export function getApiErrorMessage(data, fallbackMessage) {
  const detail = data?.detail

  if (typeof detail === 'string' && detail.trim()) {
    return detail
  }

  const validationMessage = formatValidationDetail(detail)
  if (validationMessage) {
    return validationMessage
  }

  if (detail && typeof detail === 'object') {
    if (typeof detail.message === 'string') return detail.message
    if (typeof detail.msg === 'string') return detail.msg
  }

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message
  }

  return fallbackMessage
}

export async function parseResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data, fallbackMessage))
  }

  return data
}

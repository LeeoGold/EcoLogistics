import { useId } from 'react'

export default function InfoTooltip({ text }) {
  const tooltipId = useId()

  return (
    <span className="info-tooltip-wrap">
      <button
        className="info-tooltip"
        type="button"
        aria-label={`Información: ${text}`}
        aria-describedby={tooltipId}
      >
        i
      </button>

      <span id={tooltipId} className="info-tooltip-bubble" role="tooltip">
        {text}
      </span>
    </span>
  )
}

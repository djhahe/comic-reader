import React, { useState, useRef, useEffect } from 'react'
import './style.css'

export interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const showTooltip = () => {
    setIsVisible(true)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    const x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
    const y = triggerRect.top - tooltipRect.height - 8

    setTooltipPosition({ x, y })
  }

  useEffect(() => {
    if (isVisible) {
      updatePosition()
    }
  }, [isVisible])

  return (
    <div className="tooltip-container">
      <div
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </div>

      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip ${className}`}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
          }}
          role="tooltip"
        >
          {content}
          <div className="tooltip__arrow" />
        </div>
      )}
    </div>
  )
}

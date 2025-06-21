import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'
import './style.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  leftIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ leftIcon, className = '', ...props }, ref) => {
  const baseClass = 'input'

  return (
    <div className="input-wrapper">
      <div className="input__container">
        {leftIcon && <div className="input__icon input__icon--left">{leftIcon}</div>}

        <input ref={ref} className={cn(baseClass, className)} {...props} />
      </div>
    </div>
  )
})

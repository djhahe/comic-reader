import { Loader2 } from 'lucide-react'
import './style.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ loading = false, children, className = '', disabled, ...props }) => {
  const baseClass = 'btn'
  const loadingClass = loading ? 'btn--loading' : ''
  const disabledClass = disabled || loading ? 'btn--disabled' : ''

  const buttonClasses = [baseClass, loadingClass, disabledClass, className].filter(Boolean).join(' ')

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="btn__spinner" />}
      <span className="btn__content">{children}</span>
    </button>
  )
}

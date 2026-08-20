import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  className?: string
  icon?: ReactNode
}

const variants = {
  primary: 'bg-brick-500 text-white hover:bg-brick-600 shadow-sm',
  secondary: 'bg-ink-900 text-white hover:bg-ink-800',
  ghost: 'bg-white text-ink-900 border border-stone-300 hover:border-ink-900',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-150'

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: BaseProps & { to?: string; href?: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes}>
        {icon}
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {icon}
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  )
}

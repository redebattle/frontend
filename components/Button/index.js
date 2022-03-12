import cn from 'classnames'
import { motion } from 'framer-motion'

export default function Button({
  children,
  variant = 'full',
  size = 'md',
  className,
  onClick,
  disabled = false
}) {
  return (
    <motion.button
      disabled={disabled}
      whileTap={{ boxShadow: 'none', scale: 0.98 }}
      // className={cn(s.button, s[variant], s[size], className)}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

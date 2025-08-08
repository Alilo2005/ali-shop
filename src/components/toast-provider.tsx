'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  X, 
  AlertCircle, 
  AlertTriangle, 
  Info,
  ShoppingBag,
  Heart
} from 'lucide-react'
import { useToastStore, Toast, ToastType } from '../lib/toast-store'

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />
}

const toastStyles: Record<ToastType, string> = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

const iconStyles: Record<ToastType, string> = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400'
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { id, type, title, message, action, position } = toast

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id)
      }, toast.duration)
      
      return () => clearTimeout(timer)
    }
  }, [id, toast.duration, onRemove])

  const getSpecialIcon = () => {
    if (title.includes('cart')) return <ShoppingBag className="w-5 h-5" />
    if (title.includes('wishlist')) return <Heart className="w-5 h-5" />
    return toastIcons[type]
  }

  const getPositionStyles = () => {
    if (position) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
      
      if (isMobile) {
        return {
          position: 'fixed' as const,
          left: '1rem',
          right: '1rem',
          bottom: '6rem',
          zIndex: 9999
        }
      }
      
      return {
        position: 'fixed' as const,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999
      }
    }
    return {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      transition={{ 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.3 
      }}
      style={getPositionStyles()}
      className={`
        ${position ? 'absolute' : 'relative'} 
        w-full max-w-xs sm:max-w-sm 
        bg-white shadow-lg rounded-lg border-l-4 pointer-events-auto
        ${type === 'success' ? 'border-l-green-400' : ''}
        ${type === 'error' ? 'border-l-red-400' : ''}
        ${type === 'warning' ? 'border-l-yellow-400' : ''}
        ${type === 'info' ? 'border-l-blue-400' : ''}
      `}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconStyles[type]}`}>
            {getSpecialIcon()}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {title}
            </p>
            {message && (
              <p className="mt-1 text-sm text-gray-600 truncate">
                {message}
              </p>
            )}
            
            {action && (
              <div className="mt-2">
                <button
                  onClick={action.onClick}
                  className={`
                    text-sm font-medium px-2 py-1 rounded-md transition-colors
                    ${type === 'success' ? 'text-green-600 hover:bg-green-50' : ''}
                    ${type === 'error' ? 'text-red-600 hover:bg-red-50' : ''}
                    ${type === 'warning' ? 'text-yellow-600 hover:bg-yellow-50' : ''}
                    ${type === 'info' ? 'text-blue-600 hover:bg-blue-50' : ''}
                  `}
                >
                  {action.label}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress bar for duration */}
      {toast.duration && toast.duration > 0 && (
        <motion.div
          className={`h-1 ${
            type === 'success' ? 'bg-green-400' : 
            type === 'error' ? 'bg-red-400' : 
            type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
          }`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()

  // Separate positioned toasts from regular toasts
  const positionedToasts = toasts.filter(toast => toast.position)
  const regularToasts = toasts.filter(toast => !toast.position)

  return (
    <>
      {/* Regular toasts in top-right corner */}
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 space-y-2 sm:space-y-4 pointer-events-none">
        <AnimatePresence>
          {regularToasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Positioned toasts */}
      <AnimatePresence>
        {positionedToasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

export default ToastProvider

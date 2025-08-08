'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon
} from '@heroicons/react/24/outline'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationSystem {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const useNotifications = (): NotificationSystem => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { ...notification, id }])
    
    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return { notifications, addNotification, removeNotification }
}

const NotificationIcon = ({ type }: { type: NotificationType }) => {
  const iconClass = "h-6 w-6"
  
  switch (type) {
    case 'success':
      return <CheckCircleIcon className={`${iconClass} text-emerald-500`} />
    case 'error':
      return <XCircleIcon className={`${iconClass} text-red-500`} />
    case 'warning':
      return <ExclamationCircleIcon className={`${iconClass} text-amber-500`} />
    case 'info':
      return <InformationCircleIcon className={`${iconClass} text-blue-500`} />
  }
}

export function NotificationSystem() {
  const { notifications, addNotification, removeNotification } = useNotifications()

  // Demo notifications - you can remove this in production
  useEffect(() => {
    const demoNotifications = [
      {
        type: 'success' as NotificationType,
        title: 'Welcome!',
        message: 'Thanks for visiting Ali Shop. Enjoy your shopping experience!',
        duration: 4000,
      },
      {
        type: 'info' as NotificationType,
        title: 'New Features',
        message: 'Check out our latest collection and AI-powered recommendations.',
        duration: 6000,
      }
    ]

    // Add demo notifications with delays
    demoNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification)
      }, (index + 1) * 2000)
    })

    // Add periodic product suggestions
    const interval = setInterval(() => {
      const suggestions = [
        { title: '🔥 Hot Deal!', message: '20% off Electronics - Limited time!', type: 'info' as NotificationType },
        { title: '💝 Special Offer', message: 'Free shipping on orders over $50', type: 'success' as NotificationType },
        { title: '⭐ Trending', message: 'New arrivals in Fashion category', type: 'info' as NotificationType },
      ]
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      addNotification(randomSuggestion)
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-4 max-w-sm"
            layout
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <NotificationIcon type={notification.type} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {notification.message}
                </p>
              </div>
              <motion.button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

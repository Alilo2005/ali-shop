'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useStore } from '@/lib/store'

export function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false)
  const { toggleCart, getTotalItems } = useStore()
  const totalItems = getTotalItems()

  const buttons = [
    {
      icon: ChatBubbleLeftRightIcon,
      label: 'Chat Support',
      color: 'from-blue-500 to-purple-600',
      action: () => console.log('Open chat'),
    },
    {
      icon: HeartIcon,
      label: 'Wishlist',
      color: 'from-pink-500 to-red-500',
      action: () => window.location.href = '/wishlist',
    },
    {
      icon: ShoppingCartIcon,
      label: 'Cart',
      color: 'from-emerald-500 to-teal-600',
      action: toggleCart,
      badge: totalItems > 0 ? totalItems : undefined,
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Main FAB */}
      <motion.button
        className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${
          isOpen 
            ? 'from-red-500 to-pink-600' 
            : 'from-purple-600 to-blue-600'
        } rounded-full shadow-lg flex items-center justify-center text-white`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </motion.button>

      {/* Sub FABs */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-14 sm:bottom-16 left-0 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.label}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                {/* Button */}
                <motion.button
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${button.color} rounded-full shadow-md flex items-center justify-center text-white`}
                  onClick={button.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  <button.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  
                  {/* Badge */}
                  {button.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-bold text-[10px] sm:text-xs">
                      {button.badge}
                    </span>
                  )}
                </motion.button>
                
                {/* Label */}
                <div className="bg-black/70 text-white text-xs px-2 py-1 rounded text-nowrap">
                  {button.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

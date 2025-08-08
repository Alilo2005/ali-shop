'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  SparklesIcon
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
    {
      icon: MagnifyingGlassIcon,
      label: 'Search',
      color: 'from-orange-500 to-amber-600',
      action: () => console.log('Open search'),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main FAB */}
      <motion.button
        className={`relative w-16 h-16 bg-gradient-to-r ${
          isOpen 
            ? 'from-red-500 to-pink-600' 
            : 'from-purple-600 to-blue-600'
        } rounded-full shadow-2xl flex items-center justify-center text-white`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PlusIcon className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white"
          initial={{ scale: 0, opacity: 0.3 }}
          animate={{ scale: isOpen ? 2 : 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Sub FABs */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {buttons.map((button, index) => (
              <motion.div
                key={button.label}
                className="flex items-center space-x-3"
                initial={{ 
                  opacity: 0, 
                  x: 50, 
                  y: 20 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  x: 50, 
                  y: 20 
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              >
                {/* Label */}
                <motion.div
                  className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {button.label}
                </motion.div>
                
                {/* Button */}
                <motion.button
                  className={`relative w-12 h-12 bg-gradient-to-r ${button.color} rounded-full shadow-lg flex items-center justify-center text-white`}
                  onClick={button.action}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button.icon className="h-5 w-5" />
                  
                  {/* Badge */}
                  {button.badge && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {button.badge}
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

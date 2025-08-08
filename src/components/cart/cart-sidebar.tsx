'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { 
  XMarkIcon, 
  TrashIcon, 
  MinusIcon, 
  PlusIcon,
  ShoppingBagIcon,
  HeartIcon,
  GiftIcon,
  TruckIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CartSidebar() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useStore()
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const total = getTotalPrice()
  const totalItems = getTotalItems()

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItems(prev => new Set(prev).add(itemId))
    
    // Add a small delay for the animation
    setTimeout(() => {
      removeFromCart(itemId)
      setRemovingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 300)
  }

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const shippingThreshold = 50
  const shippingProgress = Math.min((total / shippingThreshold) * 100, 100)
  const needsForFreeShipping = Math.max(0, shippingThreshold - total)

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <motion.div 
                    className="flex h-full flex-col bg-white shadow-2xl"
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    exit={{ x: 300 }}
                  >
                    {/* Enhanced Header */}
                    <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="relative">
                            <ShoppingBagIcon className="h-7 w-7 text-white" />
                            {totalItems > 0 && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                              >
                                {totalItems}
                              </motion.span>
                            )}
                          </div>
                          <div>
                            <Dialog.Title className="text-xl font-bold text-white">
                              Shopping Cart
                            </Dialog.Title>
                            <p className="text-sm text-purple-100">
                              {totalItems} {totalItems === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                        </motion.div>
                        
                        <motion.button
                          type="button"
                          className="p-2 text-white hover:text-purple-200 hover:bg-white/10 rounded-full transition-colors"
                          onClick={toggleCart}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" />
                        </motion.button>
                      </div>

                      {/* Free Shipping Progress */}
                      {cart.length > 0 && needsForFreeShipping > 0 && (
                        <motion.div 
                          className="mt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center justify-between text-sm text-purple-100 mb-2">
                            <span className="flex items-center">
                              <TruckIcon className="h-4 w-4 mr-1" />
                              Free Shipping
                            </span>
                            <span className="font-medium">
                              {needsForFreeShipping > 0 ? `${formatPrice(needsForFreeShipping)} to go` : 'Qualified!'}
                            </span>
                          </div>
                          <div className="w-full bg-purple-800/30 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-pink-400 to-yellow-400 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${shippingProgress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Cart Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <AnimatePresence mode="popLayout">
                        {cart.length === 0 ? (
                          <motion.div 
                            className="text-center py-12"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                          >
                            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                              <ShoppingBagIcon className="h-12 w-12 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500 mb-6">Discover amazing products and start shopping!</p>
                            <Link
                              href="/products"
                              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                              onClick={toggleCart}
                            >
                              <SparklesIcon className="h-5 w-5 mr-2" />
                              Start Shopping
                            </Link>
                          </motion.div>
                        ) : (
                          <motion.div layout className="space-y-4">
                            {cart.map((item, index) => (
                              <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                  opacity: removingItems.has(item.id) ? 0 : 1, 
                                  y: 0,
                                  scale: removingItems.has(item.id) ? 0.8 : 1
                                }}
                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                              >
                                <div className="p-4">
                                  <div className="flex items-start space-x-4">
                                    {/* Product Image */}
                                    <div className="relative">
                                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={80}
                                          height={80}
                                          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                                        {item.quantity}
                                      </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                      <Link href={`/products/${item.id}`} onClick={toggleCart}>
                                        <h3 className="text-sm font-semibold text-gray-900 hover:text-purple-600 transition-colors line-clamp-2">
                                          {item.name}
                                        </h3>
                                      </Link>
                                      
                                      {item.variant && (
                                        <p className="mt-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md inline-block">
                                          {item.variant.name}
                                        </p>
                                      )}

                                      <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                          <span className="text-lg font-bold text-gray-900">
                                            {formatPrice(item.price)}
                                          </span>
                                          {item.quantity > 1 && (
                                            <span className="text-sm text-gray-500">
                                              each
                                            </span>
                                          )}
                                        </div>
                                        
                                        <div className="text-sm font-medium text-purple-600">
                                          Total: {formatPrice(item.price * item.quantity)}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Quantity and Actions */}
                                  <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <span className="text-sm font-medium text-gray-700">Qty:</span>
                                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                                        <motion.button
                                          type="button"
                                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                          className="p-1 text-gray-600 hover:text-purple-600 hover:bg-white rounded-md transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <MinusIcon className="h-4 w-4" />
                                        </motion.button>
                                        
                                        <span className="w-8 text-center font-medium text-gray-900">
                                          {item.quantity}
                                        </span>
                                        
                                        <motion.button
                                          type="button"
                                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                          className="p-1 text-gray-600 hover:text-purple-600 hover:bg-white rounded-md transition-colors"
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <PlusIcon className="h-4 w-4" />
                                        </motion.button>
                                      </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                      <motion.button
                                        type="button"
                                        className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <HeartIcon className="h-4 w-4" />
                                      </motion.button>
                                      
                                      <motion.button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Enhanced Footer / Checkout Section */}
                    {cart.length > 0 && (
                      <motion.div 
                        className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white px-4 py-6 sm:px-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {/* Order Summary */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-base font-medium text-gray-900">
                            <p>Subtotal ({totalItems} items)</p>
                            <motion.p 
                              className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                              key={total}
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {formatPrice(total)}
                            </motion.p>
                          </div>

                          {/* Shipping Info */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center text-gray-600">
                              <TruckIcon className="h-4 w-4 mr-1" />
                              <span>Shipping</span>
                            </div>
                            <span className="text-green-600 font-medium">
                              {total >= shippingThreshold ? 'FREE' : formatPrice(5.99)}
                            </span>
                          </div>

                          {/* Security Badge */}
                          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-green-50 rounded-lg py-2">
                            <ShieldCheckIcon className="h-4 w-4 text-green-600" />
                            <span>Secure checkout • SSL encrypted</span>
                          </div>

                          {/* Checkout Button */}
                          <motion.div 
                            className="mt-6"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Link
                              href="/checkout"
                              className="group relative w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                              onClick={toggleCart}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative flex items-center space-x-3">
                                <ShieldCheckIcon className="h-5 w-5" />
                                <span>Secure Checkout</span>
                                <div className="bg-white/20 px-2 py-1 rounded-lg text-sm">
                                  {formatPrice(total)}
                                </div>
                              </div>
                              
                              {/* Sparkle effect */}
                              <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" />
                                <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute bottom-3 left-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                              </div>
                            </Link>
                          </motion.div>

                          {/* Express Checkout Options */}
                          <div className="mt-4 space-y-2">
                            <div className="text-xs text-center text-gray-500 mb-3">Or pay with</div>
                            <div className="grid grid-cols-3 gap-2">
                              <motion.button
                                className="flex items-center justify-center py-2 bg-black text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                 Pay
                              </motion.button>
                              <motion.button
                                className="flex items-center justify-center py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                PayPal
                              </motion.button>
                              <motion.button
                                className="flex items-center justify-center py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                GPay
                              </motion.button>
                            </div>
                          </div>

                          {/* Continue Shopping */}
                          <div className="mt-6 flex justify-center text-center">
                            <motion.button
                              type="button"
                              className="group flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                              onClick={toggleCart}
                              whileHover={{ x: -5 }}
                            >
                              <span>←</span>
                              <span>Continue Shopping</span>
                            </motion.button>
                          </div>

                          {/* Gift Option */}
                          <motion.div 
                            className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-2">
                              <GiftIcon className="h-4 w-4 text-pink-500" />
                              <span className="text-sm font-medium text-gray-700">Send as a gift?</span>
                              <button className="ml-auto text-xs text-pink-600 hover:text-pink-700 font-medium">
                                Add gift options
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

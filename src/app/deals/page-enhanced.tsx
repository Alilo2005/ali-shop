'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FireIcon, ClockIcon, TagIcon, BoltIcon, GiftIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { products } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

// Create deal products with higher discounts
const dealProducts = products
  .filter(product => product.originalPrice && product.originalPrice > product.price)
  .map(product => ({
    ...product,
    // Add more discount for deals page
    dealPrice: product.price * 0.8, // Additional 20% off
    dealEndTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within a week
    isFlashDeal: Math.random() > 0.7, // 30% chance of being a flash deal
    stockLeft: Math.floor(Math.random() * 20) + 5, // Random stock between 5-25
  }))
  .sort((a, b) => {
    const aDiscount = ((a.originalPrice! - a.dealPrice) / a.originalPrice!) * 100
    const bDiscount = ((b.originalPrice! - b.dealPrice) / b.originalPrice!) * 100
    return bDiscount - aDiscount
  })

const dealCategories = [
  { name: 'Flash Deals', filter: (p: typeof dealProducts[0]) => p.isFlashDeal, color: 'from-red-600 to-red-800' },
  { name: 'Electronics', filter: (p: typeof dealProducts[0]) => p.category === 'electronics', color: 'from-blue-600 to-blue-800' },
  { name: 'Fashion', filter: (p: typeof dealProducts[0]) => p.category === 'fashion', color: 'from-purple-600 to-purple-800' },
  { name: 'Beauty', filter: (p: typeof dealProducts[0]) => p.category === 'beauty', color: 'from-pink-600 to-pink-800' },
  { name: 'All Deals', filter: () => true, color: 'from-green-600 to-green-800' },
]

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft('EXPIRED')
        return
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <motion.div 
      className="flex items-center text-red-600 font-bold text-sm"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <ClockIcon className="h-4 w-4 mr-1" />
      <span>{timeLeft}</span>
    </motion.div>
  )
}

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Deals')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const filteredProducts = dealProducts.filter(
    dealCategories.find(cat => cat.name === selectedCategory)?.filter || (() => true)
  )

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-red-400/8 to-orange-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-orange-400/8 to-red-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-yellow-400/5 to-red-400/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-200 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                "0 0 0 10px rgba(239, 68, 68, 0)",
                "0 0 0 0 rgba(239, 68, 68, 0)"
              ]
            }}
          >
            <FireIcon className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-sm font-semibold text-red-700 tracking-wide">Limited Time</span>
          </motion.div>
          
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight mb-6">
            Hot Deals & Offers
          </h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Unbeatable prices on your favorite products - Limited time offers you can't miss!
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {dealCategories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Products Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {filteredProducts.map((product, index) => {
            const discount = Math.round(((product.originalPrice! - product.dealPrice) / product.originalPrice!) * 100)
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Flash Deal Badge */}
                {product.isFlashDeal && (
                  <motion.div 
                    className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex items-center px-2 sm:px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BoltIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                    FLASH
                  </motion.div>
                )}

                {/* Discount Badge */}
                <motion.div 
                  className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 px-2 sm:px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-bold rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  -{discount}%
                </motion.div>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                  {imageErrors.has(product.id) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <GiftIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-2" />
                        <div className="text-xs sm:text-sm text-gray-500">Deal Product</div>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      className="w-full h-full"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(product.id)}
                      />
                    </motion.div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4">
                  <Link href={`/products/${product.id}`} className="block">
                    {/* Countdown Timer */}
                    <div className="mb-2">
                      <CountdownTimer endTime={product.dealEndTime} />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIconSolid
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Product name */}
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl font-black text-red-600">
                          {formatPrice(product.dealPrice)}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 line-through">
                          {formatPrice(product.originalPrice!)}
                        </span>
                      </div>
                      
                      <div className="text-xs sm:text-sm text-green-600 font-semibold">
                        Save: {formatPrice(product.originalPrice! - product.dealPrice)}
                      </div>
                    </div>

                    {/* Stock warning */}
                    {product.stockLeft < 10 && (
                      <motion.div 
                        className="mt-2 sm:mt-3 text-xs sm:text-sm text-orange-600 font-semibold"
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Only {product.stockLeft} left!
                      </motion.div>
                    )}
                  </Link>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out pointer-events-none" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FireIcon className="h-6 w-6 mr-3" />
            <span>View All Deals</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

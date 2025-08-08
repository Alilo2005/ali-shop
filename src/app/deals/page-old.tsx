'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FireIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
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
  { name: 'Flash Deals', filter: (p: typeof dealProducts[0]) => p.isFlashDeal },
  { name: 'Electronics', filter: (p: typeof dealProducts[0]) => p.category === 'electronics' },
  { name: 'Fashion', filter: (p: typeof dealProducts[0]) => p.category === 'fashion' },
  { name: 'Beauty', filter: (p: typeof dealProducts[0]) => p.category === 'beauty' },
  { name: 'All Deals', filter: () => true },
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
    <div className="flex items-center space-x-2 text-xs font-medium text-orange-600">
      <ClockIcon className="h-4 w-4" />
      <span>{timeLeft}</span>
    </div>
  )
}

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Deals')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const filteredProducts = dealProducts.filter(
    dealCategories.find(cat => cat.name === selectedCategory)?.filter || (() => true)
  )

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const getDiscountPercentage = (original: number, deal: number) => {
    return Math.round(((original - deal) / original) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FireIcon className="mx-auto h-16 w-16 mb-6" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Amazing Deals & Offers</h1>
            <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">Discover incredible savings on our premium products. Limited time offers you won&apos;t want to miss!</p>
            <motion.div className="mt-8 inline-flex items-center px-6 py-3 bg-white/20 rounded-lg backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <TagIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">Free shipping on all orders over $99</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Deal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {dealProducts.length}
            </div>
            <div className="text-gray-600">Active Deals</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              Up to 70%
            </div>
            <div className="text-gray-600">Maximum Savings</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {dealProducts.filter(p => p.isFlashDeal).length}
            </div>
            <div className="text-gray-600">Flash Deals</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Deals</h2>
          <div className="flex flex-wrap gap-3">
            {dealCategories.map((category, idx) => (
              <motion.button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-red-100 text-red-800 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.25) }}
                whileHover={{ y: -1 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, idx) => {
            const discountPercentage = getDiscountPercentage(product.originalPrice!, product.dealPrice)
            
            return (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                whileHover={{ y: -2 }}
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {imageErrors.has(product.id) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📦</div>
                        <div className="text-sm text-gray-500">Product Image</div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(product.id)}
                    />
                  )}
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{discountPercentage}%
                  </div>
                  
                  {/* Flash Deal Badge */}
                  {product.isFlashDeal && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      ⚡ FLASH
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <Link 
                      href={`/products/${product.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2"
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.dealPrice)}
                      </span>
                      <span className="text-sm line-through text-gray-500">
                        {formatPrice(product.originalPrice!)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      You save {formatPrice(product.originalPrice! - product.dealPrice)}
                    </div>
                  </div>

                  {/* Stock & Timer */}
                  <div className="space-y-2">
                    {product.isFlashDeal && (
                      <CountdownTimer endTime={product.dealEndTime} />
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-orange-600 font-medium">
                        {product.stockLeft < 10 ? `${product.stockLeft}` : `${product.stockLeft}`} left!
                      </span>
                      <span className="text-gray-500">
                        {product.stockLeft < 10 ? 'Almost Gone' : 'In Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-red-100 mb-6">Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

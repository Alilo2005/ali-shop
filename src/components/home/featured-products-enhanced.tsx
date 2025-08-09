'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, ShoppingCartIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatPrice } from '@/lib/utils'
import { products } from '@/lib/products'
import { useStore } from '@/lib/store'

export function FeaturedProducts() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  
  // Get featured products from our product data
  const featuredProducts = products.filter(product => product.featured).slice(0, 6)

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-200 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FireIcon className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-semibold text-orange-700 tracking-wide">Hot Picks</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-6">
            Featured Products
          </h2>
          
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Handpicked bestsellers that our customers absolutely love
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-purple-50 rounded-t-3xl">
                {imageErrors.has(product.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📦</div>
                      <div className="text-sm text-purple-500">Product Image</div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
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
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Wishlist button */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    handleWishlistToggle(product)
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isInWishlist(product.id) ? (
                    <HeartIconSolid className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-purple-600" />
                  )}
                </motion.button>

                {/* Quick add to cart */}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddToCart(product)
                  }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span className="text-sm">Quick Add</span>
                </motion.button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${product.id}`} className="block">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIconSolid
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-purple-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600">
                      ({product.rating}) · {product.reviews} reviews
                    </span>
                  </div>

                  {/* Product name */}
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-800">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-slate-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    
                    {product.originalPrice && (
                      <div className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full">
                        SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                </Link>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/products">
            <motion.div
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SparklesIcon className="h-6 w-6 mr-3" />
              <span>Discover More Products</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

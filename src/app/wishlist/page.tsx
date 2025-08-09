'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HeartIcon, 
  TrashIcon, 
  ShoppingCartIcon, 
  ShareIcon,
  SparklesIcon,
  GiftIcon,
  StarIcon as StarIconOutline,
  EyeIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useStore()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [showShareModal, setShowShareModal] = useState(false)

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const handleAddToCart = (item: typeof wishlist[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    })
  }

  const handleShare = () => {
    setShowShareModal(true)
    // In a real app, you'd implement sharing functionality
    setTimeout(() => setShowShareModal(false), 2000)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-r from-pink-400/8 to-red-400/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-r from-red-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 left-1/3 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Empty state illustration */}
            <motion.div 
              className="relative mb-6 sm:mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-100 to-red-100 rounded-full"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-4 sm:inset-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HeartIconSolid className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 text-white" />
                </motion.div>
                
                {/* Floating hearts */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 15}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <HeartIconSolid className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-pink-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-pink-500/10 via-red-500/10 to-pink-500/10 border border-pink-200 mb-4 sm:mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 mr-2" />
              <span className="text-xs sm:text-sm font-semibold text-pink-700 tracking-wide">Your Wishlist</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
              Your Wishlist is Empty
            </h1>

            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Start adding products you love to your wishlist and keep track of all your favorites in one place!
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center px-4 sm:px-0">
              <Link href="/products" className="block">
                <motion.div
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-base sm:text-lg w-full sm:w-auto justify-center"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  <span>Discover Products</span>
                </motion.div>
              </Link>

              <Link href="/deals" className="block">
                <motion.div
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl text-base sm:text-lg hover:border-pink-300 transition-colors w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GiftIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  <span>Browse Deals</span>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-r from-pink-400/8 to-red-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-48 h-24 sm:h-48 bg-gradient-to-r from-red-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-8 sm:mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-pink-500/10 via-red-500/10 to-pink-500/10 border border-pink-200 mb-4 sm:mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600 mr-2" />
            <span className="text-xs sm:text-sm font-semibold text-pink-700 tracking-wide">
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
            My Wishlist
          </h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your carefully curated collection of favorite products
          </motion.p>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.button
              onClick={handleShare}
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl text-sm sm:text-base w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Share Wishlist
            </motion.button>

            <motion.button
              onClick={clearWishlist}
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:border-red-300 hover:text-red-600 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Clear All
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                {/* Remove button */}
                <motion.button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors duration-200 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                </motion.button>

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  {imageErrors.has(item.id) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <GiftIcon className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-2" />
                        <div className="text-xs sm:text-sm text-gray-500">Wishlist Item</div>
                      </div>
                    </div>
                  ) : (
                    <motion.div 
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(item.id)}
                      />
                    </motion.div>
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Quick actions overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2 sm:space-x-3">
                      <Link href={`/products/${item.id}`}>
                        <motion.button
                          className="p-2 sm:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                        </motion.button>
                      </Link>

                      <motion.button
                        onClick={() => handleAddToCart(item)}
                        className="p-2 sm:p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <Link href={`/products/${item.id}`} className="block">
                    {/* Product name */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                      {item.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      
                      <motion.div 
                        className="flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <HeartIconSolid className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500 mr-1" />
                        <span className="text-xs sm:text-sm font-medium text-pink-600">Saved</span>
                      </motion.div>
                    </div>

                    {/* Add to cart button */}
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(item)
                      }}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-pink-600 to-red-600 text-white rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Continue Shopping */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/products">
            <motion.div
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-600 to-red-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-base sm:text-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              <span>Add More to Wishlist</span>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <ShareIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Wishlist Shared!</h3>
                <p className="text-sm sm:text-base text-gray-600">Your wishlist link has been copied to clipboard.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

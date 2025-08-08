'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { products } from '@/lib/products'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

interface ProductGridProps {
  category?: string
  search?: string
  sort?: string
}

export function ProductGrid({ category, search, sort }: ProductGridProps) {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useStore()
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Sort products
    if (sort) {
      switch (sort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          // In a real app, you'd sort by creation date
          filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
          break
        default:
          // Default sorting (featured first, then by rating)
          filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            return b.rating - a.rating
          })
      }
    }

    return filtered
  }, [category, search, sort])

  const handleImageError = (productId: string) => {
    setImageErrors(prev => new Set(prev).add(productId))
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId)
  }

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
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

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">SEARCH</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500">
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(idx * 0.03, 0.2) }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100">
              {imageErrors.has(product.id) ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📦</div>
                    <div className="text-xs text-gray-500">Product</div>
                  </div>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(product.id)}
                  />
                </motion.div>
              )}
              
              {/* Sale badge */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium">
                  Sale
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => handleWishlistToggle(product)}
                className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white"
              >
                {isInWishlist(product.id) ? (
                  <HeartIconSolid className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                ) : (
                  <HeartIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 hover:text-red-500" />
                )}
              </button>

              {/* Quick add to cart */}
              <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 shadow-lg"
                >
                  <ShoppingCartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-2 sm:p-3">
              <div className="mb-1 sm:mb-2">
                <Link 
                  href={`/products/${product.id}`}
                  className="text-xs sm:text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors line-clamp-2 leading-tight"
                >
                  {product.name}
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1 sm:mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIconSolid
                      key={i}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.rating})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <span className="text-sm sm:text-base font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div>
                {product.inStock ? (
                  <span className="text-xs text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

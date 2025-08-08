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
      <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: Math.min(idx * 0.03, 0.2) }}
            whileHover={{ y: -2 }}
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
              {imageErrors.has(product.id) ? (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="text-center">
                    <div className="text-4xl mb-2">PRODUCT</div>
                    <div className="text-sm text-gray-500">Product Image</div>
                  </div>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.03 }} className="w-full h-full">
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
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Sale
                </div>
              )}

              {/* Wishlist button */}
              <button
                onClick={() => handleWishlistToggle(product)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {isInWishlist(product.id) ? (
                  <HeartIconSolid className="h-4 w-4 text-red-500" />
                ) : (
                  <HeartIcon className="h-4 w-4 text-gray-600 hover:text-red-500" />
                )}
              </button>

              {/* Quick add to cart */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <Link 
                  href={`/products/${product.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
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
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="mt-2">
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

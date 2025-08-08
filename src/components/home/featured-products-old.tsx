'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
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
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our most popular and highly-rated products
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                {imageErrors.has(product.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center">
                      <div className="text-6xl mb-4">PRODUCT</div>
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
                
                {/* Sale badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Sale
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 opacity-0 group-hover:opacity-100"
                >
                  {isInWishlist(product.id) ? (
                    <HeartIcon className="h-5 w-5 text-red-500 fill-current" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600 hover:text-red-500" />
                  )}
                </button>

                {/* Quick add to cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              <div className="p-6">
                <div className="mb-3">
                  <Link 
                    href={`/products/${product.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useStore } from '@/lib/store'

interface ProductActionsProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    inStock: boolean
  }
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!product.inStock) return
    
    setIsAddingToCart(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }, i === 0 ? e.currentTarget : undefined) // Only show toast for first item
    }
    
    setIsAddingToCart(false)
  }

  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }, e.currentTarget)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors ${
            product.inStock
              ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {isAddingToCart ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        <button
          onClick={handleWishlistToggle}
          className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isInWishlist(product.id) ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Buy Now Button */}
      <button
        disabled={!product.inStock}
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors ${
          product.inStock
            ? 'bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            : 'bg-gray-400 text-white cursor-not-allowed'
        }`}
      >
        Buy Now
      </button>
    </div>
  )
}

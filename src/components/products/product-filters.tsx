'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { categories } from '@/lib/products'

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || 'all'
  const currentSort = searchParams.get('sort') || 'featured'

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' && key === 'category') {
      params.delete('category')
    } else {
      params.set(key, value)
    }
    router.push(`/products?${params.toString()}`)
  }

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Over $200', min: 200, max: Infinity },
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ]

  return (
    <div className="space-y-6">
      {/* Sort */}
      <div className="lg:hidden">
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
          Sort by
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateFilter('category', category.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                currentCategory === category.id
                  ? 'bg-indigo-100 text-indigo-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 flex items-center text-sm text-gray-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-3 w-3 ${
                        i < rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1">& up</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={() => router.push('/products')}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          Clear all filters
        </button>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    name: 'Electronics',
    href: '/products?category=electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    description: 'Latest gadgets and tech accessories',
  },
  {
    name: 'Fashion',
    href: '/products?category=fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    description: 'Trendy clothing and accessories',
  },
  {
    name: 'Beauty',
    href: '/products?category=beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'Skincare and cosmetics',
  },
  {
    name: 'Sports',
    href: '/products?category=sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    description: 'Fitness and outdoor gear',
  },
  {
    name: 'Home & Garden',
    href: '/products?category=home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    description: 'Decor and home essentials',
  },
  {
    name: 'Food & Drinks',
    href: '/products?category=food',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'Gourmet food and beverages',
  }
]

export function CategoryGrid() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (categoryName: string) => {
    setImageErrors(prev => new Set(prev).add(categoryName))
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover products tailored to your interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {imageErrors.has(category.name) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-2">SHOP</div>
                      <div className="text-sm text-gray-500">Category Image</div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(category.name)}
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  <div className="flex items-center justify-center text-sm font-medium">
                    <span>Shop Now</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            View All Products
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

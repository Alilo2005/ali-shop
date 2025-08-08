'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

const categories = [
  {
    name: 'Electronics',
    href: '/products?category=electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
    description: 'Latest gadgets and tech accessories',
    color: 'from-blue-500 to-purple-600',
    emoji: '⚡',
  },
  {
    name: 'Fashion',
    href: '/products?category=fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
    description: 'Trendy clothing and accessories',
    color: 'from-pink-500 to-rose-600',
    emoji: '👗',
  },
  {
    name: 'Beauty',
    href: '/products?category=beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'Skincare and cosmetics',
    color: 'from-purple-500 to-pink-600',
    emoji: '💄',
  },
  {
    name: 'Sports',
    href: '/products?category=sports',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    description: 'Fitness and outdoor gear',
    color: 'from-emerald-500 to-teal-600',
    emoji: '🏃',
  },
  {
    name: 'Home & Garden',
    href: '/products?category=home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    description: 'Decor and home essentials',
    color: 'from-amber-500 to-orange-600',
    emoji: '🏠',
  },
  {
    name: 'Food & Drinks',
    href: '/products?category=food',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    description: 'Gourmet food and beverages',
    color: 'from-red-500 to-pink-600',
    emoji: '🍽️',
  }
]

export function CategoryGrid() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (categoryName: string) => {
    setImageErrors(prev => new Set(prev).add(categoryName))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 mb-4">
            <SparklesIcon className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700">Explore Collections</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products across all categories, curated just for you
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="block">
              <motion.div
                className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -2 }}
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
                  <motion.div whileHover={{ scale: 1.03 }} className="w-full h-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(category.name)}
                    />
                  </motion.div>
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
              </motion.div>
            </Link>
          ))}
    </motion.div>

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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

const categories = [
  { 
    name: 'Electronics', 
    description: 'Latest gadgets & tech',
    href: '/products?category=electronics',
    image: '/api/placeholder/400/300',
    color: 'from-blue-600 to-blue-800',
    accent: 'blue'
  },
  { 
    name: 'Fashion', 
    description: 'Trendy clothing & accessories',
    href: '/products?category=fashion',
    image: '/api/placeholder/400/300',
    color: 'from-purple-600 to-purple-800',
    accent: 'purple'
  },
  { 
    name: 'Beauty', 
    description: 'Skincare & cosmetics',
    href: '/products?category=beauty',
    image: '/api/placeholder/400/300',
    color: 'from-pink-600 to-pink-800',
    accent: 'pink'
  },
  { 
    name: 'Sports', 
    description: 'Fitness & outdoor gear',
    href: '/products?category=sports',
    image: '/api/placeholder/400/300',
    color: 'from-green-600 to-green-800',
    accent: 'green'
  },
  { 
    name: 'Home & Garden', 
    description: 'Furniture & decor',
    href: '/products?category=home',
    image: '/api/placeholder/400/300',
    color: 'from-orange-600 to-orange-800',
    accent: 'orange'
  },
  { 
    name: 'Food & Drinks', 
    description: 'Gourmet food & beverages',
    href: '/products?category=food',
    image: '/api/placeholder/400/300',
    color: 'from-cyan-600 to-cyan-800',
    accent: 'cyan'
  },
]

export default function CategoryGridEnhanced() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (categoryName: string) => {
    setImageErrors(prev => new Set(prev).add(categoryName))
  }

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-200 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SparklesIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide">Explore Collections</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent leading-tight">
            Shop by Category
          </h2>
          
          <motion.p 
            className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover curated collections across every category, handpicked for quality and style
          </motion.p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
              >
                {/* Dynamic gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-95 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Animated overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 group-hover:from-black/10 transition-all duration-300" />
                
                {/* Content container */}
                <div className="relative p-4 sm:p-6 h-48 sm:h-56 flex flex-col justify-between">
                  {/* Top section with title */}
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base mt-1 sm:mt-2 font-medium">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom CTA section */}
                  <motion.div 
                    className="flex items-center text-white font-semibold text-sm sm:text-base"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-2">Shop Now</span>
                    <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  
                  {/* Decorative floating elements */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 180,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  />
                  
                  <motion.div 
                    className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: -180,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                  />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Enhanced View All Section */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/products">
            <motion.div
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="mr-2 sm:mr-3 text-base sm:text-lg">View All Products</span>
              <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

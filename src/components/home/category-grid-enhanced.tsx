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
    href: '/categories/electronics',
    image: '/api/placeholder/400/300',
    icon: '⚡',
    color: 'from-blue-500 via-purple-500 to-indigo-600',
    accent: 'blue'
  },
  { 
    name: 'Fashion', 
    description: 'Trendy clothing & accessories',
    href: '/categories/fashion',
    image: '/api/placeholder/400/300',
    icon: '👗',
    color: 'from-pink-500 via-rose-500 to-red-500',
    accent: 'pink'
  },
  { 
    name: 'Beauty', 
    description: 'Skincare & cosmetics',
    href: '/categories/beauty',
    image: '/api/placeholder/400/300',
    icon: '💄',
    color: 'from-purple-500 via-pink-500 to-rose-500',
    accent: 'purple'
  },
  { 
    name: 'Sports', 
    description: 'Fitness & outdoor gear',
    href: '/categories/sports',
    image: '/api/placeholder/400/300',
    icon: '🏃',
    color: 'from-green-500 via-emerald-500 to-teal-500',
    accent: 'green'
  },
  { 
    name: 'Home', 
    description: 'Furniture & decor',
    href: '/categories/home',
    image: '/api/placeholder/400/300',
    icon: '🏠',
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    accent: 'orange'
  },
  { 
    name: 'Kitchen', 
    description: 'Cookware & appliances',
    href: '/categories/kitchen',
    image: '/api/placeholder/400/300',
    icon: '🍽️',
    color: 'from-cyan-500 via-sky-500 to-blue-500',
    accent: 'cyan'
  },
]

export default function CategoryGridEnhanced() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (categoryName: string) => {
    setImageErrors(prev => new Set(prev).add(categoryName))
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-200 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SparklesIcon className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-semibold text-purple-700 tracking-wide">Explore Collections</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent leading-tight">
            Shop by Category
          </h2>
          
          <motion.p 
            className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
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
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
                  y: -12, 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu"
              >
                {/* Dynamic gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-95 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Animated overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 group-hover:from-black/10 transition-all duration-500" />
                
                {/* Content container */}
                <div className="relative p-8 h-80 flex flex-col justify-between">
                  {/* Top section with icon and title */}
                  <div className="space-y-4">
                    <motion.div 
                      className="text-6xl filter drop-shadow-lg"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    
                    <div>
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-lg mt-2 font-medium">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom CTA section */}
                  <motion.div 
                    className="flex items-center text-white font-semibold text-lg"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="mr-3">Shop Now</span>
                    <ArrowRightIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  
                  {/* Decorative floating elements */}
                  <motion.div 
                    className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.5, 
                      rotate: 180,
                      transition: { duration: 0.6, ease: "easeOut" }
                    }}
                  />
                  
                  <motion.div 
                    className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.8, 
                      rotate: -180,
                      transition: { duration: 0.8, ease: "easeOut" }
                    }}
                  />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Enhanced View All Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/products">
            <motion.div
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="mr-3 text-lg">View All Products</span>
              <ArrowRightIcon className="h-5 w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

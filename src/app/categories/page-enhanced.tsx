'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRightIcon, TagIcon, SparklesIcon, CubeIcon } from '@heroicons/react/24/outline'

const categoryDetails = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge technology and gadgets for the modern lifestyle',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
    features: ['Latest Technology', 'Warranty Included', 'Expert Support', 'Fast Shipping'],
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Smart Home', 'Accessories'],
    color: 'from-blue-600 to-blue-800',
    accent: 'blue'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy and timeless pieces for every style and occasion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    features: ['Latest Trends', 'Quality Materials', 'Size Guide', 'Easy Returns'],
    subcategories: ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Watches'],
    color: 'from-purple-600 to-purple-800',
    accent: 'purple'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Premium skincare, makeup, and wellness products',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
    features: ['Natural Ingredients', 'Dermatologist Tested', 'Cruelty Free', 'Expert Reviews'],
    subcategories: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care', 'Wellness', 'Tools'],
    color: 'from-pink-600 to-pink-800',
    accent: 'pink'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'High-performance gear for athletes and fitness enthusiasts',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    features: ['Performance Tested', 'Durable Materials', 'Professional Grade', 'Training Support'],
    subcategories: ['Fitness', 'Running', 'Team Sports', 'Outdoor', 'Equipment', 'Apparel'],
    color: 'from-green-600 to-green-800',
    accent: 'green'
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Beautiful and functional items for your living space',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    features: ['Quality Design', 'Sustainable Materials', 'Style Guide', 'Room Planning'],
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Organization', 'Lighting'],
    color: 'from-orange-600 to-orange-800',
    accent: 'orange'
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    description: 'Gourmet ingredients and artisanal beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop',
    features: ['Organic Options', 'Fresh Quality', 'Recipe Ideas', 'Fast Delivery'],
    subcategories: ['Groceries', 'Beverages', 'Snacks', 'Organic', 'International', 'Gourmet'],
    color: 'from-cyan-600 to-cyan-800',
    accent: 'cyan'
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div 
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-200 mb-4 sm:mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <TagIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
            <span className="text-xs sm:text-sm font-semibold text-purple-700 tracking-wide">Browse Collections</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
            Product Categories
          </h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore our curated collections designed to meet every need and lifestyle
          </motion.p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {categoryDetails.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -4,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Category Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-2xl">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                
                {/* Category name overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed line-clamp-2">
                  {category.description}
                </p>

                {/* Features */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-1 sm:gap-2">
                    {category.features.slice(0, 4).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-xs sm:text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                      >
                        <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2 sm:mb-3">
                    Popular Items
                  </h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {category.subcategories.slice(0, 4).map((sub, idx) => (
                      <motion.span
                        key={idx}
                        className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${category.color} text-white`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {sub}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/products?category=${category.id}`}>
                  <motion.div
                    className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${category.color} text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="mr-2 sm:mr-3 text-sm sm:text-base">Explore {category.name}</span>
                    <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                </Link>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 ease-out pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

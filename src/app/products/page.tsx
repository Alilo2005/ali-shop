'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductSearch } from '@/components/products/product-search'
import { SparklesIcon, CubeIcon, FireIcon } from '@heroicons/react/24/outline'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [params, setParams] = useState({
    category: '',
    search: '',
    sort: ''
  })

  useEffect(() => {
    setParams({
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || ''
    })
  }, [searchParams])
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse delay-500" />
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
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-200 mb-4 sm:mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CubeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
            <span className="text-xs sm:text-sm font-semibold text-blue-700 tracking-wide">Product Collection</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
            Our Products
          </h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover amazing products with AI-powered recommendations tailored just for you
          </motion.p>
        </motion.div>

        {/* Enhanced Search */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ProductSearch />
        </motion.div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-8 xl:gap-12">
          {/* Enhanced Filters */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <ProductFilters />
          </motion.div>

          {/* Enhanced Products Grid */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid 
                category={params.category}
                search={params.search}
                sort={params.sort}
              />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

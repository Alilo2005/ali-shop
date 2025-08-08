'use client'

import Link from 'next/link'
import { ArrowRightIcon, StarIcon, ShieldCheckIcon, TruckIcon, HeartIcon, SparklesIcon, FireIcon, BoltIcon, GiftIcon } from '@heroicons/react/24/outline'
import { HeroSection } from '@/components/home/hero-section-new'
import { FeaturedProducts } from '@/components/home/featured-products-enhanced'
import CategoryGrid from '@/components/home/category-grid-enhanced'
import { TestimonialSection } from '@/components/home/testimonial-section-enhanced'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { motion } from 'framer-motion'

const features = [
  {
    name: 'Lightning Fast Delivery',
    description: 'Free same-day shipping on orders over $50',
    icon: BoltIcon,
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
  },
  {
    name: 'Fort Knox Security',
    description: 'Bank-level encryption for all transactions',
    icon: ShieldCheckIcon,
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    name: 'Premium Quality',
    description: '90-day satisfaction guarantee',
    icon: StarIcon,
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    name: 'VIP Support',
    description: 'Dedicated concierge service',
    icon: HeartIcon,
    gradient: 'from-red-400 to-pink-500',
    bgGradient: 'from-red-50 to-pink-50',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Enhanced Features Bar */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/50 to-pink-50/50 border-t border-purple-100/50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose 
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Ali Shop</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience shopping like never before with our premium features and exceptional service
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="group relative h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`relative p-6 h-64 rounded-2xl bg-gradient-to-br ${feature.bgGradient} border border-white/60 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-center items-center text-center`}>
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-3 leading-tight">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Floating sparkle effect */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white mb-6 border border-white/20">
              <SparklesIcon className="h-4 w-4 mr-2" />
              Join thousands of happy customers
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Ready to get
              <span className="block bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                started?
              </span>
            </h2>
            
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-blue-100 sm:text-2xl">
              Join thousands of satisfied customers and discover your perfect products today. 
              <span className="block mt-2 text-lg text-white/80">Experience the future of shopping.</span>
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                Shop Now
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/about"
                className="group inline-flex items-center justify-center rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                Learn More
                <div className="ml-2 h-5 w-5 rounded-full border-2 border-current flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <div className="h-2 w-2 bg-current rounded-full"></div>
                </div>
              </Link>
            </div>
            
            {/* Stats or trust indicators */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-blue-100 text-sm mt-1">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-blue-100 text-sm mt-1">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-blue-100 text-sm mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
}

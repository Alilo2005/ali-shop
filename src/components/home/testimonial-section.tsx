'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon, TruckIcon, ShieldCheckIcon, SparklesIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    id: 1,
    content: "The quality of products is exceptional, and the AI recommendations helped me discover exactly what I was looking for. Shopping here has been a delightful experience!",
    author: {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      avatar: 'SJ',
      color: 'from-pink-500 to-rose-500'
    },
    rating: 5
  },
  {
    id: 2,
    content: "Fast shipping, excellent customer service, and products that exceed expectations. I've recommended this store to all my friends and family.",
    author: {
      name: 'Michael Chen',
      role: 'Premium Member',
      avatar: 'MC',
      color: 'from-blue-500 to-cyan-500'
    },
    rating: 5
  },
  {
    id: 3,
    content: "The personalized shopping experience is amazing. The website remembers my preferences and suggests products I actually want to buy.",
    author: {
      name: 'Emily Rodriguez',
      role: 'Fashion Enthusiast',
      avatar: 'ER',
      color: 'from-emerald-500 to-teal-500'
    },
    rating: 5
  }
]

const stats = [
  { 
    name: 'Happy Customers', 
    value: '50,000+',
    icon: HeartIcon,
    color: 'from-blue-600 to-blue-800'
  },
  { 
    name: 'Products Sold', 
    value: '1M+',
    icon: SparklesIcon,
    color: 'from-purple-600 to-purple-800'
  },
  { 
    name: 'Countries Served', 
    value: '25+',
    icon: TruckIcon,
    color: 'from-green-600 to-green-800'
  },
  { 
    name: 'Customer Satisfaction', 
    value: '99.5%',
    icon: ShieldCheckIcon,
    color: 'from-orange-600 to-orange-800'
  }
]

export function TestimonialSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400/3 to-blue-400/3 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Stats */}
        <motion.div 
          className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.name} 
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div 
                className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              
              <div className="mt-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {stat.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-200 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StarIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-700 tracking-wide">Customer Reviews</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-6">
            What Our Customers Say
          </h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Real stories from real customers who love shopping with us
          </motion.p>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Quote icon */}
              <motion.div 
                className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
              </motion.div>

              {/* Rating */}
              <div className="flex items-center mb-4 ml-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05, type: "spring", stiffness: 300 }}
                  >
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <motion.div 
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.author.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {testimonial.author.avatar}
                </motion.div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900">{testimonial.author.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.author.role}</div>
                </div>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none rounded-3xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HeartIcon className="h-6 w-6 mr-3" />
            <span>Join Our Happy Customers</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

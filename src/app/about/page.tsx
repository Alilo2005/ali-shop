'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  UserGroupIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bio: 'Passionate about creating exceptional shopping experiences and building sustainable business practices.',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bio: 'Technology enthusiast focused on innovation, user experience, and scalable solutions.',
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: '',
    bio: 'Creative designer with a passion for beautiful, functional, and accessible user interfaces.',
    color: 'from-pink-600 to-pink-800'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Strategic marketer dedicated to connecting brands with customers through compelling storytelling.',
    color: 'from-green-600 to-green-800'
  }
]

const values = [
  {
    icon: HeartIcon,
    title: 'Customer First',
    description: 'Every decision we make is guided by what\'s best for our customers.',
    color: 'from-red-600 to-red-800'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Assurance',
    description: 'We maintain the highest standards for all products in our catalog.',
    color: 'from-blue-600 to-blue-800'
  },
  {
    icon: RocketLaunchIcon,
    title: 'Innovation',
    description: 'Constantly evolving to bring you the latest and greatest shopping experience.',
    color: 'from-purple-600 to-purple-800'
  },
  {
    icon: GlobeAltIcon,
    title: 'Sustainability',
    description: 'Committed to environmental responsibility and sustainable business practices.',
    color: 'from-green-600 to-green-800'
  }
]

const stats = [
  { label: 'Happy Customers', value: '50,000+', color: 'from-blue-600 to-blue-800' },
  { label: 'Products Available', value: '10,000+', color: 'from-purple-600 to-purple-800' },
  { label: 'Countries Served', value: '25+', color: 'from-green-600 to-green-800' },
  { label: 'Years in Business', value: '5+', color: 'from-orange-600 to-orange-800' }
]

export default function AboutPage() {
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  const handleImageError = (memberId: number) => {
    setImageErrors(prev => new Set(prev).add(memberId))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-200 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <UserGroupIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-700 tracking-wide">Our Story</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-8">
              About Our Company
            </h1>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We're passionate about connecting people with products they love. Since our founding, we've been dedicated to creating an exceptional shopping experience that combines cutting-edge technology with personal service.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-8 lg:grid-cols-4 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, staggerChildren: 0.1 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.8, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border border-purple-200 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SparklesIcon className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-semibold text-purple-700 tracking-wide">Our Values</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              What Drives Us
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} shadow-lg mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <value.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none rounded-3xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 via-blue-500/10 to-green-500/10 border border-green-200 mb-6 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <UserGroupIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-700 tracking-wide">Meet the Team</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
              The People Behind the Magic
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Member Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                  {imageErrors.has(member.id) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <UserGroupIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  ) : (
                    <motion.div 
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(member.id)}
                      />
                    </motion.div>
                  )}
                  
                  {/* Role badge */}
                  <motion.div 
                    className={`absolute bottom-3 left-3 px-3 py-1 bg-gradient-to-r ${member.color} text-white text-xs font-bold rounded-full`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {member.role}
                  </motion.div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out pointer-events-none rounded-3xl" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
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
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-700 tracking-wide">Get in Touch</span>
            </motion.div>
            
            <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight mb-8">
              We'd Love to Hear From You
            </h2>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Have questions about our products or services? Want to share feedback? Our team is here to help.
            </motion.p>

            <motion.div
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl text-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <EnvelopeIcon className="h-6 w-6 mr-3" />
              <span>Contact Us</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

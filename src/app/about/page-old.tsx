'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  HeartIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Passionate about creating exceptional shopping experiences and building sustainable business practices.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bio: 'Technology enthusiast focused on innovation, user experience, and scalable solutions.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    bio: 'Creative designer with a passion for beautiful, functional, and accessible user interfaces.'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    bio: 'Strategic marketer dedicated to connecting brands with customers through compelling storytelling.'
  }
]

const values = [
  {
    icon: HeartIcon,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Assurance',
    description: 'We carefully curate our products and work only with trusted suppliers to guarantee quality.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Sustainability',
    description: 'We are committed to environmental responsibility and supporting sustainable business practices.'
  },
  {
    icon: TruckIcon,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to get your orders to you as fast as possible.'
  }
]

const features = [
  {
    icon: CreditCardIcon,
    title: 'Secure Payments',
    description: 'All transactions are encrypted and secure with multiple payment options.'
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: '24/7 Support',
    description: 'Our customer service team is always ready to help you with any questions.'
  },
  {
    icon: TruckIcon,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $50 with fast delivery options.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Quality Guarantee',
    description: '30-day return policy and quality guarantee on all products.'
  }
]

const stats = [
  { label: 'Happy Customers', value: '50,000+' },
  { label: 'Products Sold', value: '1M+' },
  { label: 'Countries Served', value: '25+' },
  { label: 'Years of Excellence', value: '8+' }
]

export default function AboutPage() {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const handleImageError = (memberId: string) => {
    setImageErrors(prev => new Set(prev).add(memberId))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About ShopSphere
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl leading-8 opacity-90">
              We&apos;re passionate about creating exceptional shopping experiences and connecting customers 
              with the products they love. Our mission is to make online shopping simple, secure, and enjoyable.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
              To revolutionize the online shopping experience by providing a curated selection of 
              high-quality products, exceptional customer service, and innovative technology solutions.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <value.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Impact in Numbers
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Story
              </h2>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p>
                  Founded in 2016, ShopSphere began as a small startup with a big vision: 
                  to create the most customer-centric online shopping platform in the world. 
                  What started as a simple idea has grown into a thriving marketplace serving 
                  millions of customers worldwide.
                </p>
                <p>
                  Our journey started when our founder, Sarah Johnson, experienced the frustration 
                  of poor online shopping experiences. She envisioned a platform that would prioritize 
                  customer satisfaction, product quality, and seamless user experience above all else.
                </p>
                <p>
                  Today, we&apos;re proud to partner with thousands of trusted suppliers and brands, 
                  offering everything from the latest electronics to fashion, beauty products, 
                  and home essentials. Our commitment to excellence has earned us the trust of 
                  customers in over 25 countries.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4">SHOP</div>
                    <div className="text-xl text-gray-600">Our Journey</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              The passionate individuals behind ShopSphere who work tirelessly to bring you 
              the best shopping experience possible.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full mb-6">
                  {imageErrors.has(member.id.toString()) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center">
                        <div className="text-6xl mb-2">USER</div>
                        <div className="text-sm text-gray-500">{member.name}</div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={() => handleImageError(member.id.toString())}
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose ShopSphere?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              We go above and beyond to ensure your shopping experience is seamless, 
              secure, and satisfying.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@shopsphere.com</p>
                  <p className="text-gray-600">hello@shopsphere.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri 9am-6pm EST</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    123 Commerce Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Start Shopping?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Join millions of satisfied customers and discover amazing products today.
          </p>
          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

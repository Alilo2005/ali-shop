import Link from 'next/link'
import { ArrowRightIcon, StarIcon, ShieldCheckIcon, TruckIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import CategoryGrid from '@/components/home/category-grid'
import { TestimonialSection } from '@/components/home/testimonial-section'
import { NewsletterSection } from '@/components/home/newsletter-section'

const features = [
  {
    name: 'Free Shipping',
    description: 'Free shipping on orders over $50',
    icon: TruckIcon,
  },
  {
    name: 'Secure Payments',
    description: 'Your payment information is always safe',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Quality Guarantee',
    description: '30-day return policy on all items',
    icon: StarIcon,
  },
  {
    name: 'Customer Support',
    description: '24/7 customer service support',
    icon: HeartIcon,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Bar */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
              </div>
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

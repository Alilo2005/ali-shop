import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, TagIcon } from '@heroicons/react/24/outline'

const categoryDetails = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge technology and gadgets for the modern lifestyle',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
    features: ['Latest Technology', 'Warranty Included', 'Expert Support', 'Fast Shipping'],
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Gaming', 'Smart Home', 'Accessories']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Trendy and timeless pieces for every style and occasion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    features: ['Latest Trends', 'Quality Materials', 'Size Guide', 'Easy Returns'],
    subcategories: ['Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry', 'Watches']
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Premium skincare, makeup, and wellness products',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop',
    features: ['Natural Ingredients', 'Dermatologist Tested', 'Cruelty Free', 'Expert Reviews'],
    subcategories: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care', 'Wellness', 'Tools']
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'High-performance gear for athletes and fitness enthusiasts',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    features: ['Performance Tested', 'Durable Materials', 'Professional Grade', 'Training Support'],
    subcategories: ['Fitness', 'Running', 'Team Sports', 'Outdoor', 'Equipment', 'Apparel']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Beautiful and functional items for your living space',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    features: ['Quality Design', 'Sustainable Materials', 'Style Guide', 'Room Planning'],
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden', 'Organization', 'Lighting']
  },
  {
    id: 'food',
    name: 'Food & Drinks',
    description: 'Gourmet ingredients and artisanal beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop',
    features: ['Premium Quality', 'Fresh Ingredients', 'Artisanal Crafted', 'Recipe Ideas'],
    subcategories: ['Coffee & Tea', 'Snacks', 'Beverages', 'Organic', 'International', 'Specialty']
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <TagIcon className="mx-auto h-16 w-16 mb-6 opacity-90" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Shop by Category
            </h1>
            <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
              Discover our curated collections designed to meet your every need
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categoryDetails.map((category, index) => (
            <div key={category.id} className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
              index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
            }`}>
              {/* Category Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Category Info */}
              <div className={`mt-8 lg:mt-0 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      {category.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Why Choose Our {category.name}?
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {category.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <div className="h-2 w-2 bg-indigo-600 rounded-full mr-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Popular Subcategories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/products?category=${category.id}`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      Shop {category.name}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href={`/products?category=${category.id}&sort=featured`}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      View Featured Items
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our complete product catalog or use our advanced search
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Browse All Products
            </Link>
            <Link
              href="/products?search="
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Advanced Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

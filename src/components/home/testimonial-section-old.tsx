import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    id: 1,
    content: "The quality of products is exceptional, and the AI recommendations helped me discover exactly what I was looking for. Shopping here has been a delightful experience!",
    author: {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      avatar: 'SJ',
      color: 'bg-pink-500'
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
      color: 'bg-blue-500'
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
      color: 'bg-green-500'
    },
    rating: 5
  }
]

const stats = [
  { name: 'Happy Customers', value: '50,000+' },
  { name: 'Products Sold', value: '1M+' },
  { name: 'Countries Served', value: '25+' },
  { name: 'Customer Satisfaction', value: '99.5%' }
]

export function TestimonialSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.name} className="text-center">
              <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.name}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of satisfied customers who trust us for their shopping needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className={`h-12 w-12 rounded-full ${testimonial.author.color} flex items-center justify-center text-white font-semibold text-sm`}>
                  {testimonial.author.avatar}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.author.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to join our community of happy customers?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Start Shopping
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

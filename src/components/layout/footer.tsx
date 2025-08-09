import Link from 'next/link'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaUndoAlt
} from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { GiftIcon } from '@heroicons/react/24/outline'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Investors', href: '/investors' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Live Chat', href: '/chat' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  categories: [
    { name: 'Electronics', href: '/products?category=electronics' },
    { name: 'Fashion', href: '/products?category=fashion' },
    { name: 'Home & Garden', href: '/products?category=home' },
    { name: 'Sports & Outdoors', href: '/products?category=sports' },
    { name: 'Health & Beauty', href: '/products?category=beauty' },
  ],
  social: [
    { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
    { name: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
    { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
    { name: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  ],
}

const paymentMethods = [
  { name: 'Visa', icon: FaCcVisa },
  { name: 'Mastercard', icon: FaCcMastercard },
  { name: 'American Express', icon: FaCcAmex },
  { name: 'PayPal', icon: FaCcPaypal },
  { name: 'Apple Pay', icon: FaApplePay },
  { name: 'Google Pay', icon: FaGooglePay },
]

const features = [
  { name: 'Secure Shopping', icon: FaShieldAlt, description: '256-bit SSL encryption' },
  { name: 'Free Shipping', icon: FaTruck, description: 'On orders over $50' },
  { name: '24/7 Support', icon: FaHeadset, description: 'Always here to help' },
  { name: 'Easy Returns', icon: FaUndoAlt, description: '30-day return policy' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center space-x-3">
                <feature.icon className="h-5 w-5 text-indigo-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{feature.name}</p>
                  <p className="text-xs text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <span className="font-bold text-xl text-white">Ali Shop</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Your premier destination for quality products, exceptional service, and innovative shopping experiences powered by cutting-edge technology.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <HiMail className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-gray-400">support@alishop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiPhone className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-gray-400">1-800-ALI-SHOP</span>
              </div>
              <div className="flex items-center space-x-3">
                <HiLocationMarker className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-gray-400">123 Commerce St, Tech City, TC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {footerLinks.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-center h-10 w-10 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul role="list" className="space-y-3">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Support
                </h3>
                <ul role="list" className="space-y-3">
                  {footerLinks.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Shop Categories
                </h3>
                <ul role="list" className="space-y-3">
                  {footerLinks.categories.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                    Legal
                  </h3>
                  <ul role="list" className="space-y-3">
                    {footerLinks.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Subscribe to our newsletter for exclusive deals, new product launches, and insider tips.
                </p>
                <form className="space-y-3">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autoComplete="email"
                      required
                      className="appearance-none w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                  >
                    Subscribe Now
                  </button>
                </form>
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-400 flex items-center">
                    <GiftIcon className="h-4 w-4 mr-2 text-purple-400" />
                    Join 50,000+ subscribers and get 10% off your first order!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8 md:order-2">
              {/* Payment Methods */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 font-medium">We Accept:</span>
                <div className="flex space-x-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center justify-center h-8 w-12 bg-white rounded border border-gray-300"
                      title={method.name}
                    >
                      <method.icon className="h-5 w-5 text-gray-700" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center space-x-2">
                <FaShieldAlt className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-400">SSL Secured</span>
              </div>
            </div>

            <div className="mt-8 md:order-1 md:mt-0">
              <p className="text-sm text-gray-400">
                &copy; 2024 Ali Shop, Inc. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                Built with 
                <span className="text-red-400 mx-1">♥</span>
                using Next.js, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1M+</p>
                <p className="text-xs text-gray-400">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">50K+</p>
                <p className="text-xs text-gray-400">Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-gray-400">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-gray-400">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

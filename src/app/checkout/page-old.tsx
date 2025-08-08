'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { 
  ShieldCheckIcon, 
  TruckIcon, 
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getTotalPrice, clearCart } = useStore()
  const [currentStep, setCur                </div>
              </form>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          > useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveInfo: false,
    sameAsShipping: true,
  })

  const steps = [
    { id: 1, name: 'Information', icon: UserIcon },
    { id: 2, name: 'Shipping', icon: TruckIcon },
    { id: 3, name: 'Payment', icon: CreditCardIcon },
  ]

  const total = getTotalPrice()
  const shipping = total > 100 ? 0 : 10
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinalSubmit()
    }
  }

  const handleFinalSubmit = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Clear cart and redirect to success page
    clearCart()
    router.push('/checkout/success')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <motion.div 
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-6xl">🛒</div>
          </motion.div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Discover amazing products and add them to your cart to continue
          </p>
          
          <motion.button
            onClick={() => router.push('/products')}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Start Shopping
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Secure Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'border-purple-600 bg-purple-600 text-white'
                      : 'border-gray-300 bg-white text-gray-400'
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentStep > step.id ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </motion.div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300'
                  } transition-all duration-300`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Checkout Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <form onSubmit={handleStepSubmit}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <UserIcon className="h-6 w-6 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 text-gray-900"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <MapPinIcon className="h-6 w-6 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                            placeholder="123 Main Street"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="apartment" className="block text-sm font-semibold text-gray-700 mb-2">
                            Apartment, suite, etc.
                          </label>
                          <input
                            type="text"
                            id="apartment"
                            name="apartment"
                            value={formData.apartment}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                            placeholder="Apt 4B"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="10001"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                            Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-6">
                        <LockClosedIcon className="h-6 w-6 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center">
                          <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">
                            Your payment information is secured with 256-bit SSL encryption
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-semibold text-gray-700 mb-2">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            id="nameOnCard"
                            name="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                            placeholder="John Doe"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Previous
                    </motion.button>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    className={`ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isProcessing ? 'animate-pulse' : ''
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : currentStep === 3 ? (
                      'Complete Order'
                    ) : (
                      'Continue'
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Postal code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                        Name on card
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Complete Order - ${formatPrice(finalTotal)}`}
                </button>
              </form>
            </div>

          {/* Order Summary */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-base text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {shipping === 0 && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                    <span>Free shipping on orders over $100!</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Security Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-3" />
                  <span>SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <TruckIcon className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <LockClosedIcon className="h-5 w-5 text-purple-500 mr-3" />
                  <span>Your data is protected</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white flex items-center justify-center text-xs font-bold mr-2">
                      VISA
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-600 rounded text-white flex items-center justify-center text-xs font-bold mr-2">
                      MC
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white flex items-center justify-center text-xs font-bold mr-2">
                      AMEX
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

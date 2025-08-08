'use client'

import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useEffect } from 'react'

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Generate random order number for demo
    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()
    localStorage.setItem('lastOrderNumber', orderNumber)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-500 mb-1">Order Number</div>
          <div className="text-lg font-semibold text-gray-900">
            #{typeof window !== 'undefined' ? localStorage.getItem('lastOrderNumber') : 'LOADING...'}
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-8">
          <p>A confirmation email has been sent to your email address.</p>
          <p className="mt-2">Expected delivery: 3-5 business days</p>
        </div>
        
        <div className="space-y-3">
          <Link
            href="/products"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/dashboard"
            className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}

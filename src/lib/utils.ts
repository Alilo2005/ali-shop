import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string, options: {
  currency?: 'USD' | 'EUR' | 'GBP'
  notation?: Intl.NumberFormatOptions['notation']
} = {}) {
  const { currency = 'USD', notation = 'standard' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp.slice(-6)}${random}`
}

export function calculateShipping(weight: number, distance: number = 100) {
  // Basic shipping calculation - can be enhanced with real shipping APIs
  const baseRate = 5.99
  const weightRate = weight * 0.5
  const distanceRate = distance * 0.01
  
  return Math.max(baseRate + weightRate + distanceRate, 0)
}

export function calculateTax(subtotal: number, taxRate: number = 0.08) {
  return subtotal * taxRate
}

export function generateSKU(name: string, variantId?: string) {
  const baseCode = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, 6)
  
  const timestamp = Date.now().toString().slice(-4)
  const variant = variantId ? variantId.slice(-2).toUpperCase() : ''
  
  return `${baseCode}${timestamp}${variant}`
}

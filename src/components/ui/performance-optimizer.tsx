'use client'

import { useEffect, useState } from 'react'

export function PerformanceOptimizer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop',
      'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop',
    ]

    criticalImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Optimize scroll performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          if (scrollY > 100 && !isVisible) {
            setIsVisible(true)
          } else if (scrollY <= 100 && isVisible) {
            setIsVisible(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return null
}

// Intersection Observer hook for lazy loading
export function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, rootMargin: '50px' }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return [setRef, isInView] as const
}

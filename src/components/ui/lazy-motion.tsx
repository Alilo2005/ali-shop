'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LazyMotionProps {
  children: React.ReactNode
  className?: string
  initial?: any
  animate?: any
  transition?: any
  whileHover?: any
  whileTap?: any
  [key: string]: any
}

export function LazyMotion({ children, ...motionProps }: LazyMotionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Check if mobile
    setIsMobile(window.innerWidth < 768)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    window.addEventListener('resize', handleResize)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // If user prefers reduced motion or on mobile, render a simple div
  if (prefersReducedMotion || isMobile) {
    return <div className={motionProps.className}>{children}</div>
  }

  // Otherwise render the full motion component
  return <motion.div {...motionProps}>{children}</motion.div>
}

'use client'

import { useEffect, useState, useCallback } from 'react'

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min((window.scrollY / totalHeight) * 100, 100)
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    let ticking = false

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Only add scroll listener on desktop for better mobile performance
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.addEventListener('scroll', throttledHandleScroll, { passive: true })
      return () => window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [handleScroll])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-50 transition-all duration-300 ease-out will-change-transform"
        style={{ 
          width: `${scrollProgress}%`,
          transform: 'translate3d(0,0,0)'
        }}
      />
    </>
  )
}

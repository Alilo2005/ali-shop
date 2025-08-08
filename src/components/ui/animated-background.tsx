'use client'

import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Don't render animations if user prefers reduced motion or on mobile
  if (prefersReducedMotion || typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-indigo-50/30" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Lightweight CSS-only animated gradients */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl will-change-transform" 
             style={{ 
               animation: 'gradient-shift 20s ease infinite',
               transform: 'translate3d(0,0,0)' 
             }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-bl from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl will-change-transform" 
             style={{ 
               animation: 'gradient-shift 25s ease infinite',
               animationDelay: '5s',
               transform: 'translate3d(0,0,0)' 
             }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl will-change-transform" 
             style={{ 
               animation: 'gradient-shift 30s ease infinite',
               animationDelay: '10s',
               transform: 'translate3d(0,0,0)' 
             }} />
      </div>
      
      {/* Static grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  )
}

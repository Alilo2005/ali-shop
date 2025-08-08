'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  life: number
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = [
      'rgba(168, 85, 247, 0.4)', // purple
      'rgba(59, 130, 246, 0.4)', // blue
      'rgba(236, 72, 153, 0.4)', // pink
      'rgba(16, 185, 129, 0.4)', // emerald
      'rgba(245, 101, 101, 0.4)', // red
    ]

    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      life: 1,
    })

    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => createParticle(i))
    setParticles(initialParticles)

    // Animation loop
    let animationId: number
    
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          life: particle.life - 0.005,
        })).filter(particle => particle.life > 0)
      )
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles(prev => {
        if (prev.length < 50) {
          return [...prev, createParticle(Date.now())]
        }
        return prev
      })
    }, 200)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: particle.life,
              scale: 1,
              x: particle.speedX * 100,
              y: particle.speedY * 100,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 2,
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

// Simple sound effects using Web Audio API
class SoundEffects {
  private audioContext: AudioContext | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  private createOscillator(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  hover() {
    this.createOscillator(800, 0.1, 'sine')
  }

  click() {
    this.createOscillator(1200, 0.15, 'square')
    setTimeout(() => this.createOscillator(900, 0.1, 'sine'), 50)
  }

  success() {
    this.createOscillator(523, 0.2, 'sine') // C5
    setTimeout(() => this.createOscillator(659, 0.2, 'sine'), 100) // E5
    setTimeout(() => this.createOscillator(784, 0.3, 'sine'), 200) // G5
  }

  error() {
    this.createOscillator(300, 0.3, 'sawtooth')
    setTimeout(() => this.createOscillator(250, 0.3, 'sawtooth'), 150)
  }

  notification() {
    this.createOscillator(1000, 0.1, 'sine')
    setTimeout(() => this.createOscillator(1200, 0.1, 'sine'), 100)
  }
}

const soundEffects = new SoundEffects()

export function SoundProvider() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        soundEffects.click()
      }
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      ) {
        soundEffects.hover()
      }
    }

    // Add event listeners with passive option for better performance
    document.addEventListener('click', handleClick, { passive: true })
    document.addEventListener('mouseover', handleHover, { passive: true })

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseover', handleHover)
    }
  }, [])

  return null
}

// Export the sound effects for manual use
export { soundEffects }

'use client'

import { useEffect, useState } from 'react'
import { ChatbotEnhanced } from './chatbot-enhanced'
import { ChatbotMobile } from './chatbot-mobile'

export function ChatbotResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <>
      {isMobile ? <ChatbotMobile /> : <ChatbotEnhanced />}
    </>
  )
}

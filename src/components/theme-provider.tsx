'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'ali-shop-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Apply theme to DOM IMMEDIATELY
  const applyTheme = (newTheme: Theme) => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    
    // Remove ALL possible theme classes
    root.classList.remove('light', 'dark')
    
    // Add the new theme class
    root.classList.add(newTheme)
    
    // Force style attributes for immediate effect
    if (newTheme === 'dark') {
      root.style.backgroundColor = '#0a0a0a'
      root.style.color = '#ededed'
    } else {
      root.style.backgroundColor = '#ffffff'
      root.style.color = '#171717'
    }
    
    // Set color scheme
    root.style.colorScheme = newTheme
    
    console.log('🎨 THEME APPLIED:', newTheme, 'Classes:', root.className)
  }

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true)
    
    // Get theme from localStorage or use default
    const storedTheme = localStorage.getItem(storageKey) as Theme
    const initialTheme = storedTheme || defaultTheme
    
    console.log('🚀 Initializing theme:', initialTheme)
    setThemeState(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    console.log('🔄 Setting theme to:', newTheme)
    
    // Update state
    setThemeState(newTheme)
    
    // Apply immediately
    applyTheme(newTheme)
    
    // Save to localStorage
    localStorage.setItem(storageKey, newTheme)
    
    console.log('✅ Theme set complete')
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('🔀 Toggling theme from', theme, 'to', newTheme)
    setTheme(newTheme)
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

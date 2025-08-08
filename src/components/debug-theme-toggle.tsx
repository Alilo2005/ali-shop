'use client'

import { useTheme } from '@/components/theme-provider'

export function DebugThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme()

  const handleManualToggle = () => {
    console.log('Before toggle:', { theme })
    console.log('DOM classes before:', document.documentElement.className)
    
    toggleTheme()
    
    setTimeout(() => {
      console.log('After toggle - theme should be:', theme === 'light' ? 'dark' : 'light')
      console.log('DOM classes after:', document.documentElement.className)
    }, 100)
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="text-sm mb-2">
        <div>Theme: {theme}</div>
        <div>DOM: {typeof window !== 'undefined' ? document.documentElement.className : 'N/A'}</div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleManualToggle}
          className="bg-white text-red-500 px-3 py-1 rounded text-sm font-bold"
        >
          TOGGLE
        </button>
        <button 
          onClick={() => setTheme('light')}
          className="bg-yellow-300 text-black px-3 py-1 rounded text-sm"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
        >
          Dark
        </button>
      </div>
    </div>
  )
}

'use client'

import { useTheme } from '@/components/theme-provider'
import { useEffect, useState } from 'react'

export default function ThemeTestPage() {
  const { theme, toggleTheme } = useTheme()
  const [appliedTheme, setAppliedTheme] = useState('')

  useEffect(() => {
    const updateAppliedTheme = () => {
      if (typeof window !== 'undefined') {
        const root = document.documentElement
        if (root.classList.contains('dark')) {
          setAppliedTheme('dark')
        } else if (root.classList.contains('light')) {
          setAppliedTheme('light')
        } else {
          setAppliedTheme('none')
        }
      }
    }

    updateAppliedTheme()
    
    // Watch for changes
    const observer = new MutationObserver(updateAppliedTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Theme Test Page</h1>
        
        <div className="space-y-4">
          <p>Theme setting: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{theme}</span></p>
          <p>Applied theme: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{appliedTheme}</span></p>
          
          <button
            onClick={toggleTheme}
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Toggle Theme
          </button>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <p>This box should change color when theme toggles</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Light mode: light gray background<br />
              Dark mode: dark gray background
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm">HTML element classes:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 block rounded border border-gray-200 dark:border-gray-700">
              {typeof window !== 'undefined' ? document.documentElement.className : 'Loading...'}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

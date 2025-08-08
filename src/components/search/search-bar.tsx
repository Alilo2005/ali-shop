'use client'

import { useState, useRef, useEffect, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

// Mock search suggestions - in a real app, this would come from an API
const mockSuggestions = [
  'iPhone 15 Pro',
  'MacBook Air',
  'AirPods Pro',
  'iPad Pro',
  'Apple Watch',
  'Samsung Galaxy',
  'Gaming Laptop',
  'Wireless Headphones',
  'Smart TV',
  'Bluetooth Speaker'
]

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeholder = "Search products...", onSearch }, ref) => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const router = useRouter()
    const internalRef = useRef<HTMLInputElement>(null)
    const searchRef = ref || internalRef

    // Filter suggestions based on query
    useEffect(() => {
      if (query.trim().length > 0) {
        const filtered = mockSuggestions.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
        setSuggestions(filtered)
        setShowSuggestions(filtered.length > 0)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
      setSelectedIndex(-1)
    }, [query])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        performSearch(query.trim())
      }
    }

    const performSearch = (searchQuery: string) => {
      setShowSuggestions(false)
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showSuggestions) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0) {
            performSearch(suggestions[selectedIndex])
          } else if (query.trim()) {
            performSearch(query.trim())
          }
          break
        case 'Escape':
          setShowSuggestions(false)
          setSelectedIndex(-1)
          break
      }
    }

    const handleSuggestionClick = (suggestion: string) => {
      setQuery(suggestion)
      performSearch(suggestion)
    }

    const clearSearch = () => {
      setQuery('')
      setShowSuggestions(false)
      setSelectedIndex(-1)
      if (searchRef && 'current' in searchRef) {
        searchRef.current?.focus()
      }
    }

    return (
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
          </div>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="block w-full pl-10 pr-10 py-2.5 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm hover:bg-white/15 transition-all duration-200"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl rounded-lg shadow-2xl shadow-purple-500/20 border border-white/10 z-50 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center space-x-3 ${
                    index === selectedIndex
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${
                    index === suggestions.length - 1 ? 'rounded-b-lg' : ''
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-white/60" />
                  <span>{suggestion}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

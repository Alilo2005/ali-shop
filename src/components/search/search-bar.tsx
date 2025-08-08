'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm hover:bg-white/15 transition-all duration-200"
      />
    </form>
  )
}

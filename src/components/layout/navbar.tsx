'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingCartIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon, ShoppingBagIcon, SunIcon, MoonIcon, ChartBarIcon, ArchiveBoxIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { CartSidebar } from '@/components/cart/cart-sidebar'
import { SearchBar } from '@/components/search/search-bar'
import { useTheme } from '@/components/theme-provider'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'About', href: '/about' },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()
  const { toggleCart, getTotalItems } = useStore()
  const { theme, toggleTheme } = useTheme()
  const totalItems = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/20 border-b border-purple-500/20' 
            : 'bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-lg shadow-purple-500/10'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Clean Logo */}
            <motion.div 
              className="flex items-center flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                <motion.div 
                  className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 ring-2 ring-white/20"
                  whileHover={{ rotate: 3, scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ShoppingBagIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
                </motion.div>
                <div>
                  <motion.span 
                    className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    Ali Shop
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            {/* Clean Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group backdrop-blur-sm border border-white/5 hover:border-white/20"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      layoutId="navbar-hover"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Clean Search Bar - Desktop */}
            <motion.div 
              className="hidden lg:block lg:max-w-sm lg:w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <SearchBar />
            </motion.div>

            {/* Clean Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Dark Mode Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Search - Mobile */}
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>

              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/wishlist" 
                  className="inline-flex items-center justify-center p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-pink-300/50 backdrop-blur-sm group"
                  title="Wishlist"
                >
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-pink-300 transition-colors" />
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.button
                onClick={toggleCart}
                className="group relative p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={totalItems > 0 ? { 
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" 
                } : {}}
              >
                <motion.div
                  animate={totalItems > 0 ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                </motion.div>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center shadow-lg shadow-pink-500/50 ring-2 ring-white/20 animate-pulse"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Menu */}
              {session ? (
                <div className="relative group">
                  <motion.button 
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-6 w-6 sm:h-8 sm:w-8 bg-gradient-to-br from-pink-500 via-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 ring-2 ring-white/20">
                      <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium max-w-20 sm:max-w-24 truncate text-white/90">{session.user?.name}</span>
                  </motion.button>
                  <motion.div 
                    className="absolute right-0 mt-3 w-48 bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl rounded-xl shadow-xl shadow-purple-500/20 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                    initial={{ y: -5, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                  >
                    <div className="p-2">
                      <Link href="/dashboard" className="flex items-center px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                        <ChartBarIcon className="h-4 w-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link href="/orders" className="flex items-center px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                        <ArchiveBoxIcon className="h-4 w-4 mr-3" />
                        Orders
                      </Link>
                      <Link href="/profile" className="flex items-center px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                        <UserCircleIcon className="h-4 w-4 mr-3" />
                        Profile
                      </Link>
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-pink-300 hover:bg-pink-500/20 rounded-lg transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/auth"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 hover:from-pink-600 hover:via-purple-700 hover:to-violet-700 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg shadow-pink-500/30 min-w-[75px] sm:min-w-[85px] whitespace-nowrap ring-2 ring-white/20 hover:ring-white/30"
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm ml-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Bars3Icon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div 
                className="lg:hidden py-4 border-t border-white/10"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <SearchBar />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="lg:hidden py-4 border-t border-white/10"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl font-medium transition-all duration-200 border border-transparent hover:border-white/20"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
      <CartSidebar />
    </>
  )
}

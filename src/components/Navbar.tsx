import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Menu, X, LogOut, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  currentPage?: 'landing' | 'dashboard' | 'contact'
  onNavigate?: (page: 'landing' | 'auth' | 'dashboard' | 'contact') => void
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage = 'landing', onNavigate }) => {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsMobileMenuOpen(false)
    onNavigate?.('landing')
  }

  const handleNavigation = (page: 'landing' | 'auth' | 'dashboard' | 'contact') => {
    onNavigate?.(page)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: 'Home', page: 'landing' as const, alwaysVisible: true },
    { label: 'Dashboard', page: 'dashboard' as const, requiresAuth: true },
    { label: 'Contact Us', page: 'contact' as const, alwaysVisible: true },
  ]

  return (
    <nav className="bg-gray-800/95 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation('landing')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src="/Logo-vizart.png" 
              alt="VizArt Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                // Fallback if logo doesn't exist
                e.currentTarget.style.display = 'none'
              }}
            />
            <span className="text-xl font-bold text-white">IoT Monitor</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isVisible = item.alwaysVisible || (item.requiresAuth && user)
              if (!isVisible) return null

              return (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavigation(item.page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === item.page
                      ? 'text-orange-400 bg-orange-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              )
            })}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <motion.button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => handleNavigation('auth')}
                  className="px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login / Sign Up
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700 py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isVisible = item.alwaysVisible || (item.requiresAuth && user)
                  if (!isVisible) return null

                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavigation(item.page)}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === item.page
                          ? 'text-orange-400 bg-orange-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  )
                })}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-700">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 px-4 py-2 text-gray-300">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      <motion.button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => handleNavigation('auth')}
                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Login / Sign Up
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import { LandingPage } from './components/LandingPage'
import { Dashboard } from './components/Dashboard'
import { AuthForm } from './components/AuthForm'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { useState } from 'react'

type AppState = 'landing' | 'auth' | 'dashboard' | 'contact'

function App() {
  const { user, loading } = useAuth()
  const [appState, setAppState] = useState<AppState>('landing')

  const handleNavigation = (page: AppState) => {
    setAppState(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-gray-400">Initializing...</p>
        </motion.div>
      </div>
    )
  }

  // Show dashboard if user is authenticated
  if (user) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard onNavigate={handleNavigation} />
        </motion.div>
        <Toaster position="top-right" />
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {appState === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage 
            onGetStarted={() => setAppState('auth')} 
            onNavigate={handleNavigation}
          />
        </motion.div>
      )}
      
      {appState === 'auth' && (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AuthForm onNavigate={handleNavigation} />
        </motion.div>
      )}
      
      {appState === 'contact' && (
        <motion.div
          key="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-gray-900"
        >
          <Navbar currentPage="contact" onNavigate={handleNavigation} />
          <div className="pt-16">
            <ContactSection />
          </div>
          <Footer />
        </motion.div>
      )}
      
      <Toaster position="top-right" />
    </AnimatePresence>
  )
}

export default App
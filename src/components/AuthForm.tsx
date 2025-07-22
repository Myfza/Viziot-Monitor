import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { Zap, Mail, Lock, UserPlus, LogIn, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface AuthFormProps {
  onNavigate?: (page: 'landing' | 'auth' | 'dashboard' | 'contact') => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password)

      if (error) throw error

      if (!isLogin && data.user && !data.session) {
        toast.success('Check your email for verification link!', {
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #00FFFF',
          },
        })
      }
    } catch (error: any) {
      let errorMessage = error.message
      
      // Provide more helpful error messages
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = isLogin 
          ? 'Invalid email or password. Please check your credentials and try again.'
          : 'Unable to create account. Please try a different email or check if you already have an account.'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and click the confirmation link before signing in.'
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long.'
      }
      
      toast.error(errorMessage, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FF6B6B',
        },
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar currentPage="landing" onNavigate={onNavigate} />
      
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-gray-900 to-purple-900/20" />
      
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        {/* Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500 mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">IoT Controller</h1>
          <p className="text-sm md:text-base text-gray-400 px-4">Control your devices from anywhere</p>
        </motion.div>

        {/* Auth Form */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {onNavigate && (
            <motion.button
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </motion.button>
          )}
          
          <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <>
                  {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <motion.button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-400 hover:text-orange-300 transition-colors min-h-[44px] px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </motion.button>
          </div>
        </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}
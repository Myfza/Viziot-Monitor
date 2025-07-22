import React from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Gauge, 
  Sun, 
  Wind,
  Shield,
  Zap,
  BarChart3,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ContactSection } from './ContactSection'

interface LandingPageProps {
  onGetStarted: () => void
  onNavigate?: (page: 'landing' | 'auth' | 'dashboard' | 'contact') => void
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onNavigate }) => {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Monitor your IoT sensors in real-time with live data updates and instant notifications.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Visualize sensor data with interactive charts and comprehensive analytics dashboard.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Access your IoT dashboard from any device with our fully responsive web interface.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted data transmission and secure authentication.'
    },
    {
      icon: Globe,
      title: 'Remote Access',
      description: 'Monitor your devices from anywhere in the world with cloud-based connectivity.'
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Get notified immediately when sensor values exceed your defined thresholds.'
    }
  ]

  const sensors = [
    { icon: Thermometer, name: 'Temperature', color: 'text-red-400' },
    { icon: Droplets, name: 'Humidity', color: 'text-blue-400' },
    { icon: Gauge, name: 'Pressure', color: 'text-purple-400' },
    { icon: Sun, name: 'Light', color: 'text-yellow-400' },
    { icon: Wind, name: 'Air Quality', color: 'text-green-400' }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar currentPage="landing" onNavigate={onNavigate} />
      
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-gray-900 to-red-900/20" />
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Smart IoT
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"> Monitoring</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Monitor, analyze, and control your IoT devices with real-time data visualization 
              and intelligent alerts from anywhere in the world.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-500 hover:to-red-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                className="text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg border border-gray-600 hover:border-gray-500 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Supported Sensors */}
      <motion.div 
        className="py-16 bg-gray-800/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Supported Sensor Types
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {sensors.map((sensor, index) => {
              const IconComponent = sensor.icon
              return (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-6 bg-gray-700/50 rounded-2xl border border-gray-600 hover:border-orange-400/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <IconComponent className={`w-8 h-8 mx-auto mb-3 ${sensor.color}`} />
                    <p className="text-gray-300 font-medium">{sensor.name}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="py-20 bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to monitor and manage your IoT infrastructure effectively
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div 
                  key={index} 
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-orange-400/50 transition-all duration-300 h-full">
                    <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl w-fit mb-4 group-hover:shadow-lg group-hover:shadow-orange-400/25 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="py-20 bg-gray-800/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-400">
                Built for reliability, scalability, and ease of use
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {[
                  'Real-time data streaming with WebSocket/MQTT',
                  'Interactive charts and data visualization',
                  'Mobile-responsive design for all devices',
                  'Secure user authentication and data encryption'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  'Customizable alerts and notifications',
                  'Historical data analysis and reporting',
                  'Multi-device support and management',
                  'Cloud-based with 99.9% uptime guarantee'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="py-20 bg-gradient-to-r from-orange-900/20 to-red-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Monitoring?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of users who trust our platform for their IoT monitoring needs.
          </motion.p>
          
          <motion.button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-orange-400 to-red-500 text-white px-10 py-4 rounded-xl font-semibold text-xl hover:from-orange-500 hover:to-red-600 transition-all duration-200 flex items-center space-x-3 mx-auto shadow-2xl hover:shadow-orange-400/25 transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Monitoring Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
      
      <ContactSection />
      <Footer />
    </div>
  )
}
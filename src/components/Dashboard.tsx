import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useDevices } from '../hooks/useDevices'
import { DeviceCard } from './DeviceCard'
import { AddDeviceModal } from './AddDeviceModal'
import { SensorCharts } from './SensorCharts'
import { DeviceCodeSection } from './DeviceCodeSection'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { 
  Zap, 
  Plus, 
  LogOut, 
  Wifi, 
  WifiOff,
  Activity,
  User,
  Power,
  AlertCircle,
  BarChart3,
  Home
} from 'lucide-react'

type DashboardView = 'devices' | 'charts'

interface DashboardProps {
  onNavigate?: (page: 'landing' | 'auth' | 'dashboard' | 'contact') => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, signOut } = useAuth()
  const { devices, loading, toggleDevice, addDevice, deleteDevice } = useDevices()
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentView, setCurrentView] = useState<DashboardView>('devices')

  const handleSignOut = async () => {
    await signOut()
    onNavigate?.('landing')
  }

  const onlineDevices = devices.filter(device => device.status).length
  const totalDevices = devices.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <p className="text-gray-400">Loading your devices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-gray-900 to-red-900/10" />
      
      <Navbar currentPage="dashboard" onNavigate={onNavigate} />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Dashboard Header */}
        <motion.header 
          className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 py-3 md:py-4">
            <motion.div 
              className="flex items-center justify-between mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-orange-400 to-red-500">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg md:text-2xl font-bold text-white">IoT Dashboard</h1>
                  <p className="text-gray-400 text-xs md:text-sm hidden sm:block">Control your smart devices</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            
            {/* Navigation Tabs */}
            <motion.div 
              className="flex space-x-1 bg-gray-700/50 rounded-lg p-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => setCurrentView('devices')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  currentView === 'devices'
                    ? 'bg-orange-400 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Device Control</span>
                <span className="sm:hidden">Devices</span>
              </motion.button>
              <motion.button
                onClick={() => setCurrentView('charts')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  currentView === 'charts'
                    ? 'bg-orange-400 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Chart Sensor Data</span>
                <span className="sm:hidden">Charts</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.div 
          className="container mx-auto px-4 py-4 md:py-6 flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {currentView === 'devices' && (
            <>
              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-3 md:p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">Total Devices</p>
                      <p className="text-xl md:text-2xl font-bold text-white">{totalDevices}</p>
                    </div>
                    <Activity className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-3 md:p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">Online</p>
                      <p className="text-xl md:text-2xl font-bold text-orange-400">{onlineDevices}</p>
                    </div>
                    <Wifi className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-3 md:p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">Offline</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-400">{totalDevices - onlineDevices}</p>
                    </div>
                    <WifiOff className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-3 md:p-4 col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs md:text-sm">Status</p>
                      <p className="text-sm font-medium text-orange-400">All Systems</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50"></div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Add Device Button */}
              <motion.div 
                className="flex justify-between items-center mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-lg md:text-xl font-semibold text-white">Your Devices</h2>
                <motion.button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200 min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Device</span>
                  <span className="sm:hidden">Add</span>
                </motion.button>
              </motion.div>

              {/* Devices Grid */}
              {devices.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-300 mb-2">No devices found</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-4 px-4">Add your first device to get started</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200 min-h-[44px]"
                  >
                    Add First Device
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {devices.map((device) => (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <DeviceCard
                        device={device}
                        onToggle={toggleDevice}
                        onDelete={deleteDevice}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Device Code Section */}
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <DeviceCodeSection />
              </motion.div>
            </>
          )}

          {currentView === 'charts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2">Sensor Data Charts</h2>
                <p className="text-gray-400">Real-time monitoring and data visualization</p>
              </motion.div>
              <SensorCharts />
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <Footer />

        {/* Add Device Modal */}
        <AddDeviceModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={addDevice}
        />
      </div>
    </div>
  )
}
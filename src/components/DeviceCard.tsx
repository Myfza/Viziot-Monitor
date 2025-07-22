import React from 'react'
import { Database } from '../lib/supabase'
import { 
  Lightbulb, 
  Fan, 
  Zap, 
  Camera, 
  Thermometer,
  Wifi,
  Trash2,
  Settings,
  Lock,
  Activity,
  Droplets,
  Wind,
  Shield,
  Flame,
  Eye,
  Plug,
  Volume2,
  Tv,
  Home
} from 'lucide-react'

type Device = Database['public']['Tables']['devices']['Row']

interface DeviceCardProps {
  device: Device
  onToggle: (deviceId: string, currentStatus: boolean) => void
  onDelete?: (deviceId: string) => void
}

const getDeviceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'led':
    case 'light':
    case 'smart bulb':
    case 'strip light':
      return Lightbulb
    case 'motor':
    case 'fan':
      return Fan
    case 'thermostat':
    case 'smart thermostat':
      return Thermometer
    case 'air purifier':
      return Wind
    case 'relay':
    case 'dimmer':
      return Zap
    case 'smart plug':
      return Plug
    case 'camera':
    case 'security camera':
      return Camera
    case 'smart lock':
      return Lock
    case 'motion sensor':
    case 'door sensor':
      return Activity
    case 'smoke detector':
      return Flame
    case 'temperature':
    case 'temperature sensor':
      return Thermometer
    case 'humidity':
    case 'humidity sensor':
      return Droplets
    case 'air quality':
    case 'air quality monitor':
      return Wind
    case 'light sensor':
      return Eye
    case 'water sensor':
    case 'water leak sensor':
      return Droplets
    case 'smart speaker':
      return Volume2
    case 'smart tv':
      return Tv
    case 'sound system':
      return Volume2
    default:
      return Home
  }
}

const getStatusColor = (status: boolean) => {
  return status
    ? 'from-orange-400 to-red-500'
    : 'from-gray-500 to-gray-600'
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onDelete }) => {
  const IconComponent = getDeviceIcon(device.type)
  const lastUpdated = new Date(device.last_updated).toLocaleTimeString()

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 md:p-6 hover:border-orange-400/50 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${getStatusColor(device.status)} shadow-lg`}>
            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-white truncate">{device.name}</h3>
            <p className="text-xs md:text-sm text-gray-400 truncate">{device.type}</p>
          </div>
        </div>
        
        {onDelete && (
          <button
            onClick={() => onDelete(device.id)}
            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Description */}
      {device.description && (
        <p className="text-xs md:text-sm text-gray-300 mb-4 line-clamp-2">{device.description}</p>
      )}

      {/* Status and Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${device.status ? 'bg-orange-400 shadow-lg shadow-orange-400/50' : 'bg-gray-500'} transition-all duration-200`} />
          <span className={`text-xs md:text-sm font-medium ${device.status ? 'text-orange-400' : 'text-gray-400'}`}>
            {device.status ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => onToggle(device.id, device.status)}
          className={`relative inline-flex h-7 w-12 md:h-6 md:w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800 min-h-[44px] min-w-[44px] ${
            device.status ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-5 w-5 md:h-4 md:w-4 transform rounded-full bg-white transition-transform duration-200 ${
              device.status ? 'translate-x-6 md:translate-x-6' : 'translate-x-1'
            } shadow-lg`}
          />
        </button>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-700 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Wifi className="w-4 h-4" />
          <span>GPIO {device.pin || 'N/A'}</span>
        </div>
        <span className="text-xs text-gray-500 sm:text-right">Updated: {lastUpdated}</span>
      </div>
    </div>
  )
}
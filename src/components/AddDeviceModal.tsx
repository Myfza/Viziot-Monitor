import React, { useState } from 'react'
import { X, Plus, Zap } from 'lucide-react'

interface AddDeviceModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (device: {
    name: string
    type: string
    pin?: number
    description?: string
  }) => void
}

const deviceTypes = [
  { value: 'LED', label: 'LED Light', category: 'Lighting' },
  { value: 'Smart Bulb', label: 'Smart Bulb', category: 'Lighting' },
  { value: 'Strip Light', label: 'LED Strip', category: 'Lighting' },
  { value: 'Motor', label: 'Motor/Fan', category: 'HVAC' },
  { value: 'Thermostat', label: 'Smart Thermostat', category: 'HVAC' },
  { value: 'Air Purifier', label: 'Air Purifier', category: 'HVAC' },
  { value: 'Relay', label: 'Relay Switch', category: 'Control' },
  { value: 'Smart Plug', label: 'Smart Plug', category: 'Control' },
  { value: 'Dimmer', label: 'Dimmer Switch', category: 'Control' },
  { value: 'Camera', label: 'Security Camera', category: 'Security' },
  { value: 'Smart Lock', label: 'Smart Lock', category: 'Security' },
  { value: 'Motion Sensor', label: 'Motion Sensor', category: 'Security' },
  { value: 'Door Sensor', label: 'Door/Window Sensor', category: 'Security' },
  { value: 'Smoke Detector', label: 'Smoke Detector', category: 'Security' },
  { value: 'Temperature', label: 'Temperature Sensor', category: 'Sensors' },
  { value: 'Humidity', label: 'Humidity Sensor', category: 'Sensors' },
  { value: 'Air Quality', label: 'Air Quality Monitor', category: 'Sensors' },
  { value: 'Light Sensor', label: 'Light Sensor', category: 'Sensors' },
  { value: 'Water Sensor', label: 'Water Leak Sensor', category: 'Sensors' },
  { value: 'Smart Speaker', label: 'Smart Speaker', category: 'Entertainment' },
  { value: 'Smart TV', label: 'Smart TV', category: 'Entertainment' },
  { value: 'Sound System', label: 'Sound System', category: 'Entertainment' },
]

export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('LED')
  const [pin, setPin] = useState<number | ''>('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      name,
      type,
      pin: pin === '' ? undefined : Number(pin),
      description: description || undefined,
    })
    
    // Reset form
    setName('')
    setType('LED')
    setPin('')
    setDescription('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Add New Device</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Device Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              placeholder="e.g., Living Room LED"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Device Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            >
              {deviceTypes.reduce((acc, deviceType) => {
                const category = deviceType.category
                if (!acc.find(item => item.category === category)) {
                  acc.push({ category, devices: [] })
                }
                acc.find(item => item.category === category)?.devices.push(deviceType)
                return acc
              }, [] as Array<{ category: string; devices: typeof deviceTypes }>).map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.devices.map((deviceType) => (
                    <option key={deviceType.value} value={deviceType.value}>
                      {deviceType.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GPIO Pin (Optional)
            </label>
            <input
              type="number"
              value={pin}
              onChange={(e) => setPin(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              placeholder="e.g., 2"
              min="0"
              max="39"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
              placeholder="Brief description of the device"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-400 border border-gray-600 rounded-lg hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-red-600 transition-all duration-200 flex items-center justify-center min-h-[44px]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
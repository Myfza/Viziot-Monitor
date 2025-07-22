import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts'
import { useSensorData } from '../hooks/useSensorData'
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Sun, 
  Wind,
  Activity,
  TrendingUp,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react'

export const SensorCharts: React.FC = () => {
  const { chartData, sensorReadings, isConnected, getLatestReading } = useSensorData()
  const [selectedChart, setSelectedChart] = useState<'temperature' | 'humidity' | 'pressure' | 'light' | 'air_quality'>('temperature')

  const sensorConfig = {
    temperature: {
      icon: Thermometer,
      color: '#ef4444',
      unit: '°C',
      name: 'Temperature',
      gradient: ['#ef4444', '#dc2626']
    },
    humidity: {
      icon: Droplets,
      color: '#3b82f6',
      unit: '%',
      name: 'Humidity',
      gradient: ['#3b82f6', '#2563eb']
    },
    pressure: {
      icon: Gauge,
      color: '#8b5cf6',
      unit: 'hPa',
      name: 'Pressure',
      gradient: ['#8b5cf6', '#7c3aed']
    },
    light: {
      icon: Sun,
      color: '#eab308',
      unit: 'lux',
      name: 'Light',
      gradient: ['#eab308', '#ca8a04']
    },
    air_quality: {
      icon: Wind,
      color: '#10b981',
      unit: 'AQI',
      name: 'Air Quality',
      gradient: ['#10b981', '#059669']
    }
  }

  const getCurrentValue = (sensorType: string) => {
    const latest = getLatestReading(sensorType)
    return latest?.value || chartData[chartData.length - 1]?.[sensorType as keyof typeof chartData[0]] || 0
  }

  const getValueStatus = (sensorType: string, value: number) => {
    switch (sensorType) {
      case 'temperature':
        if (value < 18) return { status: 'low', color: 'text-blue-400' }
        if (value > 30) return { status: 'high', color: 'text-red-400' }
        return { status: 'normal', color: 'text-green-400' }
      case 'humidity':
        if (value < 30) return { status: 'low', color: 'text-orange-400' }
        if (value > 70) return { status: 'high', color: 'text-blue-400' }
        return { status: 'normal', color: 'text-green-400' }
      case 'air_quality':
        if (value > 150) return { status: 'poor', color: 'text-red-400' }
        if (value > 100) return { status: 'moderate', color: 'text-yellow-400' }
        return { status: 'good', color: 'text-green-400' }
      default:
        return { status: 'normal', color: 'text-green-400' }
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}${sensorConfig[selectedChart].unit}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isConnected ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {isConnected ? (
                <Wifi className="w-5 h-5 text-green-400" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold">Connection Status</h3>
              <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connected to IoT Network' : 'Disconnected'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-400">
              {sensorReadings.length} readings received
            </span>
          </div>
        </div>
      </div>

      {/* Sensor Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(sensorConfig).map(([key, config]) => {
          const IconComponent = config.icon
          const currentValue = getCurrentValue(key)
          const status = getValueStatus(key, currentValue)
          
          return (
            <div
              key={key}
              onClick={() => setSelectedChart(key as any)}
              className={`bg-gray-800/50 border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-orange-400/50 ${
                selectedChart === key ? 'border-orange-400 bg-orange-400/10' : 'border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${config.color}20` }}>
                  <IconComponent className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <div className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">
                  {typeof currentValue === 'number' ? currentValue.toFixed(1) : '0.0'}
                  <span className="text-sm text-gray-400 ml-1">{config.unit}</span>
                </p>
                <p className="text-xs text-gray-400">{config.name}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${sensorConfig[selectedChart].color}20` }}>
              {React.createElement(sensorConfig[selectedChart].icon, {
                className: "w-6 h-6",
                style: { color: sensorConfig[selectedChart].color }
              })}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {sensorConfig[selectedChart].name} Monitoring
              </h3>
              <p className="text-sm text-gray-400">Real-time sensor data visualization</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Last 30 minutes</span>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${selectedChart}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={sensorConfig[selectedChart].color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={sensorConfig[selectedChart].color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                label={{ 
                  value: sensorConfig[selectedChart].unit, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#9ca3af' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey={selectedChart}
                stroke={sensorConfig[selectedChart].color}
                strokeWidth={2}
                fill={`url(#gradient-${selectedChart})`}
                dot={{ fill: sensorConfig[selectedChart].color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: sensorConfig[selectedChart].color, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Multi-Sensor Comparison Chart */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Multi-Sensor Overview</h3>
            <p className="text-sm text-gray-400">Compare all sensor readings</p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
              />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={false}
                name="Pressure (hPa)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Readings */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Sensor Readings</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Activity className="w-4 h-4" />
            <span>Live Updates</span>
          </div>
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {sensorReadings.slice(0, 10).map((reading) => {
            const config = sensorConfig[reading.sensorType]
            const IconComponent = config.icon
            const status = getValueStatus(reading.sensorType, reading.value)
            
            return (
              <div key={reading.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${config.color}20` }}>
                    <IconComponent className="w-4 h-4" style={{ color: config.color }} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{reading.deviceName}</p>
                    <p className="text-xs text-gray-400">{reading.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {reading.value.toFixed(1)} {reading.unit}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(reading.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
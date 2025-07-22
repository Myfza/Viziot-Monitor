import { useState, useEffect, useCallback } from 'react'
import { SensorReading, ChartDataPoint } from '../types/sensor'

// Simulated MQTT/WebSocket connection for demo purposes
// In production, replace with actual MQTT client or WebSocket connection
export const useSensorData = () => {
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Simulate real-time sensor data generation
  const generateSensorReading = useCallback((): SensorReading => {
    const deviceTypes = [
      { id: 'device-1', name: 'Living Room Sensor', location: 'Living Room' },
      { id: 'device-2', name: 'Bedroom Sensor', location: 'Bedroom' },
      { id: 'device-3', name: 'Kitchen Sensor', location: 'Kitchen' },
      { id: 'device-4', name: 'Outdoor Sensor', location: 'Garden' }
    ]

    const sensorTypes = [
      { type: 'temperature' as const, unit: '°C', min: 18, max: 35 },
      { type: 'humidity' as const, unit: '%', min: 30, max: 80 },
      { type: 'pressure' as const, unit: 'hPa', min: 980, max: 1030 },
      { type: 'light' as const, unit: 'lux', min: 0, max: 1000 },
      { type: 'air_quality' as const, unit: 'AQI', min: 0, max: 300 }
    ]

    const device = deviceTypes[Math.floor(Math.random() * deviceTypes.length)]
    const sensor = sensorTypes[Math.floor(Math.random() * sensorTypes.length)]
    
    const value = Math.round((Math.random() * (sensor.max - sensor.min) + sensor.min) * 10) / 10

    return {
      id: `reading-${Date.now()}-${Math.random()}`,
      deviceId: device.id,
      deviceName: device.name,
      sensorType: sensor.type,
      value,
      unit: sensor.unit,
      timestamp: new Date().toISOString(),
      location: device.location
    }
  }, [])

  // Simulate WebSocket/MQTT connection
  useEffect(() => {
    setIsConnected(true)
    setError(null)

    // Generate initial data
    const initialData: ChartDataPoint[] = []
    const now = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 60000) // Every minute
      initialData.push({
        timestamp: timestamp.toISOString(),
        time: timestamp.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        temperature: Math.round((Math.random() * 10 + 20) * 10) / 10,
        humidity: Math.round((Math.random() * 30 + 40) * 10) / 10,
        pressure: Math.round((Math.random() * 30 + 1000) * 10) / 10,
        light: Math.round(Math.random() * 800),
        air_quality: Math.round(Math.random() * 100 + 50)
      })
    }
    
    setChartData(initialData)

    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Generate new sensor reading
      const newReading = generateSensorReading()
      setSensorReadings(prev => [newReading, ...prev.slice(0, 49)]) // Keep last 50 readings

      // Update chart data
      setChartData(prev => {
        const newDataPoint: ChartDataPoint = {
          timestamp: new Date().toISOString(),
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          temperature: newReading.sensorType === 'temperature' ? newReading.value : prev[prev.length - 1]?.temperature,
          humidity: newReading.sensorType === 'humidity' ? newReading.value : prev[prev.length - 1]?.humidity,
          pressure: newReading.sensorType === 'pressure' ? newReading.value : prev[prev.length - 1]?.pressure,
          light: newReading.sensorType === 'light' ? newReading.value : prev[prev.length - 1]?.light,
          air_quality: newReading.sensorType === 'air_quality' ? newReading.value : prev[prev.length - 1]?.air_quality
        }

        return [...prev.slice(-29), newDataPoint] // Keep last 30 data points
      })
    }, 3000) // Update every 3 seconds

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [generateSensorReading])

  const getLatestReading = (sensorType: string) => {
    return sensorReadings.find(reading => reading.sensorType === sensorType)
  }

  return {
    sensorReadings,
    chartData,
    isConnected,
    error,
    getLatestReading
  }
}
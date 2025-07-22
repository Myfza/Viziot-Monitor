export interface SensorReading {
  id: string
  deviceId: string
  deviceName: string
  sensorType: 'temperature' | 'humidity' | 'pressure' | 'light' | 'air_quality'
  value: number
  unit: string
  timestamp: string
  location?: string
}

export interface SensorDevice {
  id: string
  name: string
  type: string
  location: string
  isOnline: boolean
  lastSeen: string
  sensors: {
    temperature?: boolean
    humidity?: boolean
    pressure?: boolean
    light?: boolean
    air_quality?: boolean
  }
}

export interface ChartDataPoint {
  timestamp: string
  time: string
  temperature?: number
  humidity?: number
  pressure?: number
  light?: number
  air_quality?: number
}
import { useState, useEffect } from 'react'
import { supabase, Database } from '../lib/supabase'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

type Device = Database['public']['Tables']['devices']['Row']
type DeviceInsert = Database['public']['Tables']['devices']['Insert']
type DeviceUpdate = Database['public']['Tables']['devices']['Update']

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    fetchDevices()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('devices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'devices',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setDevices((prev) => [...prev, payload.new as Device])
          } else if (payload.eventType === 'UPDATE') {
            setDevices((prev) =>
              prev.map((device) =>
                device.id === payload.new.id ? (payload.new as Device) : device
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setDevices((prev) =>
              prev.filter((device) => device.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const fetchDevices = async () => {
    if (!user) return

    try {
      setError(null)
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (error) {
        if (error.code === '42P01') {
          setError('Database table not found. Please run the migration in your Supabase dashboard.')
          toast.error('Database setup required. Check the README for migration instructions.', {
            duration: 6000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #FF6B6B',
            },
          })
          return
        }
        throw error
      }
      setDevices(data || [])
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch devices'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const toggleDevice = async (deviceId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('devices')
        .update({ status: !currentStatus })
        .eq('id', deviceId)

      if (error) throw error

      toast.success(
        `Device ${!currentStatus ? 'turned ON' : 'turned OFF'}`,
        {
          icon: !currentStatus ? '🟢' : '🔴',
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: `1px solid ${!currentStatus ? '#FB923C' : '#FF6B6B'}`,
          },
        }
      )
    } catch (error: any) {
      toast.error('Failed to toggle device: ' + error.message)
    }
  }

  const addDevice = async (device: Omit<DeviceInsert, 'user_id'>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('devices')
        .insert({ ...device, user_id: user.id })

      if (error) throw error
      toast.success('Device added successfully', {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #FB923C',
        },
      })
    } catch (error: any) {
      toast.error('Failed to add device: ' + error.message)
    }
  }

  const deleteDevice = async (deviceId: string) => {
    try {
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', deviceId)

      if (error) throw error
      toast.success('Device deleted successfully')
    } catch (error: any) {
      toast.error('Failed to delete device: ' + error.message)
    }
  }

  return {
    devices,
    loading,
    error,
    toggleDevice,
    addDevice,
    deleteDevice,
    fetchDevices,
  }
}
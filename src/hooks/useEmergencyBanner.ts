'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EmergencyBannerBlock } from '@/payload-types'

export const useEmergencyBanner = () => {
  const pathname = usePathname()
  const [emergencyBanner, setEmergencyBanner] = useState<EmergencyBannerBlock | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmergencyBanner = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/emergency-banner?path=${encodeURIComponent(pathname)}`)
        if (response.ok) {
          const data = await response.json()
          setEmergencyBanner(data.emergencyBanner)
        } else {
          setEmergencyBanner(null)
        }
      } catch (error) {
        console.error('Error fetching emergency banner:', error)
        setEmergencyBanner(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEmergencyBanner()
  }, [pathname])

  return { emergencyBanner, loading }
} 
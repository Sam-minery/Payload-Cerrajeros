'use client'

import React from 'react'
import { useEmergencyBanner } from '@/hooks/useEmergencyBanner'
import EmergencyBanner from '@/blocks/EmergencyBanner/Component'

export const EmergencyBannerClient: React.FC = () => {
  const { emergencyBanner, loading } = useEmergencyBanner()

  if (loading) {
    return null // O un skeleton loader si prefieres
  }

  if (!emergencyBanner || !emergencyBanner.isActive) {
    return null
  }

  return <EmergencyBanner {...emergencyBanner} />
} 
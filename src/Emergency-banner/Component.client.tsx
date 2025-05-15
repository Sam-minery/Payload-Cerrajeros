'use client'
import React from 'react'
import type { EmergencyBanner } from '@/payload-types'

interface EmergencyBannerClientProps {
  data: EmergencyBanner
}

export const EmergencyBannerClient: React.FC<EmergencyBannerClientProps> = ({ data }) => {
  return (
    <div 
      className="w-full px-4 py-2 text-white text-center fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: data.backgroundColor || 'red'}}
    >
      <div className="container mx-auto flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_4px_rgba(16,185,129,0.4)] shadow-emerald-500/50"></div>
        <p className="text-base font-bold">{data.banner}</p>
      </div>
    </div>
  )
}

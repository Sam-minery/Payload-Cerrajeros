import { EmergencyBannerClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { EmergencyBanner } from '@/payload-types'

export async function EmergencyBanner() {
  const emergencyBannerData = await getCachedGlobal('emergency-banner', 1)() as EmergencyBanner
  

  return <EmergencyBannerClient data={emergencyBannerData} />
}

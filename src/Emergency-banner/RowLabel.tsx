import React from 'react'
import type { EmergencyBanner } from '@/payload-types'

export const RowLabel: React.FC<{ data: EmergencyBanner }> = ({ data }) => {
  return (
    <div>
      <strong>{data.banner}</strong>
    </div>
  )
}

export default RowLabel

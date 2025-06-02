'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'
import type { Contacto } from '@/payload-types'

type BannerEmergenciaAltProps = {
  textoPrincipal: string
  contacto?: Contacto | number | null
  numeroDefault: string
}

export const BannerEmergencia: React.FC<BannerEmergenciaAltProps> = ({
  textoPrincipal,
  contacto,
  numeroDefault,
}) => {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    const numero = typeof contacto === 'object' && contacto?.numero ? contacto.numero : numeroDefault
    window.location.href = `tel:${numero}`
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white py-2 cursor-pointer mb-16"
      onClick={handleClick}
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        <div className={cn(
          "w-3 h-3 rounded-full",
          isActive ? "bg-green-500" : "bg-green-300"
        )} />
        <p className="text-lg font-medium">{textoPrincipal}</p>
      </div>
    </div>
  )
}

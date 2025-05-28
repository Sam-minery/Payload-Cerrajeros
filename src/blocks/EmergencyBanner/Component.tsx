'use client'

import React from 'react'
import { EmergencyBannerBlock } from '@/payload-types'
import Link from 'next/link'

type Props = EmergencyBannerBlock

const EmergencyBanner: React.FC<Props> = (props) => {
  const { title, contacto, isActive } = props

  // No mostrar el banner si no está activo
  if (!isActive) {
    return null
  }

  return (
    <div className="sticky top-0 z-50 bg-red-600 text-white">
      {contacto && typeof contacto === 'object' ? (
        <Link href={`tel:${contacto.numero}` || '#'} className="block hover:bg-red-700 transition-colors duration-200">
          <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Icono de emergencia */}
                <div className="flex-shrink-0">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>

                {/* Título */}
                {title && (
                  <h3 className="text-xs sm:text-sm md:text-base font-medium text-center leading-tight">
                    {title}
                  </h3>
                )}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Icono de emergencia */}
              <div className="flex-shrink-0">
                <svg
                  className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>

              {/* Título */}
              {title && (
                <h3 className="text-xs sm:text-sm md:text-base font-medium text-center leading-tight">
                  {title}
                </h3>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmergencyBanner

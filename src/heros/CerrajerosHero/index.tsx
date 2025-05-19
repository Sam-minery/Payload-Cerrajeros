'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import type { SerializedEditorState } from 'lexical'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CerrajerosHero: React.FC<Page['hero']> = ({ 
  links, 
  media, 
  richText, 
  cerrajerosBlocks = [],
  logo,
  logoAlt
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen">
      {/* Imagen de fondo para móvil */}
      <div className="absolute inset-0 lg:hidden">
        {media && typeof media === 'object' && (
          <Media 
            fill 
            imgClassName="object-cover brightness-50" 
            priority 
            resource={media} 
          />
        )}
      </div>

      {/* Columna izquierda */}
      <div className="relative w-full lg:w-1/2 flex items-start p-6 md:p-8 lg:p-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Logo container con lógica responsive */}
          <div className="-mb-32 flex justify-center lg:justify-start lg:ml-2">
            {logo && typeof logo === 'object' && (
              <>
                <Media 
                  resource={logo}
                  className="hidden lg:block h-[350px] w-[350px] object-contain"
                  priority
                />
                <Media 
                  resource={logoAlt && typeof logoAlt === 'object' ? logoAlt : logo}
                  className="lg:hidden h-[250px] w-[250px] object-contain"
                  priority
                />
              </>
            )}
          </div>

          {richText && (
            <RichText 
              className="mt-[-100px] mb-8 text-center lg:text-left text-white lg:text-inherit [&_strong]:text-white lg:[&_strong]:text-inherit"
              data={richText} 
              enableGutter={false} 
            />
          )}

          {/* Botones de acción */}
          {Array.isArray(links) && links.length > 0 && (
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
              {links.map(({ link }, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 transition-colors duration-300 ${
                    i === 0 
                      ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                      : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                  }`}
                >
                  {i === 0 ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  )}
                  <CMSLink 
                    {...link} 
                    className="text-white font-bold text-lg md:text-xl text-center bg-transparent hover:bg-transparent tracking-wide"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Estadísticas usando cerrajerosBlocks */}
          {Array.isArray(cerrajerosBlocks) && cerrajerosBlocks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {cerrajerosBlocks.map((block, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold mb-2">{block.blockTitle}</div>
                  <div className="text-sm text-gray-800 dark:text-gray-200">
                    <RichText 
                      data={block.blockContent as SerializedEditorState} 
                      enableGutter={false} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha - Imagen (solo desktop) */}
      <div className="hidden lg:block w-1/2 relative rounded-xl overflow-hidden">
        {media && typeof media === 'object' && (
          <Media 
            fill 
            imgClassName="object-cover" 
            priority 
            resource={media} 
          />
        )}
      </div>
    </div>
  )
}


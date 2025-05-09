'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container relative z-10 flex items-center justify-center min-h-[55vh] pt-8 md:pt-0">
        <div className="w-full h-full md:text-center bg-black/50 backdrop-blur-sm border-2 border-white/20 px-4 md:px-20 py-8 md:py-28 rounded-2xl flex flex-col items-center justify-center">
          {richText && <RichText className="mb-4 md:mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-4 w-full">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="w-full md:w-auto">
                    <CMSLink {...link} className="w-full md:w-auto text-center" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}

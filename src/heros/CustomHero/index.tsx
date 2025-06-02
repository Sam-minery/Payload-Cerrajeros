import React from 'react'
import { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type CustomHeroProps = Page['hero']

export const CustomHero: React.FC<CustomHeroProps> = props => {
  const {
    richText,
    media,
    links,
    additionalSections
  } = props

  return (
    <div className="custom-hero py-16 overflow-hidden min-h-[90vh] relative">
      {media && (
        <>
          {/* Versión móvil - imagen de fondo */}
          <div className="md:hidden absolute inset-0">
            <Media 
              resource={media}
              className="absolute inset-0"
              imgClassName="w-full h-full object-cover opacity-20"
              fill
              priority
            />
          </div>
          {/* Versión desktop - imagen lateral */}
          <div className="hidden md:block custom-hero__media absolute top-0 right-0 -mr-[45vw] w-[calc(45vw+40%)] h-[90vh]">
            <Media 
              resource={media}
              className="absolute inset-0"
              imgClassName="w-full h-full object-cover rounded-l-lg border-8 border-gray-200"
              fill
              priority
            />
          </div>
        </>
      )}

      <div className="container relative h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative min-h-[90vh]">
          <div className="custom-hero__content space-y-8 relative flex flex-col items-start justify-center">
            {richText && <RichText 
              data={richText} 
              enableGutter={false} 
              className="prose prose-lg md:prose-xl max-w-none [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_p]:text-gray-600" 
            />}
            
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex gap-4 flex-wrap justify-center w-full">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}

            {Array.isArray(additionalSections) && additionalSections.length > 0 && (
              <div className="custom-hero__additional-sections flex flex-row gap-1 overflow-x-auto pb-4 w-full justify-center">
                {additionalSections.map((section, i) => (
                  <div key={i} className="custom-hero__section bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm flex-shrink-0 w-[160px] h-[150px] overflow-hidden">
                    <RichText 
                      data={section.content as any} 
                      enableGutter={false}
                      className="text-sm leading-tight tracking-tight [&_p]:mb-1 text-center" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 
import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlockAlt: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="rotating-border-container">
        <div className="rotating-border">
          <div className="rotating-border-content bg-card rounded border-border border p-4 flex flex-col gap-8">
            <div className="max-w-[48rem] mx-auto text-center">
              {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {(links || []).map(({ link }, i: number) => {
                const bgColorClass = i === 0 ? 'bg-blue-300 hover:bg-blue-600 text-white text-gray-700 hover:text-white' : 
                                   i === 1 ? 'bg-blue-400 hover:bg-blue-600 text-white text-gray-700 hover:text-white' :
                                   i === 2 ? 'bg-blue-500 hover:bg-blue-600 text-white text-gray-700 hover:text-white' : 
                                   'bg-gray-500 hover:bg-gray-600';
                return <CMSLink 
                  key={i} 
                  size="lg" 
                  className={`w-full md:w-auto ${bgColorClass}`}
                  {...link} 
                />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="rotating-border-container animate-pulse-scale p-0 w-full max-w-[80rem]">
          <div className="rotating-border m-0">
            <div className="rotating-border-content bg-gray-100 rounded border-border border flex flex-col m-0">
              <div className="mx-auto text-center bg-gray-100 w-full p-6 px-12 text-lg">
                {richText && (
                  <div className="[&_h2]:text-red-500 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
                    <RichText className="mb-0" data={richText} enableGutter={false} />
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-gray-100 w-full p-6 px-12">
                {(links || []).map(({ link }, i) => {
                  const bgColorClass = i === 0 ? 'bg-red-500 hover:bg-red-600 text-bold text-white' : 
                                     i === 1 ? 'bg-green-500 hover:bg-green-600 text-bold text-white' :
                                     i === 2 ? 'bg-blue-500 hover:bg-blue-600 text-bold text-white' : 
                                     'bg-gray-500 hover:bg-gray-600';
                  return <CMSLink 
                    key={i} 
                    size="lg" 
                    className={`w-full md:w-auto ${bgColorClass} text-lg px-8 py-3`}
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

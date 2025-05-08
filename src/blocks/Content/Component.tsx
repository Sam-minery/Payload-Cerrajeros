import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16 text-center">
      <div className="grid auto-rows-auto gap-8 md:gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(
                    'bg-white p-6 rounded-lg shadow-xl',
                    {
                      'md:col-span-2 lg:col-span-4': size === 'full',
                      'md:col-span-1 lg:col-span-2': size === 'half',
                      'md:col-span-1': size === 'oneThird',
                      'md:col-span-2 lg:col-span-3': size === 'twoThirds',
                    }
                  )}
                  key={index}
                >
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {enableLink && <CMSLink {...link} className="mt-4 inline-block" />}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

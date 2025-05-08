'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'icon'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, icon } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'relative border border-border rounded-xl overflow-hidden bg-card hover:cursor-pointer hover:scale-105 transition-all duration-300 bg-white/80',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="justify-center items-center flex h-full">.</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {icon && (
          <div className="text-center text-2xl mb-2 text-red-600">
            {icon === 'lock' && '🔒'}
            {icon === 'door' && '🚪'}
            {icon === 'shield' && '🛡️'}
            {icon === 'car' && '🚗'}
            {icon === 'safe' && '🏦'}
          </div>
        )}
        {showCategories && hasCategories && (
          <div className="uppercase text-xs mb-4 text-left">
            {showCategories && hasCategories && (
              <div className="absolute top-2 left-2">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category
                    const categoryTitle = titleFromCategory || 'Untitled category'
                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        <span className="text-muted-foreground text-xs px-2 py-1 rounded">
                          {categoryTitle}
                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </span>
                      </Fragment>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose text-center w-full">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2 text-center">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}

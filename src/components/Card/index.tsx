'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'


export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'icon'>

const iconMap = {
  lock: '/media/icono-candado.png',
  door: '/media/Icono-puerta.png',
  shield: '/media/Icono-escudo.png',
  car: '/media/Icono-coche.png',
  safe: '/media/Icono-caja-fuerte.png',
}

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
        'relative rounded-xl overflow-hidden hover:cursor-pointer hover:scale-105 transition-all duration-300 bg-transparent hover:bg-white',
        className,
      )}
      ref={card.ref}
    >

      <div className="p-4">
        {icon && (
          <div className="text-center mb-2">
            <img 
              src={iconMap[icon as keyof typeof iconMap]} 
              alt={`Icono de ${icon}`}
              className="w-12 h-12 mx-auto"
            />
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

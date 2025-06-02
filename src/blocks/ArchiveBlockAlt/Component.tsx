import type { Post, ArchiveBlockAlt as ArchiveBlockAltProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const ArchiveBlockAlt: React.FC<
  ArchiveBlockAltProps & {
    id?: string
  }
> = async (props) => {
  const { 
    id, 
    categories, 
    introContent, 
    limit: limitFromProps, 
    populateBy, 
    selectedDocs, 
    icon,
    title,
    description 
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div 
      className="my-16 max-w-7xl mx-auto p-14 relative bg-gray-200 rounded-2xl" 
      id={`block-${id}`}
    >
      <div className="flex items-start gap-6 mb-8">
        {icon && (
          <div className="w-16 h-16 flex-shrink-0">
            <Media 
              resource={icon} 
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div>
          {title && <h2 className="text-4xl font-bold mb-7 text-blue-700">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>

      {introContent && (
        <div className="mb-8">
          <RichText data={introContent} enableGutter={false} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div key={i} className="p-6">
            <div className="flex items-start gap-4 mb-4">
              {post.icon && (
                <div className="w-8 h-8 flex-shrink-0">
                  <Media 
                    resource={post.icon} 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold">{post.title}</h3>
            </div>
            {post.description && (
              <p className="text-gray-600 line-clamp-3">{post.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

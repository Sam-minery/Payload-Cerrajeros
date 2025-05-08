import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs, image } = props

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
      className="my-16 max-w-7xl mx-auto rounded-2xl p-4 relative overflow-hidden" 
      id={`block-${id}`}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <Media 
            resource={image} 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      )}
      <div className="relative z-10">
        {introContent && (
          <div className="container mb-16 bg-white/40 rounded-2xl p-4">
            <RichText className="text-center" data={introContent} enableGutter={false} />
          </div>
        )}
        <CollectionArchive posts={posts} />
      </div>
    </div>
  )
}

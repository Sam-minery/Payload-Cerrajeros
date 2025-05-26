import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Provincia } from '../../../payload-types'

export const revalidateProvincia: CollectionAfterChangeHook<Provincia> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/provincias/${doc.slug}`

      payload.logger.info(`Revalidating provincia at path: ${path}`)

      revalidatePath(path)
      revalidateTag('provincias-sitemap')
    }

    // If the provincia was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/provincias/${previousDoc.slug}`

      payload.logger.info(`Revalidating old provincia at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('provincias-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteProvincia: CollectionAfterDeleteHook<Provincia> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/provincias/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('provincias-sitemap')
  }

  return doc
} 
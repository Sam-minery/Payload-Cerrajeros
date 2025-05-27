import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Municipio } from '../../../payload-types'

export const revalidateMunicipio: CollectionAfterChangeHook<Municipio> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/municipios/${doc.slug}`

      payload.logger.info(`Revalidating municipio at path: ${path}`)

      revalidatePath(path)
      revalidateTag('municipios-sitemap')
    }

    // If the municipio was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/municipios/${previousDoc.slug}`

      payload.logger.info(`Revalidating old municipio at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('municipios-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteMunicipio: CollectionAfterDeleteHook<Municipio> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/municipios/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('municipios-sitemap')
  }

  return doc
}

import type { PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<string, string>> = {
  pages: '',
  posts: '/posts',
  provincias: '/provincias',
  municipios: '/municipios',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const { payload } = req

  return `${payload.config.serverURL}${path}`
}

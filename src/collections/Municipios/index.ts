import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { CallToActionAlt } from '../../blocks/CallToActionAlt/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDeleteMunicipio, revalidateMunicipio } from './hooks/revalidateMunicipios'
import { SeccionComentarios } from '@/blocks/SeccionComentarios/config'
import { SeccionServicios } from '@/blocks/SeccionBeneficios/config'
import { SeccionProvincias } from '@/blocks/SeccionProvincias/config'
import { SeccionInformativo } from '@/blocks/SeccionInformativo/config'
import { SeccionInstrucciones } from '@/blocks/SeccionInstrucciones/config'
import { EmergencyBanner } from '@/blocks/EmergencyBanner/config'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Municipios: CollectionConfig = {
  slug: 'municipios',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: () => 'https://payload-cms-demo.com',
    group: 'Content',
  },
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
    create: authenticated,
    delete: authenticated,
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateMunicipio],
    afterDelete: [revalidateDeleteMunicipio],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        CallToAction,
        CallToActionAlt,
        Content,
        MediaBlock,
        Archive,
        FormBlock,
        SeccionComentarios,
        SeccionServicios,
        SeccionProvincias,
        SeccionInformativo,
        SeccionInstrucciones,
        EmergencyBanner,
      ],
    },
    hero,
    ...slugField(),
    {
      name: 'meta',
      type: 'group',
      fields: [
        MetaTitleField({}),
        MetaDescriptionField({}),
        MetaImageField({ relationTo: 'media' }),
      ],
    },
    OverviewField({}),
    PreviewField({}),
  ],
}

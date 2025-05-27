import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'

export const Contactos: CollectionConfig = {
  slug: 'contactos',
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'numero', 'updateAt'],
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
    {
      name: 'numero',
      type: 'text',
      required: true,
      label: 'Número de teléfono',
    },
  ],
  timestamps: true,
}
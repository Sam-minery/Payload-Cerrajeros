import { Block } from 'payload'

export const BannerEmergenciaBlock: Block = {
  slug: 'bannerEmergenciaAlt',
  interfaceName: 'BannerEmergenciaAltBlock',
  labels: {
    singular: 'Banner de Emergencia Alternativo',
    plural: 'Banners de Emergencia Alternativos',
  },
  fields: [
    {
      name: 'textoPrincipal',
      type: 'text',
      label: 'Texto Principal',
      required: true,
    },
    {
      name: 'contacto',
      type: 'relationship',
      relationTo: 'contactos',
      label: 'Contacto de Emergencia',
      hasMany: false,
    },
    {
      name: 'numeroDefault',
      type: 'text',
      label: 'Número de Teléfono por Defecto',
      required: true,
    },
  ],
}

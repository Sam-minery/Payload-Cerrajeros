import type { GlobalConfig } from 'payload'


export const EmergencyBanner: GlobalConfig = {
  slug: 'emergency-banner',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'banner',
      type: 'text',
      label: 'Texto del Banner',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        {
          label: 'Rojo',
          value: 'red',
        },
        {
          label: 'Amarillo',
          value: 'yellow',
        },
        {
          label: 'Naranja',
          value: 'orange',
        },
      ],
      defaultValue: 'red',
      label: 'Color de Fondo',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Activar Banner',
      defaultValue: false,
    },
  ],
}


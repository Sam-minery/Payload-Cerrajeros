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
  ],
}


import type { Block } from 'payload';

export const SeccionSecuencial: Block = {
  slug: 'seccionSecuencial',
  interfaceName: 'SeccionSecuencialBlock',
  labels: {
    singular: 'Sección Secuencial',
    plural: 'Secciones Secuenciales',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      required: true,
    },
    {
      name: 'secciones',
      type: 'array',
      label: 'Secciones Secundarias',
      required: true,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Media',
          required: true,
        },
        {
          name: 'titulo',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'descripcion',
          type: 'textarea',
          label: 'Descripción',
          required: true,
        }
      ]
    }
  ],
};

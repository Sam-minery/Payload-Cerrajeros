import type { Block } from 'payload';

export const SeccionInformativoAlt: Block = {
  slug: 'seccionInformativoAlt',
  interfaceName: 'SeccionInformativoAltBlock',
  labels: {
    singular: 'Sección Informativo Alternativa',
    plural: 'Secciones Informativas Alternativas',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'imagen',
      required: true,
    },
    {
      name: 'iconPrimary',
      type: 'upload',
      relationTo: 'media',
      label: 'icono principal',
    },
    {
        name: 'title',
        type: 'text',
        label: 'Titulo',
        required: true,
    },
    {
        type: 'richText',
        name: 'content',
        label: 'Descripcion',
        required: true,
    },
    {
        type: 'radio',
        name: 'imagePosition',
        label:'Posicion de la imagen',
        options: ['Left','Right','Top','Bottom'],
    },
    {
        name: 'secciones',
        type: 'array',
        label: 'Secciones Secundarias',
        required: false,
        fields: [
            {
                name: 'icono',
                type: 'upload',
                relationTo: 'media',
                label: 'Icono',
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
                type: 'text',
                label: 'Descripción',
                required: true,
            }
        ]
    }
  ],
};

import type { Block } from 'payload';

export const SeccionProvinciasAlt: Block = {
  slug: 'seccionProvinciasAlt',
  labels: {
    singular: 'Sección Provincia Alternativa',
    plural: 'Seccion Provincias Alternativas',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Páginas Relacionadas',
      required: true,
      fields: [
        {
          name: 'pagina',
          type: 'relationship',
          relationTo: ['pages', 'provincias'],
          label: 'Página',
          required: true,
        },
        {
          name: 'estado',
          type: 'radio',
          label: 'Estado de Disponibilidad',
          options: [
            {
              label: 'Disponible',
              value: 'disponible',
            },
            {
              label: 'No Disponible',
              value: 'no_disponible',
            },
          ],
          defaultValue: 'disponible',
          required: true,
        }
      ]
    },
    {
      name: 'titulo',
      type: 'text',
      label: 'Nombre Seccion provincias',
    }
  ],
};
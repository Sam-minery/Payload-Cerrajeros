import type { Block } from 'payload';

export const SeccionProvincias: Block = {
  slug: 'seccionProvincias',
  labels: {
    singular: 'Sección Provincia',
    plural: 'Seccion Provincias',
  },
  fields: [
    {
      name: 'paginasRelacionadas',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      label: 'Páginas Relacionadas',
      required: true,
    },
    {
        name: 'nombreSeccionProvincias',
        type: 'text',
        label: 'Nombre Seccion provincias',
    }
  ],
};

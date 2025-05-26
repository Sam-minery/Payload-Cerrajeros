import type { Block } from 'payload';

export const SeccionProvincias: Block = {
  slug: 'seccionProvincias',
  interfaceName: 'SeccionProvinciasBlock',
  labels: {
    singular: 'Sección Provincia',
    plural: 'Seccion Provincias',
  },
  fields: [
    {
      name: 'nombreSeccionProvincias',
      type: 'text',
      label: 'Nombre de la Sección',
    },
    {
      name: 'paginasRelacionadas',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      label: 'Páginas Relacionadas',
    },
    {
      name: 'provinciasRelacionadas',
      type: 'relationship',
      relationTo: 'provincias',
      hasMany: true,
      label: 'Provincias Relacionadas',
    },
  ],
};

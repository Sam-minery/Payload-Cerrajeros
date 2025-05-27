import type { Block } from 'payload';

export const SeccionProvincias: Block = {
  slug: 'seccionProvincias',
  interfaceName: 'SeccionProvinciasBlock',
  labels: {
    singular: 'Sección Provincias y Municipios',
    plural: 'Secciones Provincias y Municipios',
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
    {
      name: 'municipiosRelacionados',
      type: 'relationship',
      relationTo: 'municipios',
      hasMany: true,
      label: 'Municipios Relacionados',
    },
  ],
};

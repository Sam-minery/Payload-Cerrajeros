import type { Block } from 'payload'
import {
    BoldFeature,
    FixedToolbarFeature,
    InlineToolbarFeature,
    ParagraphFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const EmergencyBanner: Block = {
    slug: 'emergencyBanner',
    interfaceName: 'EmergencyBannerBlock',
    labels: {
        plural: 'Banners de Emergencia',
        singular: 'Banner de Emergencia'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título del Banner',
        },
        {
            name: 'contacto',
            type: 'relationship',
            relationTo: 'contactos',
            required: true,
            label: 'Contacto de Emergencia',
            admin: {
                description: 'Selecciona el contacto que se mostrará en el banner de emergencia'
            }
        },
        {
            name: 'isActive',
            type: 'checkbox',
            label: 'Banner Activo',
            defaultValue: true,
            admin: {
                description: 'Controla si el banner se muestra o no en el sitio web'
            }
        }
    ]
}

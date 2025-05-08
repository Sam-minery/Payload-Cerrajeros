import type { Block, Field } from 'payload'
import {
    BoldFeature,
    FixedToolbarFeature,
    InlineToolbarFeature,
    ParagraphFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

const servicioFields: Field[] = [
    {
        name: 'titleServices',
        type: 'text',
        required: true,
        label: 'Título Servicio',
    },
    {
        type: 'richText',
        name: 'content',
        label: 'Contenido',
        editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                    ...rootFeatures,
                    ParagraphFeature(),
                    BoldFeature(),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ]
            },
        }),
    },
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Imagen',
    }
]

export const SeccionServicios: Block = {
    slug: 'seccionServicios',
    interfaceName: 'SeccionServiciosBlock',
    labels: {
        plural: 'Seccion Beneficios',
        singular: 'Seccion Beneficio'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título Seccion',
        },
        {
            type: 'richText',
            name: 'contentSection',
            label: 'Contenido de Seccion',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        ParagraphFeature(),
                        BoldFeature(),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
        },
        {
            name: 'servicios',
            type: 'array',
            maxRows: 4,
            minRows: 1,
            label: 'Servicios',
            admin: {
                initCollapsed: true,
            },
            fields: servicioFields,
        }
    ]
}
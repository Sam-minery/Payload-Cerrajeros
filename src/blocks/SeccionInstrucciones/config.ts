import type { Block, Field } from 'payload'
import {
    BoldFeature,
    FixedToolbarFeature,
    InlineToolbarFeature,
    ParagraphFeature,
    lexicalEditor,
    HeadingFeature,
} from '@payloadcms/richtext-lexical'

const instruccionFields: Field[] = [
    {
        name: 'titulo',
        type: 'text',
        required: true,
        label: 'Título de la instrucción',
    },
    {
        name: 'descripcion',
        type: 'richText',
        required: true,
        label: 'Descripción de la instrucción',
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
        name: 'icono',
        type: 'upload',
        relationTo: 'media',
        label: 'Icono de la instrucción',
    }
]

export const SeccionInstrucciones: Block = {
    slug: 'seccionInstrucciones',
    interfaceName: 'SeccionInstruccionesBlock',
    labels: {
        plural: 'Secciones de Instrucciones',
        singular: 'Sección de Instrucciones'
    },
    fields: [
        {
            name: 'title',
            type: 'richText',
            required: false,
            label: 'Título de la sección',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        ParagraphFeature(),
                        BoldFeature(),
                        HeadingFeature({
                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
        },
        {
            name: 'instrucciones',
            type: 'array',
            maxRows: 4,
            minRows: 1,
            label: 'Instrucciones',
            admin: {
                initCollapsed: true,
            },
            fields: instruccionFields,
        },
        {
            name: 'enableGrayBackground',
            type: 'checkbox',
            label: 'Activar fondo gris',
            defaultValue: false,
        }
    ]
}

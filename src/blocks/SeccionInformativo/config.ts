import type { Block, Field } from 'payload'
import {
    BoldFeature,
    FixedToolbarFeature,
    InlineToolbarFeature,
    ParagraphFeature,
    HeadingFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

const seccionInformativoFields: Field[] = [
    {
        name: 'title',
        type: 'text',
        required: true,
        label: 'Título Sección',
    },
    {
        type: 'richText',
        name: 'content',
        label: 'Contenido',
        editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
                ...defaultFeatures,
                HeadingFeature({
                    enabledHeadingSizes: ['h1', 'h2', 'h3']
                }),
                ParagraphFeature(),
                BoldFeature(),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
            ],
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

export const SeccionInformativo: Block = {
    slug: 'seccionInformativo',
    interfaceName: 'SeccionInformativoBlock',
    labels: {
        plural: 'Secciones Informativos',
        singular: 'Sección Informativo'
    },
    fields: seccionInformativoFields,
}   
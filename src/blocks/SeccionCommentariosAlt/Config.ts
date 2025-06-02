import type { Block, Field } from 'payload'
import {
    BoldFeature,
    FixedToolbarFeature,
    InlineToolbarFeature,
    ParagraphFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

const comentariosFields: Field[] = [
    {
        name: 'userName',
        type: 'text',
        required: true,
        label: 'Nombre del usuario',
    },
    {
        type: 'richText',
        name: 'comment',
        label: 'Comentario',
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
        name: 'userIcon',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Icono de Usuario',
    },
    {
        name: 'puntuacion',
        type: 'number',
        min: 1,
        max: 5,
        required: true,
        label: 'puntuacion',
    }
]

export const SeccionComentariosAlt: Block = {
slug: 'seccionComentariosAlt',
interfaceName: 'SeccionComentariosAltBlock',
labels: {
    plural: 'Seccion Comentario Alternativa',
    singular: 'Seccion Comentarios Alternativos'
},
fields: [
    {
        name: 'titulo',
        type: 'text',
        required: true,
        label: 'Título de la sección',
    },
    {
        name: 'descripcion',
        type: 'textarea',
        required: true,
        label: 'Descripción de la sección',
    },
    {
        name: 'comments',
        type: 'array',
        maxRows: 6,
        minRows: 1,
        label: 'comentarios',
        admin: {
            initCollapsed: true,
        },
        fields: comentariosFields,
    },
    {
        name: 'starIcon',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Icono de estrella',
    },
    {
        name: 'starIconEmpt',
        type: 'upload',
        relationTo: 'media',
        required: true,
        label: 'Icono de estrella vacia',
    }
]
}
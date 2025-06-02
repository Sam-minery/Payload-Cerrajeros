import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  BoldFeature,
  ParagraphFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Cerrajeros',
          value: 'cerrajerosHero',
        },
        {
          label: 'Custom Hero',
          value: 'customHero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
          }),
          ParagraphFeature(),
          BoldFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    {
      name: 'cerrajerosBlocks',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'cerrajerosHero',
      },
      label: 'Bloques de Texto',
      fields: [
        {
          name: 'blockTitle',
          type: 'text',
          label: 'Título del Bloque',
        },
        {
          name: 'blockContent',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({
                enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
              }),
              ParagraphFeature(),
              BoldFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Contenido',
        }
      ],
    },
    linkGroup({
      overrides: {
        maxRows: 15,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'cerrajerosHero', 'customHero'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'additionalSections',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => type === 'customHero',
      },
      label: 'Secciones Adicionales',
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({
                enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
              }),
              ParagraphFeature(),
              BoldFeature(),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Contenido',
        }
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Añade un logo para mostrar en el héroe',
      },
    },
    {
      name: 'logoAlt',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Alternativo',
      admin: {
        description: 'Añade un logo en otro color para mostrar en el héroe en dimensiones mas pequeñas',
        condition: (_, { type } = {}) => type === 'cerrajerosHero',
      },
    },
  ],
  label: false,
}

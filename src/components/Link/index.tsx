import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Contacto } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  contacto?: {
    relationTo: 'contactos'
    value: Contacto | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'contacto' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    contacto,
    size: sizeFromProps,
    url,
  } = props

  let href = ''
  let displayLabel = label

  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    href = `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
      reference.value.slug
    }`
  } else if (type === 'custom') {
    href = url || ''
  } else if (type === 'contacto' && typeof contacto?.value === 'object' && contacto.value.numero) {
    href = `tel:${contacto.value.numero}`
    // Si no hay label personalizado, usar el nombre del contacto
    if (!displayLabel && contacto.value.nombre) {
      displayLabel = contacto.value.nombre
    }
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {displayLabel && displayLabel}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {displayLabel && displayLabel}
        {children && children}
      </Link>
    </Button>
  )
}

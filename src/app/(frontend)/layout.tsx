import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

// import { AdminBar } from '@/components/AdminBar' // Comentado para quitar el dashboard
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
// import { draftMode } from 'next/headers' // Ya no necesario si no usas AdminBar
import { EmergencyBannerClient } from '@/components/EmergencyBannerClient'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const { isEnabled } = await draftMode() // Ya no necesario

  // Obtener el banner de emergencia activo de cualquier página
  const payload = await getPayload({ config: configPromise })
  
  let emergencyBanner = null
  
  try {
    const pages = await payload.find({
      collection: 'pages',
      where: {
        'layout.blockType': {
          equals: 'emergencyBanner'
        }
      },
      depth: 2
    })

    // Buscar el primer banner activo
    for (const page of pages.docs) {
      const banner = page.layout?.find(
        (block: any) => block.blockType === 'emergencyBanner' && block.isActive
      )
      if (banner) {
        emergencyBanner = banner as any
        break
      }
    }
  } catch (error) {
    console.log('Error fetching emergency banner:', error)
  }

  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {/* AdminBar eliminado */}
          {/* 
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          */}
          <LivePreviewListener />

          {/* Banner de emergencia dinámico */}
          <EmergencyBannerClient />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

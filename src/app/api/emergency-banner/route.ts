import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')

  if (!path) {
    return NextResponse.json({ emergencyBanner: null })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    
    // Determinar la colección y slug basado en la ruta
    let collection: string
    let slug: string

    if (path === '/' || path === '/home') {
      collection = 'pages'
      slug = 'home'
    } else if (path.startsWith('/municipios/')) {
      collection = 'municipios'
      slug = path.replace('/municipios/', '')
    } else if (path.startsWith('/provincias/')) {
      collection = 'provincias'
      slug = path.replace('/provincias/', '')
    } else {
      collection = 'pages'
      slug = path.replace('/', '')
    }

    // Buscar en la colección correspondiente
    const result = await payload.find({
      collection: collection as any,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    const doc = result.docs?.[0]
    
    if (!doc || !doc.layout) {
      return NextResponse.json({ emergencyBanner: null })
    }

    // Buscar el banner de emergencia activo en el layout
    const emergencyBanner = doc.layout.find(
      (block: any) => block.blockType === 'emergencyBanner' && block.isActive
    )

    return NextResponse.json({ 
      emergencyBanner: emergencyBanner || null 
    })

  } catch (error) {
    console.error('Error fetching emergency banner:', error)
    return NextResponse.json({ emergencyBanner: null })
  }
} 
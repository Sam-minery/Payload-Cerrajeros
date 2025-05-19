'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 px-4 md:px-4 mt-4" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-0 flex justify-between items-center">
        <Link href="/" className="absolute top-8 sm:top-6 md:top-6 lg:top-6 z-30 ml-2 sm:ml-2 md:ml-2">
          <div className="rounded-full p-0.5 w-fit">
            <Logo 
              loading="eager" 
              priority="high" 
              className="text-black dark:text-white !max-h-16 xs:!max-h-16 sm:!max-h-20 md:!max-h-20 lg:!max-h-24" 
            />
          </div>
        </Link>
        <div className="ml-auto">
          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}

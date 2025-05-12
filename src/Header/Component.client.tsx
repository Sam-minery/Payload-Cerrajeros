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
    <header className="relative z-20 px-4 md:px-4 -mt-4" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-0 flex justify-between items-center">
        <Link href="/">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-0.5 w-fit mt-6 sm:mt-4">
            <Logo 
              loading="eager" 
              priority="high" 
              className="text-black dark:text-white !max-h-16 sm:!max-h-20 lg:!max-h-24" 
            />
          </div>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}

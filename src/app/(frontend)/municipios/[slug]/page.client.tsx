'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force this page to be dynamic */
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [router])

  /* Force the header to be light mode */
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return <React.Fragment />
}

export default PageClient

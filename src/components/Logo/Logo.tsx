import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Apertura Express Logo"
      width={600}
      height={280}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('min-w-[9.375rem] w-full h-[100px]', className)}
      src="/media/logo-apertura express-600x280.png"
    />
  )
}

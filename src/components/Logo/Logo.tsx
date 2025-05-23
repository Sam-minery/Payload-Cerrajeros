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
      className={clsx('w-auto h-auto max-w-[180px] sm:max-w-[220px] lg:max-w-[300px] object-contain', className)}
      src="/media/Logo-AperturasExpress-300x200.png"
    />
  )
}

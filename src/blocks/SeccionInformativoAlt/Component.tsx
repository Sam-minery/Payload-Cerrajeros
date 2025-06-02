import type { SeccionInformativoAltBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type Seccion = {
  icono: {
    id: number
    updatedAt: string
    createdAt: string
    [key: string]: any
  } | string | null
  titulo: string
  descripcion: string
}

type Props = SeccionInformativoAltBlock & {
  className?: string
  enableGutter?: boolean
  secciones?: Seccion[]
  iconPrimary?: {
    id: number
    updatedAt: string
    createdAt: string
    [key: string]: any
  } | string | null
}

export function SeccionInformativoAlt({ image, iconPrimary, title, content, secciones, imagePosition = 'Left', className, enableGutter = true }: Props) {
  const getLayoutClasses = () => {
    switch (imagePosition) {
      case 'Left':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start'
      case 'Right':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start'
      case 'Top':
        return 'flex flex-col gap-8 items-center w-full max-w-full'
      case 'Bottom':
        return 'flex flex-col-reverse gap-8 items-center w-full max-w-full'
    }
  }

  const getImageOrder = () => {
    switch (imagePosition) {
      case 'Left':
        return 'order-1'
      case 'Right':
        return 'order-2'
      case 'Top':
      case 'Bottom':
        return ''
    }
  }

  const getContentOrder = () => {
    switch (imagePosition) {
      case 'Left':
        return 'order-2'
      case 'Right':
        return 'order-1'
      case 'Top':
      case 'Bottom':
        return ''
    }
  }

  return (
    <section className={cn('', {
      'border-y border-gray-200': imagePosition === 'Left' || imagePosition === 'Right',
      'bg-black/30': imagePosition === 'Top' || imagePosition === 'Bottom'
    }, className)}>
      <div className={cn('w-full px-4 md:px-8 py-8 md:py-16', {
        'max-w-6xl mx-auto': imagePosition === 'Top' || imagePosition === 'Bottom'
      }, getLayoutClasses())}>
        {image && (
          <div className={cn('w-full', getImageOrder(), {
            'h-[200px] sm:h-[300px] md:h-[400px]': imagePosition === 'Top' || imagePosition === 'Bottom',
            'lg:sticky lg:top-8 h-[300px] md:h-[400px]': imagePosition === 'Left' || imagePosition === 'Right'
          })}>
            <div className={cn('w-full h-full relative', {
              'overflow-hidden rounded-lg': true
            })}>
              <Media
                resource={image}
                fill={true}
                imgClassName={cn('object-cover', {
                  'object-center': imagePosition === 'Top' || imagePosition === 'Bottom',
                  'object-left': imagePosition === 'Left',
                  'object-right': imagePosition === 'Right'
                })}
              />
            </div>
          </div>
        )}
        
        <div className={cn('flex flex-col gap-4 md:gap-6 w-full overflow-hidden', getContentOrder())}>
          {title && (
            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-3 md:gap-4">
              {iconPrimary && (
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 relative">
                  <Media
                    resource={iconPrimary}
                    fill
                    imgClassName="object-contain"
                  />
                </div>
              )}
              <h2 className={cn('text-2xl sm:text-3xl md:text-4xl font-bold leading-tight break-words', {
                'text-black': imagePosition === 'Left' || imagePosition === 'Right',
                'text-white': imagePosition === 'Top' || imagePosition === 'Bottom'
              })}>{title}</h2>
            </div>
          )}
          
          {content && (
            <div className={cn('prose prose-sm sm:prose-base md:prose-lg max-w-none text-center mx-auto', {
              'prose-black': imagePosition === 'Left' || imagePosition === 'Right',
              'prose-invert': imagePosition === 'Top' || imagePosition === 'Bottom'
            })}>
              <RichText
                data={content}
                enableGutter={false}
                enableProse={true}
                className={cn({
                  '[&_strong]:font-bold [&_strong]:text-black [&_p]:text-black [&_p]:leading-relaxed': imagePosition === 'Left' || imagePosition === 'Right',
                  '[&_strong]:font-bold [&_strong]:text-white [&_p]:text-white [&_p]:leading-relaxed': imagePosition === 'Top' || imagePosition === 'Bottom'
                })}
              />
            </div>
          )}

          {secciones && secciones.length > 0 && (
            <div className={cn('mt-4 md:mt-8 w-full', {
              'flex flex-col items-center gap-3 md:gap-4': imagePosition === 'Left' || imagePosition === 'Right',
              'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6': imagePosition === 'Top' || imagePosition === 'Bottom'
            })}>
              {secciones.map((seccion, index) => (
                <div key={index} className={cn('flex items-center gap-2 md:gap-4 min-w-0 w-full', {
                  'max-w-md': imagePosition === 'Left' || imagePosition === 'Right',
                  'flex-col text-center': imagePosition === 'Top' || imagePosition === 'Bottom'
                })}>
                  {seccion.icono && (
                    <div className={cn('flex-shrink-0 relative', {
                      'w-6 h-6 md:w-8 md:h-8': imagePosition === 'Left' || imagePosition === 'Right',
                      'w-12 h-12 md:w-16 md:h-16': imagePosition === 'Top' || imagePosition === 'Bottom'
                    })}>
                      <Media
                        resource={seccion.icono}
                        fill
                        imgClassName="object-contain"
                      />
                    </div>
                  )}
                  <div className={cn('flex items-center gap-2 min-w-0 overflow-hidden w-full', {
                    'flex-col gap-0.5': imagePosition === 'Top' || imagePosition === 'Bottom'
                  })}>
                    <h3 className={cn('text-base md:text-lg font-semibold whitespace-nowrap', {
                      'text-black': imagePosition === 'Left' || imagePosition === 'Right',
                      'text-white': imagePosition === 'Top' || imagePosition === 'Bottom'
                    })}>{seccion.titulo}</h3>
                    <p className={cn('text-sm md:text-base', {
                      'truncate': imagePosition === 'Left' || imagePosition === 'Right',
                      'text-gray-600': imagePosition === 'Left' || imagePosition === 'Right',
                      'text-gray-100': imagePosition === 'Top' || imagePosition === 'Bottom'
                    })}>{seccion.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

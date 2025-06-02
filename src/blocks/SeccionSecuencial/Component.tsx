import type { SeccionSecuencialBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type Seccion = {
  media: MediaType | string | number | null
  titulo: string
  descripcion: string
  id?: string | null
}

type Props = SeccionSecuencialBlock & {
  className?: string
  enableGutter?: boolean
}

export const SeccionSecuencial: React.FC<Props> = (props) => {
  const { titulo, descripcion, secciones, className, enableGutter = true } = props

  return (
    <div className="w-full bg-blue-200">
      <div className={cn('container mx-auto py-20', className)}>
        {/* Sección principal */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-blue-800 tracking-tight">
            {titulo}
          </h2>
          <div className="w-16 h-0.5 bg-blue-400/50 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-700 leading-relaxed">
            {descripcion}
          </p>
        </div>

        {/* Secciones secuenciales */}
        <div className="relative">
          {/* Línea vertical para móvil */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-400 -translate-x-1/2 lg:hidden" />
          
          <div className="lg:flex lg:flex-row lg:gap-8 space-y-12 lg:space-y-0 lg:pt-12">
            {secciones?.map((seccion, index) => (
              <div key={index} className="relative flex-1 group">
                {/* Número del paso */}
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-0 z-30">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center text-xl font-bold shadow-lg transition-colors duration-200 ease-in-out group-hover:from-indigo-600 group-hover:to-indigo-500">
                    {index + 1}
                  </div>
                </div>

                {/* Línea horizontal entre círculos (solo en desktop) */}
                {index < (secciones.length - 1) && (
                  <div className="hidden lg:block absolute top-0 left-1/2 w-[calc(100%-24px)] h-1 bg-gradient-to-r from-blue-500 to-blue-400 z-20 transition-colors duration-200 ease-in-out group-hover:from-indigo-500 group-hover:to-indigo-400">
                    {/* Círculo decorativo al final de la línea */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow-sm transition-colors duration-200 ease-in-out group-hover:bg-indigo-500" />
                  </div>
                )}

                {/* Contenido del paso */}
                <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6 lg:mt-0 lg:h-full z-10 transition-colors duration-200 ease-in-out group-hover:bg-white/90">
                  <div className="flex items-start gap-4 h-full">
                    {/* Media */}
                    {seccion.media && (
                      <div className="w-16 h-16 flex-shrink-0">
                        <Media 
                          resource={seccion.media} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Texto */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-2 text-blue-700 transition-colors duration-200 ease-in-out group-hover:text-indigo-700">{seccion.titulo}</h3>
                      <p className="text-gray-600 transition-colors duration-200 ease-in-out group-hover:text-gray-800">{seccion.descripcion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
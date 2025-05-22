"use client";

import React, { useEffect, useRef } from 'react'
import { Media } from '../../payload-types'
import RichText from '../../components/RichText'
import { cn } from '@/utilities/ui';

type Instruccion = {
  instruccion: string;
  icono?: Media | number | null;
  titulo?: string;
  descripcion?: any;
}

type Props = {
  blockType: 'seccionInstrucciones'
  blockName?: string
  instrucciones?: Instruccion[]
  title?: any;
  className?: string;
  enableGrayBackground?: boolean;
}

export const SeccionInstruccionesComponent: React.FC<Props> = ({ 
  title, 
  instrucciones,
  className,
  enableGrayBackground = false
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const instruccionesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (instrucciones) {
      instruccionesRef.current = instruccionesRef.current.slice(0, instrucciones.length);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.add('translate-y-0');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) observer.observe(titleRef.current);
    
    instruccionesRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [instrucciones?.length]);

  return (
    <section className={cn("flex justify-center items-center w-full py-8 md:py-16", {
      'bg-gray-100': enableGrayBackground
    }, className)}>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-0">
        {title && (
          <div 
            ref={titleRef} 
            className="text-center mb-8 md:mb-12 opacity-0 transform transition-all duration-700 translate-y-10"
          >
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-red-600 mb-2">
                {typeof title === 'object' && title.root && title.root.children && 
                  title.root.children.map((child: any, i: number) => {
                    if (child.type === 'heading' && child.children) {
                      return child.children.map((textNode: any, j: number) => 
                        textNode.text ? <span key={`${i}-${j}`}>{textNode.text}</span> : null
                      );
                    }
                    return null;
                  })
                }
              </h1>
              <p className="text-base md:text-xl text-gray-700 inline-block">
                {typeof title === 'object' && title.root && title.root.children && 
                  title.root.children.map((child: any, i: number) => {
                    if (child.type === 'paragraph' && child.children) {
                      return child.children.map((textNode: any, j: number) => 
                        textNode.text ? <span key={`${i}-${j}`}>{textNode.text}</span> : null
                      );
                    }
                    return null;
                  })
                }
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instrucciones?.map((instruccion: Instruccion, i: number) => {
            const icono = instruccion.icono as Media
            
            return (
              <div 
                key={i} 
                ref={(el) => { instruccionesRef.current[i] = el; }}
                className="flex flex-col items-center text-center opacity-0 transform transition-all duration-700 translate-y-10"
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-red-600 text-2xl font-bold mr-2">•</div>
                  {icono && icono.url && (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={icono.url} 
                        alt={icono.alt || 'Icono de instrucción'} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  )}
                  <div className="text-red-600 text-2xl font-bold ml-2">
                    {instruccion.titulo }
                  </div>
                </div>
                
                <div className="mt-4">
                  {instruccion.descripcion ? (
                    <RichText 
                      data={instruccion.descripcion} 
                      className="text-gray-700 text-base md:text-lg"
                    />
                  ) : (
                    <p className="text-gray-700 text-base md:text-lg">{instruccion.instruccion}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export const SeccionInstruccionesBlock = SeccionInstruccionesComponent;

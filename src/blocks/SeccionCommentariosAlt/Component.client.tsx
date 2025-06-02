'use client'

import React from 'react'
import { Media, SeccionComentariosAltBlock } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = SeccionComentariosAltBlock

const CommentCard = ({ comment, starIcon, starIconEmpt, index }: any) => (
  <div
    key={`comment-${index}`}
    className="carousel-item p-4 md:p-5 bg-white rounded shadow-md h-auto min-h-[320px] flex flex-col"
  >
    <div className="flex items-center mx-10 mb-4">
      <div className="relative w-16 h-10 mr-4 rounded-full overflow-hidden flex-shrink-0">
        <MediaComponent
          resource={comment.userIcon}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-xl">{comment.userName}</h3>
    </div>
    <div className="flex-grow overflow-hidden">
      <div className="py-2 px-4 md:px-5 text-lg leading-relaxed">
        {comment.comment && <RichText data={comment.comment} />}
      </div>
    </div>
    <div className="flex mt-auto pt-4">
      {[...Array(5)].map((_, i) => (
        <div key={`star-${index}-${i}`} className="relative w-8 h-8 mr-1">
          <MediaComponent
            resource={i < comment.puntuacion ? starIcon : starIconEmpt}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  </div>
)

export const SeccionComentariosAltClient: React.FC<Props> = ({ comments, starIcon, starIconEmpt, titulo, descripcion }) => {
  const commentsList = comments || []

  if (commentsList.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full text-center mb-8 px-4 md:px-6 lg:px-8 xl:px-10">
          <h2 className="text-3xl font-bold mb-4">{titulo}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{descripcion}</p>
        </div>
        <p className="text-gray-500">No hay comentarios disponibles.</p>
      </div>
    )
  }

  // Calculamos el ancho total de los comentarios para la animación
  const itemWidth = 'calc(25% - 1rem)' // Ancho de cada comentario
  const gapWidth = '1rem' // Espacio entre comentarios
  const totalItems = commentsList.length // Número total de comentarios

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="w-full text-center mb-8 px-4 md:px-6 lg:px-8 xl:px-10">
        <h2 className="text-3xl font-bold mb-4">{titulo}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{descripcion}</p>
      </div>
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 py-5 md:py-8 xl:py-10">
        <div className="carousel-outer">
          <div className="carousel-track">
            <div className="carousel-inner">
              {commentsList.map((comment, index) => (
                <CommentCard 
                  key={`comment-${index}`}
                  comment={comment}
                  starIcon={starIcon}
                  starIconEmpt={starIconEmpt}
                  index={index}
                />
              ))}
            </div>
            <div className="carousel-inner" aria-hidden="true">
              {commentsList.map((comment, index) => (
                <CommentCard 
                  key={`comment-second-${index}`}
                  comment={comment}
                  starIcon={starIcon}
                  starIconEmpt={starIconEmpt}
                  index={`second-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .carousel-outer {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          width: fit-content;
          animation: slideShow ${commentsList.length * 8}s linear infinite;
          gap: 0;
        }

        .carousel-inner {
          display: flex;
          gap: ${gapWidth};
          width: fit-content;
          flex-shrink: 0;
        }

        .carousel-item {
          width: ${itemWidth};
          min-width: 280px;
          flex: 0 0 auto;
        }

        @keyframes slideShow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .carousel-outer:hover .carousel-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
} 
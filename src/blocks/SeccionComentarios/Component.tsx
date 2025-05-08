import React from 'react'
import { Media } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'
import RichText from '@/components/RichText'

type Comment = {
  userName: string
  comment: any
  userIcon: Media
  puntuacion: number
}

type Props = {
  comments: Comment[]
  starIcon: Media
  starIconEmpt: Media
}

export const SeccionComentariosBlock: React.FC<Props> = ({ comments, starIcon, starIconEmpt }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 py-5 md:py-8 xl:py-10">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex-none snap-center p-4 md:p-5 bg-white rounded shadow-md h-auto min-h-[320px] flex flex-col
                w-[calc(100%-2rem)]
                md:w-[calc(50%-1rem)]
                lg:w-[calc(33.33%-1rem)]
                xl:w-[calc(25%-1rem)]"
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
                  <RichText data={comment.comment} />
                </div>
              </div>
              <div className="flex mt-auto pt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="relative w-8 h-8 mr-1">
                    <MediaComponent
                      resource={i < comment.puntuacion ? starIcon : starIconEmpt}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex overflow-x-auto gap-6 pb-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-slate-600 rounded-lg shadow-md p-6 min-w-[300px] flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4">
                <MediaComponent
                  resource={comment.userIcon}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{comment.userName}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5">
                      <MediaComponent
                        resource={i < comment.puntuacion ? starIcon : starIconEmpt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                  </div>
              </div>
            </div>
            <div className="prose max-w-none">
              <RichText data={comment.comment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

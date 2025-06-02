import React from 'react'
import { SeccionComentariosAltClient } from './Component.client'
import type { SeccionComentariosAltBlock as SeccionComentariosAltBlockType } from '@/payload-types'

export const SeccionComentariosAltBlock: React.FC<SeccionComentariosAltBlockType> = (props) => {
  return <SeccionComentariosAltClient {...props} />
}

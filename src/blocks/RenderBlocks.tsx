import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { ArchiveBlockAlt } from '@/blocks/ArchiveBlockAlt/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CallToActionBlockAlt } from '@/blocks/CallToActionAlt/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SeccionComentariosBlock } from '@/blocks/SeccionComentarios/Component'
import { SeccionComentariosAltBlock } from '@/blocks/SeccionCommentariosAlt/Component'
import { SeccionServiciosBlock } from '@/blocks/SeccionBeneficios/Component'
import { SeccionProvinciasBlock } from './SeccionProvincias/Component'
import { SeccionProvinciasAltBlock } from './SeccionProvinciasAlt/Component'
import { SeccionInformativoBlock } from '@/blocks/SeccionInformativo/Component'
import { SeccionInstruccionesBlock } from '@/blocks/SeccionInstrucciones/Component'
import { SeccionSecuencial } from '@/blocks/SeccionSecuencial/Component'
import EmergencyBannerBlock from '@/blocks/EmergencyBanner/Component'
import { BannerEmergencia } from '@/blocks/EmergencyBannerAlt/Component'
import { SeccionInformativoAlt } from '@/blocks/SeccionInformativoAlt/Component'

const blockComponents = {
  archive: ArchiveBlock,
  archiveAlt: ArchiveBlockAlt,
  content: ContentBlock,
  cta: CallToActionBlock,
  ctaAlt: CallToActionBlockAlt,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  seccionComentarios: SeccionComentariosBlock,
  seccionComentariosAlt: SeccionComentariosAltBlock,
  seccionServicios: SeccionServiciosBlock,
  seccionProvincias: SeccionProvinciasBlock,
  seccionProvinciasAlt: SeccionProvinciasAltBlock,
  seccionInformativo: SeccionInformativoBlock,
  seccionInformativoAlt: SeccionInformativoAlt,
  seccionInstrucciones: SeccionInstruccionesBlock,
  seccionSecuencial: SeccionSecuencial,
  emergencyBanner: EmergencyBannerBlock,
  bannerEmergenciaAlt: BannerEmergencia,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType === 'emergencyBanner') {
            return null
          }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

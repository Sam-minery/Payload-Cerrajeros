// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Provincias } from './collections/Provincias'
import { Municipios } from './collections/Municipios'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

import { SeccionInstrucciones } from './blocks/SeccionInstrucciones/config'
import { SeccionComentarios } from './blocks/SeccionComentarios/config'
import { SeccionInformativo } from './blocks/SeccionInformativo/config'
import { SeccionSecuencial } from './blocks/SeccionSecuencial/config'
import { Contactos } from './collections/Contactos'
import { EmergencyBanner } from '@/blocks/EmergencyBanner/config'
import { BannerEmergenciaBlock } from '@/blocks/EmergencyBannerAlt/config'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { ArchiveBlockAlt } from '@/blocks/ArchiveBlockAlt/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { CallToActionAlt } from '@/blocks/CallToActionAlt/config'
import { Content } from '@/blocks/Content/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { SeccionServicios } from '@/blocks/SeccionBeneficios/config'
import { SeccionProvincias } from '@/blocks/SeccionProvincias/config'
import { SeccionProvinciasAlt } from '@/blocks/SeccionProvinciasAlt/config'
import { SeccionComentariosAlt } from '@/blocks/SeccionCommentariosAlt/Config'
import { SeccionInformativoAlt } from '@/blocks/SeccionInformativoAlt/config'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Pages, 
    Provincias,
    Municipios,
    Posts, 
    Media, 
    Categories, 
    Users,
    Contactos
  ],
  
  blocks: [
    SeccionInstrucciones,
    SeccionComentarios,
    SeccionInformativo,
    SeccionSecuencial,
    EmergencyBanner,
    BannerEmergenciaBlock,
    Archive,
    ArchiveBlockAlt,
    CallToAction,
    CallToActionAlt,
    Content,
    FormBlock,
    MediaBlock,
    SeccionServicios,
    SeccionProvincias,
    SeccionProvinciasAlt,
    SeccionComentariosAlt,
    SeccionInformativoAlt
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header, 
    Footer,
  ],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})

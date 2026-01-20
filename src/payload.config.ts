import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { HeroSlider } from './globals/HeroSlider'
import { SiteSettings } from './globals/SiteSettings'
import { Features } from './globals/Features'
import { HomepageAbout } from './globals/HomepageAbout'
import { HomepageProducts } from './globals/HomepageProducts'
import { HomepageCTA } from './globals/HomepageCTA'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { MitraPage } from './globals/MitraPage'
import { revalidatePlugin } from './plugins/revalidatePlugin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const baseConfig = {
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './components/admin/Logo',
        Icon: './components/admin/Icon',
      },
    },
  },
  collections: [Users, Media, Products],
  globals: [HeroSlider, SiteSettings, Features, HomepageAbout, HomepageProducts, HomepageCTA, AboutPage, ContactPage, MitraPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
}

// Apply revalidation plugin
export default buildConfig(revalidatePlugin(baseConfig))


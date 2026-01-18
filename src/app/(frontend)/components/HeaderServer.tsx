import { getPayload } from 'payload'
import config from '@payload-config'
import { HeaderClient } from './Header'

export async function Header() {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  return <HeaderClient data={siteSettings} />
}

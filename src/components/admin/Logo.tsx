import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

const Logo = async () => {
  const payload = await getPayload({ config })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const logoImage = siteSettings.logo?.image as Media | undefined
  const logoText = siteSettings.logo?.text || 'Admin'

  if (logoImage?.url) {
    return (
      <img
        src={logoImage.url}
        alt={logoText}
        style={{
          maxHeight: '50px',
          width: 'auto',
        }}
      />
    )
  }

  // Fallback: Text logo with icon
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C12 2 8 6 8 12C8 16 10 20 12 22C14 20 16 16 16 12C16 6 12 2 12 2Z"
          fill="#6B7F5E"
        />
        <path
          d="M12 6C12 6 10 8 10 11C10 13 11 15 12 16C13 15 14 13 14 11C14 8 12 6 12 6Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>
      <span style={{ 
        fontSize: '22px', 
        fontWeight: 500, 
        color: '#5C5346' 
      }}>
        {logoText}
      </span>
    </div>
  )
}

export default Logo

import React from 'react'
import './styles.css'
import { Header } from './components/HeaderServer'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config })
  
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const seo = siteSettings.seo
  const logoText = siteSettings.logo?.text || 'Skincare'
  const siteTitle = seo?.siteTitle || logoText
  const siteDescription = seo?.siteDescription || 'Solusi perawatan kulit terbaik'
  const faviconUrl = getImageUrl(seo?.favicon)
  const ogImageUrl = getImageUrl(seo?.ogImage)

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: seo?.keywords?.split(',').map(k => k.trim()),
    icons: faviconUrl ? {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    } : undefined,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      siteName: siteTitle,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

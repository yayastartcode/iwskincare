import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Footer } from '../components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi kami melalui berbagai channel komunikasi',
}

// Icon components for each contact type
const ContactIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'whatsapp':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    case 'phone':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    case 'email':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'address':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'shopee':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.53 4.078c1.758 0 3.183 1.387 3.183 3.098 0 .2-.02.395-.054.585h1.227c.232 0 .42.18.42.403v.21c0 .223-.188.404-.42.404h-8.65c-.232 0-.42-.18-.42-.403v-.21c0-.224.188-.404.42-.404h1.14c-.03-.183-.047-.37-.047-.557 0-1.74 1.46-3.126 3.2-3.126zm0 1.143c-1.11 0-2.013.87-2.013 1.955 0 .196.03.385.083.565h3.86c.053-.18.083-.37.083-.565 0-1.085-.903-1.955-2.013-1.955zm-5.783 4.39h10.506c.462 0 .837.36.837.804v8.582c0 .444-.375.803-.837.803H6.747c-.462 0-.837-.36-.837-.803v-8.582c0-.444.375-.804.837-.804z"/>
        </svg>
      )
    case 'tokopedia':
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c.883 0 1.6.717 1.6 1.6S12.883 8 12 8s-1.6-.717-1.6-1.6.717-1.6 1.6-1.6zm5.6 12.8H6.4v-1.6h11.2v1.6zm0-3.2H6.4V12h11.2v2.4z"/>
        </svg>
      )
    default:
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
  }
}

// Generate URL based on contact type
const getContactUrl = (type: string, value: string, customUrl?: string | null): string => {
  if (customUrl) return customUrl
  
  switch (type) {
    case 'whatsapp':
      return `https://wa.me/${value.replace(/[^0-9]/g, '')}`
    case 'phone':
      return `tel:${value.replace(/[^0-9+]/g, '')}`
    case 'email':
      return `mailto:${value}`
    case 'instagram':
      return `https://instagram.com/${value.replace('@', '')}`
    case 'facebook':
      return `https://facebook.com/${value}`
    case 'tiktok':
      return `https://tiktok.com/@${value.replace('@', '')}`
    case 'youtube':
      return `https://youtube.com/${value}`
    default:
      return '#'
  }
}

// Get background color based on type
const getContactColor = (type: string): string => {
  switch (type) {
    case 'whatsapp':
      return 'bg-[#25d366] hover:bg-[#1da851]'
    case 'phone':
      return 'bg-[#6B7F5E] hover:bg-[#5a6b4f]'
    case 'email':
      return 'bg-[#ea4335] hover:bg-[#d33426]'
    case 'instagram':
      return 'bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90'
    case 'facebook':
      return 'bg-[#1877f2] hover:bg-[#0d65d9]'
    case 'tiktok':
      return 'bg-black hover:bg-gray-800'
    case 'youtube':
      return 'bg-[#ff0000] hover:bg-[#cc0000]'
    case 'address':
      return 'bg-[#5C5346] hover:bg-[#4a4339]'
    case 'shopee':
      return 'bg-[#ee4d2d] hover:bg-[#d73211]'
    case 'tokopedia':
      return 'bg-[#42b549] hover:bg-[#37963d]'
    default:
      return 'bg-gray-600 hover:bg-gray-700'
  }
}

export default async function ContactPage() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'contact-page',
  })

  const activeContacts = data.contacts?.filter((contact) => contact.isActive) ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#f8f7f4] px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#5C5346] md:text-5xl">
            {data.title || 'Hubungi Kami'}
          </h1>
          {data.subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {data.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Contacts Grid */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          {activeContacts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeContacts.map((contact, index) => {
                const url = getContactUrl(contact.type, contact.value, contact.url)
                const isLink = contact.type !== 'address'

                const CardContent = (
                  <div className={`flex items-center gap-4 rounded-2xl p-6 text-white transition-all ${getContactColor(contact.type)}`}>
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                      <ContactIcon type={contact.type} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/80">
                        {contact.label}
                      </p>
                      <p className="truncate font-semibold">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                )

                return isLink ? (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {CardContent}
                  </Link>
                ) : (
                  <div key={index}>{CardContent}</div>
                )
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">Belum ada kontak yang ditambahkan</p>
            </div>
          )}
        </div>
      </section>

      {/* Operational Hours */}
      {data.operationalHours?.show && data.operationalHours.hours && data.operationalHours.hours.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#5C5346]">
              {data.operationalHours.title || 'Jam Operasional'}
            </h2>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="space-y-4">
                {data.operationalHours.hours.map((hour, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-[#5C5346]">{hour.days}</span>
                    <span className="text-gray-600">{hour.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

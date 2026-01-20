import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Footer } from '../components/Footer'
import { PartnerRegistrationForm } from './PartnerRegistrationForm'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Pendaftaran Mitra',
  description: 'Bergabunglah menjadi mitra kami - Agen, Sub Agen, atau Reseller',
}

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export default async function MitraPage() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'mitra-page',
  })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const heroImageUrl = getImageUrl(data.heroImage)
  const adminWhatsapp = siteSettings.contact?.whatsapp || ''

  // Partner types data
  const partnerTypes = [
    {
      title: data.partnerTypes?.agen?.title || 'Agen',
      description: data.partnerTypes?.agen?.description || 'Mitra utama dengan wilayah eksklusif',
      requirements: data.partnerTypes?.agen?.requirements || [],
      color: '#6B7F5E',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: data.partnerTypes?.subAgen?.title || 'Sub Agen',
      description: data.partnerTypes?.subAgen?.description || 'Mitra di bawah koordinasi Agen',
      requirements: data.partnerTypes?.subAgen?.requirements || [],
      color: '#5C5346',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: data.partnerTypes?.reseller?.title || 'Reseller',
      description: data.partnerTypes?.reseller?.description || 'Mulai tanpa modal, untung maksimal',
      requirements: data.partnerTypes?.reseller?.requirements || [],
      color: '#8B7355',
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        {heroImageUrl ? (
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={heroImageUrl}
              alt={data.title || 'Pendaftaran Mitra'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-6 text-center">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {data.title || 'Pendaftaran Mitra'}
                </h1>
                {data.subtitle && (
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                    {data.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#f8f7f4] px-6 py-16">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="text-4xl font-bold text-[#5C5346] md:text-5xl">
                {data.title || 'Pendaftaran Mitra'}
              </h1>
              {data.subtitle && (
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                  {data.subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Description */}
      {data.description && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg prose-p:text-gray-600 prose-strong:text-[#5C5346] mx-auto">
              <RichText data={data.description} />
            </div>
          </div>
        </section>
      )}

      {/* Partner Types */}
      <section className="bg-[#f8f7f4] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#5C5346]">
            {data.partnerTypes?.sectionTitle || 'Pilih Jenis Kemitraan'}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {partnerTypes.map((partner, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1"
              >
                {/* Header */}
                <div
                  className="px-6 py-5 text-white"
                  style={{ backgroundColor: partner.color }}
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                    {partner.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{partner.title}</h3>
                  <p className="mt-1 text-white/80">{partner.description}</p>
                </div>
                
                {/* Requirements */}
                <div className="p-6">
                  <h4 className="mb-4 font-semibold text-[#5C5346]">Syarat & Ketentuan:</h4>
                  <ul className="space-y-3">
                    {partner.requirements.map((req: { text: string }, reqIndex: number) => (
                      <li key={reqIndex} className="flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6B7F5E]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#5C5346]">
              {data.formSection?.title || 'Form Pendaftaran Mitra'}
            </h2>
            {data.formSection?.description && (
              <p className="mt-4 text-gray-600">
                {data.formSection.description}
              </p>
            )}
          </div>
          
          <div className="mt-10 rounded-2xl bg-[#f8f7f4] p-8">
            <PartnerRegistrationForm
              adminWhatsapp={adminWhatsapp}
              submitButtonLabel={data.formSection?.submitButtonLabel || 'Daftar via WhatsApp'}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

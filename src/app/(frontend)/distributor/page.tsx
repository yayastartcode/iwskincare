import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Footer } from '../components/Footer'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Gabung Menjadi Distributor',
  description: 'Jadilah mitra bisnis kami dan kembangkan jaringan distribusi di wilayah Anda',
}

// Helper to get image URL
const getImageUrl = (image: string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  return image.url ?? null
}

export default async function DistributorPage() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'distributor-page',
  })

  const heroImageUrl = getImageUrl(data.heroImage)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        {heroImageUrl ? (
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={heroImageUrl}
              alt={data.title || 'Gabung Menjadi Distributor'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-6 text-center">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {data.title || 'Gabung Menjadi Distributor'}
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
                {data.title || 'Gabung Menjadi Distributor'}
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

      {/* Benefits */}
      {data.benefits && data.benefits.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#5C5346]">
              Keuntungan Menjadi Distributor
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.benefits.map((benefit, index) => {
                const iconUrl = getImageUrl(benefit.icon)
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white p-6 shadow-lg"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6B7F5E]/10">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={benefit.title}
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain"
                        />
                      ) : (
                        <svg className="h-7 w-7 text-[#6B7F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[#5C5346]">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="text-gray-600">{benefit.description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Requirements */}
      {data.requirements?.items && data.requirements.items.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#5C5346]">
              {data.requirements.title || 'Syarat Menjadi Distributor'}
            </h2>
            <div className="rounded-2xl bg-[#f8f7f4] p-8">
              <ul className="space-y-4">
                {data.requirements.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#6B7F5E] text-sm font-medium text-white">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Area Coverage */}
      {data.coverage?.show && data.coverage.areas && data.coverage.areas.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-[#5C5346]">
              {data.coverage.title || 'Area Distribusi Tersedia'}
            </h2>
            {data.coverage.description && (
              <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">
                {data.coverage.description}
              </p>
            )}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {data.coverage.areas.map((area, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 text-center ${
                    area.isAvailable
                      ? 'bg-white shadow-md'
                      : 'bg-gray-200 opacity-60'
                  }`}
                >
                  <div className="mb-2">
                    {area.isAvailable ? (
                      <svg className="mx-auto h-6 w-6 text-[#6B7F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="mx-auto h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <p className={`font-medium ${area.isAvailable ? 'text-[#5C5346]' : 'text-gray-500'}`}>
                    {area.name}
                  </p>
                  <p className={`text-xs ${area.isAvailable ? 'text-[#6B7F5E]' : 'text-gray-400'}`}>
                    {area.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {data.cta && (
        <section className="bg-[#6B7F5E] px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              {data.cta.title || 'Siap Menjadi Mitra Kami?'}
            </h2>
            {data.cta.description && (
              <p className="mb-8 text-lg text-white/80">
                {data.cta.description}
              </p>
            )}
            {data.cta.buttonUrl && data.cta.buttonLabel && (
              <Link
                href={data.cta.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-medium text-[#6B7F5E] transition-colors hover:bg-gray-100"
              >
                {data.cta.buttonLabel}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

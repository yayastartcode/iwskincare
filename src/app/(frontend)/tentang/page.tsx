import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Footer } from '../components/Footer'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali lebih dekat tentang kami, visi misi, dan nilai-nilai kami',
}

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export default async function AboutPage() {
  const payload = await getPayload({ config })

  const data = await payload.findGlobal({
    slug: 'about-page',
  })

  const heroImageUrl = getImageUrl(data.heroImage)
  const aboutImageUrl = getImageUrl(data.aboutImage)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        {heroImageUrl ? (
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src={heroImageUrl}
              alt={data.title || 'Tentang Kami'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white md:text-5xl">
                  {data.title || 'Tentang Kami'}
                </h1>
                {data.subtitle && (
                  <p className="mt-4 text-lg text-white/80">{data.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#f8f7f4] px-6 py-16">
            <div className="mx-auto max-w-7xl text-center">
              <h1 className="text-4xl font-bold text-[#5C5346] md:text-5xl">
                {data.title || 'Tentang Kami'}
              </h1>
              {data.subtitle && (
                <p className="mt-4 text-lg text-gray-600">{data.subtitle}</p>
              )}
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      {(data.aboutTitle || data.aboutContent) && (
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Image */}
              {aboutImageUrl && (
                <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/3]">
                  <Image
                    src={aboutImageUrl}
                    alt={data.aboutTitle || 'Tentang Kami'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className={aboutImageUrl ? '' : 'md:col-span-2 md:max-w-3xl md:mx-auto'}>
                {data.aboutTitle && (
                  <h2 className="mb-6 text-3xl font-bold text-[#5C5346] md:text-4xl">
                    {data.aboutTitle}
                  </h2>
                )}
                {data.aboutContent && (
                  <div className="prose prose-lg prose-p:text-gray-600 prose-strong:text-[#5C5346] prose-ul:text-gray-600">
                    <RichText data={data.aboutContent} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission Section */}
      {(data.visionContent || data.missionContent) && (
        <section className="bg-[#f8f7f4] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Vision */}
              {data.visionContent && (
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6B7F5E]/10">
                    <svg className="h-6 w-6 text-[#6B7F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-[#5C5346]">
                    {data.visionTitle || 'Visi'}
                  </h3>
                  <div className="prose prose-p:text-gray-600">
                    <RichText data={data.visionContent} />
                  </div>
                </div>
              )}

              {/* Mission */}
              {data.missionContent && (
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6B7F5E]/10">
                    <svg className="h-6 w-6 text-[#6B7F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-[#5C5346]">
                    {data.missionTitle || 'Misi'}
                  </h3>
                  <div className="prose prose-p:text-gray-600 prose-ul:text-gray-600 prose-ol:text-gray-600">
                    <RichText data={data.missionContent} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {data.values && data.values.length > 0 && (
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            {data.valuesTitle && (
              <h2 className="mb-12 text-center text-3xl font-bold text-[#5C5346] md:text-4xl">
                {data.valuesTitle}
              </h2>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.values.map((value, index) => {
                const iconUrl = getImageUrl(value.icon)
                return (
                  <div key={index} className="rounded-2xl bg-[#f8f7f4] p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={value.title}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <svg className="h-8 w-8 text-[#6B7F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-[#5C5346]">
                      {value.title}
                    </h3>
                    {value.description && (
                      <p className="text-gray-600">{value.description}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

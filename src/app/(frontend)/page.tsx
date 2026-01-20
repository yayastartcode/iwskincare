import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { HeroSlider } from './components/HeroSlider'
import { ProductCard } from './components/ProductCard'
import { Footer } from './components/Footer'
import type { Media, Product } from '@/payload-types'

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch data in parallel
  const [heroSliderData, featuresData, aboutData, productsSettingsData, ctaData] = await Promise.all([
    payload.findGlobal({ slug: 'hero-slider' }),
    payload.findGlobal({ slug: 'features' }),
    payload.findGlobal({ slug: 'homepage-about' }),
    payload.findGlobal({ slug: 'homepage-products' }),
    payload.findGlobal({ slug: 'homepage-cta' }),
  ])

  // Filter active features
  const activeFeatures = featuresData.items?.filter((item) => item.isActive) ?? []

  // Fetch products based on settings
  let products: Product[] = []
  if (productsSettingsData.isActive) {
    const maxProducts = productsSettingsData.maxProducts ?? 8

    if (productsSettingsData.displayType === 'manual' && productsSettingsData.selectedProducts) {
      // Manual selection - already populated
      products = (productsSettingsData.selectedProducts as Product[]).filter(p => p.isActive).slice(0, maxProducts)
    } else if (productsSettingsData.displayType === 'featured') {
      // Featured products
      const result = await payload.find({
        collection: 'products',
        where: {
          and: [
            { isActive: { equals: true } },
            { isFeatured: { equals: true } },
          ],
        },
        limit: maxProducts,
        sort: '-createdAt',
      })
      products = result.docs
    } else {
      // Latest products
      const result = await payload.find({
        collection: 'products',
        where: { isActive: { equals: true } },
        limit: maxProducts,
        sort: '-createdAt',
      })
      products = result.docs
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Slider with overlapping cards */}
      <div className="relative bg-[#f8f7f4] pb-24 md:pb-32">
        <div className="flex justify-center">
          <HeroSlider data={heroSliderData} />
        </div>

        {/* Features Cards - Overlapping */}
        {activeFeatures.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 px-4">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                {activeFeatures.map((feature, index) => {
                  const iconUrl = getImageUrl(feature.icon)
                  return (
                    <div key={index} className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 md:h-16 md:w-16">
                        {iconUrl ? (
                          <Image
                            src={iconUrl}
                            alt={feature.title}
                            width={40}
                            height={40}
                            className="h-8 w-8 object-contain md:h-10 md:w-10"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-300" />
                        )}
                      </div>
                      <h3 className="mb-1 text-center text-base font-semibold text-[#5C5346] md:text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-center text-xs text-gray-500 md:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer for overlapping cards */}
      <div className="h-32 md:h-40"></div>

      {/* About Section */}
      {aboutData.isActive && (
        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Image */}
              <div className="relative">
                {getImageUrl(aboutData.image) ? (
                  <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/3]">
                    <Image
                      src={getImageUrl(aboutData.image)!}
                      alt={aboutData.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#6B7F5E]/20 to-[#6B7F5E]/5 md:aspect-[4/3]" />
                )}
              </div>

              {/* Content */}
              <div>
                {aboutData.subtitle && (
                  <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-[#6B7F5E]">
                    {aboutData.subtitle}
                  </span>
                )}
                <h2 className="mb-4 text-3xl font-bold text-[#5C5346] md:text-4xl">
                  {aboutData.title}
                </h2>
                <div className="mb-6 text-gray-600 leading-relaxed prose prose-p:my-3 prose-p:text-gray-600 prose-strong:text-[#5C5346] prose-ul:my-3 prose-li:text-gray-600">
                  {aboutData.description && <RichText data={aboutData.description} />}
                </div>

                {/* Highlights */}
                {aboutData.highlights && aboutData.highlights.length > 0 && (
                  <ul className="mb-8 space-y-3">
                    {aboutData.highlights.map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <svg className="h-5 w-5 flex-shrink-0 text-[#6B7F5E]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                {aboutData.ctaButton?.show && aboutData.ctaButton.label && aboutData.ctaButton.url && (
                  <Link
                    href={aboutData.ctaButton.url}
                    className="inline-block rounded-lg bg-[#6B7F5E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#5a6b4f]"
                  >
                    {aboutData.ctaButton.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {productsSettingsData.isActive && products.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-12 text-center">
              {productsSettingsData.subtitle && (
                <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-[#6B7F5E]">
                  {productsSettingsData.subtitle}
                </span>
              )}
              {productsSettingsData.title && (
                <h2 className="mb-4 text-3xl font-bold text-[#5C5346] md:text-4xl">
                  {productsSettingsData.title}
                </h2>
              )}
              {productsSettingsData.description && (
                <p className="mx-auto max-w-2xl text-gray-600">
                  {productsSettingsData.description}
                </p>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* CTA Button */}
            {productsSettingsData.ctaButton?.show && productsSettingsData.ctaButton.label && productsSettingsData.ctaButton.url && (
              <div className="mt-12 text-center">
                <Link
                  href={productsSettingsData.ctaButton.url}
                  className="inline-block rounded-lg border-2 border-[#6B7F5E] px-8 py-3 font-medium text-[#6B7F5E] transition-colors hover:bg-[#6B7F5E] hover:text-white"
                >
                  {productsSettingsData.ctaButton.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaData.isActive && (
        <section className="relative overflow-hidden">
          {/* Background Image */}
          {getImageUrl(ctaData.backgroundImage) ? (
            <div className="absolute inset-0">
              <Image
                src={getImageUrl(ctaData.backgroundImage)!}
                alt=""
                fill
                className="object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[#5C5346]" />
          )}

          {/* Content */}
          <div className="relative px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              {ctaData.title && (
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {ctaData.title}
                </h2>
              )}
              {ctaData.description && (
                <p className="mb-8 text-base text-white/80 md:text-lg">
                  {ctaData.description}
                </p>
              )}
              {ctaData.button?.label && ctaData.button?.url && (
                <Link
                  href={ctaData.button.url}
                  target={ctaData.button.openInNewTab ? '_blank' : undefined}
                  rel={ctaData.button.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="inline-block rounded-lg bg-[#D4A84B] px-8 py-4 text-base font-medium text-[#5C5346] transition-colors hover:bg-[#c49a3d] md:text-lg"
                >
                  {ctaData.button.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

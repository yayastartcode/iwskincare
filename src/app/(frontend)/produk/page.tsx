import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { ProductCard } from '../components/ProductCard'
import { Footer } from '../components/Footer'
import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export const metadata: Metadata = {
  title: 'Produk',
  description: 'Koleksi lengkap produk skincare berkualitas',
}

// Category options for filter
const categories = [
  { label: 'Semua', value: '' },
  { label: 'Cleanser', value: 'cleanser' },
  { label: 'Toner', value: 'toner' },
  { label: 'Serum', value: 'serum' },
  { label: 'Moisturizer', value: 'moisturizer' },
  { label: 'Sunscreen', value: 'sunscreen' },
  { label: 'Masker', value: 'masker' },
  { label: 'Treatment', value: 'treatment' },
  { label: 'Paket', value: 'paket' },
]

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const payload = await getPayload({ config })
  const { category } = await searchParams

  // Build query
  const whereQuery: any = { isActive: { equals: true } }
  if (category) {
    whereQuery.category = { equals: category }
  }

  // Fetch products and features in parallel
  const [productsResult, featuresData] = await Promise.all([
    payload.find({
      collection: 'products',
      where: whereQuery,
      sort: '-createdAt',
      limit: 100,
    }),
    payload.findGlobal({ slug: 'features' }),
  ])

  const products = productsResult.docs
  const activeFeatures = featuresData.items?.filter((item) => item.isActive) ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#f8f7f4] px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#5C5346] md:text-5xl">
            Produk Kami
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600">
            Koleksi lengkap produk skincare berkualitas dengan bahan alami, 
            teruji klinis, dan bersertifikat BPOM & Halal
          </p>
        </div>
      </section>

      {/* Filter & Products */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat.value}
                href={cat.value ? `/produk?category=${cat.value}` : '/produk'}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat.value || (!category && cat.value === '')
                    ? 'bg-[#6B7F5E] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <svg className="mx-auto mb-4 h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">Belum ada produk dalam kategori ini</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {activeFeatures.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#5C5346]">
              Mengapa Memilih Produk Kami?
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
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
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

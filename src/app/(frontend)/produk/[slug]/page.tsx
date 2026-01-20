import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Footer } from '../../components/Footer'
import { ProductTabs } from './ProductTabs'
import { CertificateViewer } from './CertificateViewer'
import type { Metadata } from 'next'
import type { Media, Product } from '@/payload-types'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

// Helper to format price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const payload = await getPayload({ config })
  const { slug } = await params

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = docs[0]

  if (!product) {
    return { title: 'Produk Tidak Ditemukan' }
  }

  return {
    title: product.name,
    description: product.shortDescription || `Beli ${product.name}`,
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'products',
    where: { isActive: { equals: true } },
    limit: 1000,
  })

  return docs.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: PageProps) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const { docs } = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = docs[0]

  if (!product || !product.isActive) {
    notFound()
  }

  const hasDiscount = product.discountPrice && product.discountPrice < (product.price ?? 0)
  const images = product.images ?? []

  // Get other products and features in parallel
  const [otherProductsResult, featuresData] = await Promise.all([
    payload.find({
      collection: 'products',
      where: {
        and: [
          { isActive: { equals: true } },
          { id: { not_equals: product.id } },
        ],
      },
      limit: 4,
    }),
    payload.findGlobal({ slug: 'features' }),
  ])

  const otherProducts = otherProductsResult.docs
  const activeFeatures = featuresData.items?.filter((item) => item.isActive) ?? []

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-[#6B7F5E]">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li>
              <Link href="/produk" className="text-gray-500 hover:text-[#6B7F5E]">
                Produk
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-[#5C5346] font-medium truncate max-w-[200px]">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Images */}
            <div>
              {/* Main Image */}
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gray-100">
                {images[0] && getImageUrl(images[0].image) ? (
                  <Image
                    src={getImageUrl(images[0].image)!}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <svg className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Discount Badge */}
                {hasDiscount && (
                  <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                    Sale
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, index) => {
                    const imgUrl = getImageUrl(img.image)
                    return imgUrl ? (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                      >
                        <Image
                          src={imgUrl}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null
                  })}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              {product.category && (
                <span className="mb-2 inline-block rounded-full bg-[#6B7F5E]/10 px-3 py-1 text-sm font-medium text-[#6B7F5E]">
                  {product.category}
                </span>
              )}

              {/* Name */}
              <h1 className="mb-3 text-3xl font-bold text-[#5C5346] md:text-4xl">
                {product.name}
              </h1>

              {/* Rating & Social Share Row */}
              <div className="mb-4 flex items-center justify-between">
                {/* 5 Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">(5.0)</span>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Share:</span>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/produk/${product.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#1877f2] hover:text-white"
                    aria-label="Share on Facebook"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Twitter/X */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/produk/${product.slug}`)}&text=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-black hover:text-white"
                    aria-label="Share on X"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${product.name} - ${process.env.NEXT_PUBLIC_SITE_URL || ''}/produk/${product.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#25d366] hover:text-white"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/produk/${product.slug}`)}&text=${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-[#0088cc] hover:text-white"
                    aria-label="Share on Telegram"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Price */}
              {product.price && (
                <div className="mb-6 flex items-center gap-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-3xl font-bold text-[#6B7F5E]">
                        {formatPrice(product.discountPrice!)}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-[#6B7F5E]">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              )}

              {/* Size */}
              {product.size && (
                <p className="mb-4 text-gray-600">
                  <span className="font-medium">Ukuran:</span> {product.size}
                </p>
              )}

              {/* Short Description */}
              {product.shortDescription && (
                <p className="mb-6 text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-[#5C5346]">Manfaat:</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="mt-1 h-4 w-4 flex-shrink-0 text-[#6B7F5E]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Product Details Tabs */}
          <ProductTabs
            tabs={[
              {
                id: 'description',
                label: 'Deskripsi Produk',
                content: (
                  <div className="space-y-8">
                    {/* Description */}
                    {product.description && (
                      <div>
                        <div className="prose prose-p:text-gray-600 prose-strong:text-[#5C5346] prose-ul:text-gray-600 prose-li:text-gray-600">
                          <RichText data={product.description} />
                        </div>
                      </div>
                    )}

                    {/* How to Use */}
                    {product.howToUse && (
                      <div>
                        <h3 className="mb-3 text-lg font-bold text-[#5C5346]">Cara Penggunaan</h3>
                        <div className="prose prose-p:text-gray-600 prose-strong:text-[#5C5346] prose-ol:text-gray-600 prose-li:text-gray-600">
                          <RichText data={product.howToUse} />
                        </div>
                      </div>
                    )}

                    {/* Ingredients */}
                    {product.ingredients && (
                      <div>
                        <h3 className="mb-3 text-lg font-bold text-[#5C5346]">Komposisi</h3>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {product.ingredients}
                        </p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                id: 'certificates',
                label: 'Sertifikat BPOM',
                content: <CertificateViewer certificates={product.certificates ?? []} />,
              },
            ]}
          />
        </div>
      </section>

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <section className="bg-[#f8f7f4] px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-[#5C5346]">
              Produk Lainnya
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {otherProducts.map((otherProduct) => {
                const imgUrl = otherProduct.images?.[0]?.image
                  ? getImageUrl(otherProduct.images[0].image)
                  : null

                return (
                  <Link
                    key={otherProduct.id}
                    href={`/produk/${otherProduct.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={otherProduct.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <svg className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-[#5C5346] line-clamp-2 group-hover:text-[#6B7F5E]">
                        {otherProduct.name}
                      </h3>
                      {otherProduct.price && (
                        <p className="mt-1 font-bold text-[#6B7F5E]">
                          {formatPrice(otherProduct.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {activeFeatures.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#5C5346]">
              Mengapa Memilih Produk Kami?
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {activeFeatures.map((feature, index) => {
                const iconUrl = getImageUrl(feature.icon)
                return (
                  <div key={index} className="rounded-2xl bg-[#f8f7f4] p-4 shadow-lg md:p-6">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white md:h-16 md:w-16">
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

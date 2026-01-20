import Image from 'next/image'
import Link from 'next/link'
import type { Product, Media } from '@/payload-types'

interface ProductCardProps {
  product: Product
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

// Helper to get image URL
const getImageUrl = (image: number | string | Media | null | undefined): string | null => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'number') return null
  return image.url ?? null
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images?.[0]?.image
  const imageUrl = getImageUrl(firstImage)
  const hasDiscount = product.discountPrice && product.discountPrice < (product.price ?? 0)

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            Sale
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm">
            {product.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-1 text-base font-semibold text-[#5C5346] line-clamp-2 group-hover:text-[#6B7F5E]">
          {product.name}
        </h3>

        {product.shortDescription && (
          <p className="mb-3 text-sm text-gray-500 line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Price */}
        {product.price && (
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-[#6B7F5E]">
                  {formatPrice(product.discountPrice!)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-[#6B7F5E]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}

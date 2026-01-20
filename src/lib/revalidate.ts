/**
 * Revalidate the frontend cache when content changes in Payload CMS
 * Uses the API endpoint since revalidatePath can only be called in Next.js request context
 */
export async function revalidateContent(path?: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const secret = process.env.REVALIDATE_SECRET
    
    if (!secret) {
      console.log('[Revalidate] No REVALIDATE_SECRET set, skipping revalidation')
      return
    }

    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ path }),
    })

    if (response.ok) {
      console.log(`[Revalidate] Successfully revalidated: ${path || 'all pages'}`)
    } else {
      console.log(`[Revalidate] Failed to revalidate: ${response.status}`)
    }
  } catch (error) {
    // Silently fail - revalidation is not critical
    console.log('[Revalidate] Could not reach revalidation endpoint (this is OK during build)')
  }
}

/**
 * Path mapping for globals to their frontend pages
 */
export const globalPathMap: Record<string, string[]> = {
  'site-settings': ['/'], // Affects all pages (header, footer)
  'hero-slider': ['/'],
  'features': ['/'],
  'homepage-about': ['/'],
  'homepage-products': ['/'],
  'homepage-cta': ['/'],
  'about-page': ['/tentang'],
  'contact-page': ['/kontak'],
  'mitra-page': ['/mitra'],
}

/**
 * Path mapping for collections
 */
export const collectionPathMap: Record<string, string[]> = {
  'products': ['/produk', '/'],
  'media': [], // Media changes don't need direct revalidation
}

import type { Config } from 'payload'
import { revalidateContent, globalPathMap, collectionPathMap } from '../lib/revalidate'

/**
 * Payload plugin that adds revalidation hooks to all globals and collections
 */
export const revalidatePlugin = (incomingConfig: Config): Config => {
  const config = { ...incomingConfig }

  // Add afterChange hooks to all globals
  if (config.globals) {
    config.globals = config.globals.map((global) => {
      const paths = globalPathMap[global.slug] || ['/']
      
      return {
        ...global,
        hooks: {
          ...global.hooks,
          afterChange: [
            ...(global.hooks?.afterChange || []),
            async () => {
              console.log(`[Payload] Global "${global.slug}" changed, revalidating...`)
              for (const path of paths) {
                await revalidateContent(path)
              }
              // Also revalidate root layout for site-wide changes
              if (global.slug === 'site-settings') {
                await revalidateContent()
              }
            },
          ],
        },
      }
    })
  }

  // Add afterChange and afterDelete hooks to all collections
  if (config.collections) {
    config.collections = config.collections.map((collection) => {
      const paths = collectionPathMap[collection.slug] || []
      
      // Skip if no paths to revalidate
      if (paths.length === 0) {
        return collection
      }

      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterChange: [
            ...(collection.hooks?.afterChange || []),
            async ({ doc }) => {
              console.log(`[Payload] Collection "${collection.slug}" changed, revalidating...`)
              for (const path of paths) {
                await revalidateContent(path)
              }
              // For products, also revalidate the specific product page
              if (collection.slug === 'products' && doc?.slug) {
                await revalidateContent(`/produk/${doc.slug}`)
              }
            },
          ],
          afterDelete: [
            ...(collection.hooks?.afterDelete || []),
            async () => {
              console.log(`[Payload] Collection "${collection.slug}" deleted, revalidating...`)
              for (const path of paths) {
                await revalidateContent(path)
              }
            },
          ],
        },
      }
    })
  }

  return config
}

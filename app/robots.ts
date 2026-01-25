import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/auth/', '/profile/', '/payment/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/auth/', '/profile/', '/payment/'],
      }
    ],
    sitemap: 'https://www.fullstackmentor.space/sitemap.xml',
  }
}
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fullstackmentor.space',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://fullstackmentor.space/challenges',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://fullstackmentor.space/blogs',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
        url: 'https://fullstackmentor.space/courses',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
  ]
}
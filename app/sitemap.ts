import type { MetadataRoute } from 'next'

const BASE = 'https://fullstackmentor.space'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/courses`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blogs`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/challenges`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}

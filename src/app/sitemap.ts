import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://stalgrit.by'
  return [
    { url: base,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${base}/about-us`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contacts`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/nail-finder`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
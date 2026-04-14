import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webfoliosolutions.com'

  const staticRoutes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/case-studies`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const caseStudyRoutes = [
    'eco-tracker', 'agency-alpha', 'ai-scraper', 'quantum-shop'
  ].map(id => ({
    url: `${baseUrl}/case-studies/${id}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  const teamRoutes = ['pratik', 'lead-dev'].map(id => ({
    url: `${baseUrl}/team/${id}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }))

  return [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...teamRoutes,
  ].map(route => ({
    ...route,
    lastModified: new Date(),
  }))
}

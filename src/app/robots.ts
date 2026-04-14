import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webfoliosolutions.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/login', '/api/', '/brain/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

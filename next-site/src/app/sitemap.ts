import type { MetadataRoute } from 'next';
import { getAllPageSlugs, getNavigation } from '@/lib/content';

const SITE_URL = 'https://meridiancodex.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const nav = getNavigation();
  const slugs = getAllPageSlugs();

  // Build slug → basePath map
  const slugMap: Record<string, string> = {};
  for (const tab of nav) {
    const basePath = tab.tab === 'Toolkit' ? '/toolkit' : '/codex';
    for (const group of tab.groups) {
      for (const slug of group.pages) {
        slugMap[slug] = basePath;
      }
    }
  }

  const pages: MetadataRoute.Sitemap = [
    // Static pages
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/codex`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/toolkit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Discipline landing pages
    {
      url: `${SITE_URL}/toolkit/foundation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/toolkit/knowledge`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/toolkit/bond`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic MDX pages
  for (const slug of slugs) {
    const basePath = slugMap[slug] || '/codex';
    pages.push({
      url: `${SITE_URL}${basePath}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: basePath === '/codex' ? 0.8 : 0.7,
    });
  }

  return pages;
}

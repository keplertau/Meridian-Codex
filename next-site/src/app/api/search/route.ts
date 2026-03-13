import { NextResponse } from 'next/server';
import { getAllPageSlugs, getPageBySlug, getNavigation } from '@/lib/content';

export interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  tab: string;
  group: string;
  href: string;
  excerpt: string; // first ~200 chars of MDX content (stripped of markup)
}

function stripMdx(content: string): string {
  return content
    .replace(/^---[\s\S]*?---/m, '') // frontmatter
    .replace(/<[^>]+>/g, '') // HTML/JSX tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
    .replace(/#{1,6}\s+/g, '') // headings
    .replace(/[*_~`]/g, '') // emphasis markers
    .replace(/\n{2,}/g, ' ') // collapse newlines
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}

export async function GET() {
  const nav = getNavigation();
  const slugs = getAllPageSlugs();
  const entries: SearchEntry[] = [];

  // Build a slug → { tab, group, href } map from navigation
  const slugMap: Record<string, { tab: string; group: string; href: string }> = {};

  for (const tab of nav) {
    for (const group of tab.groups) {
      const basePath = tab.tab === 'Toolkit' ? '/toolkit' : '/codex';
      for (const slug of group.pages) {
        slugMap[slug] = { tab: tab.tab, group: group.group, href: `${basePath}/${slug}` };
      }
    }
  }

  for (const slug of slugs) {
    const page = getPageBySlug(slug);
    if (!page) continue;

    const info = slugMap[slug] || { tab: 'Codex', group: '', href: `/codex/${slug}` };
    const plainText = stripMdx(page.content);

    entries.push({
      slug,
      title: page.title,
      description: page.description || '',
      tab: info.tab,
      group: info.group,
      href: info.href,
      excerpt: plainText.slice(0, 300),
    });
  }

  return NextResponse.json(entries);
}

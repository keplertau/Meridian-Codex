import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Path to existing Mintlify MDX content
const CONTENT_DIR = path.join(process.cwd(), '..', 'site', 'pages');

export interface PageMeta {
  slug: string;
  title: string;
  description?: string;
  mode?: string;
}

export interface PageContent extends PageMeta {
  content: string; // raw MDX string (without frontmatter)
  rawContent: string; // full file content
}

/**
 * Get all page slugs from the Mintlify pages directory
 */
// Pages that use Mintlify-only components (Card, Steps, Frame, Note)
// and are replaced by custom Next.js pages in the new site
const EXCLUDED_SLUGS = ['index'];

export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
    .filter((slug) => !EXCLUDED_SLUGS.includes(slug));
}

/**
 * Get frontmatter and content for a single page
 */
export function getPageBySlug(slug: string): PageContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    description: data.description || '',
    mode: data.mode,
    content,
    rawContent: raw,
  };
}

/**
 * Get metadata for all pages (for navigation, search, etc.)
 */
export function getAllPages(): PageMeta[] {
  return getAllPageSlugs().map((slug) => {
    const page = getPageBySlug(slug);
    return {
      slug,
      title: page?.title || slug,
      description: page?.description,
      mode: page?.mode,
    };
  });
}

/**
 * Navigation structure matching the Mintlify docs.json tabs/groups
 */
export interface NavGroup {
  group: string;
  pages: string[]; // slugs
}

export interface NavTab {
  tab: string;
  groups: NavGroup[];
}

/**
 * Toolkit tool definitions for the Toolkit Vault page
 * These represent the deep-dive pages in the Toolkit tab
 */
export interface ToolkitTool {
  slug: string;
  title: string;
  description: string;
  discipline: 'foundation' | 'knowledge' | 'bond';
  status: 'published' | 'coming-soon';
}

export function getToolkitTools(): ToolkitTool[] {
  const toolkitNav = getNavigation().find((t) => t.tab === 'Toolkit');
  if (!toolkitNav) return [];

  const disciplineMap: Record<string, 'foundation' | 'knowledge' | 'bond'> = {
    Foundation: 'foundation',
    Knowledge: 'knowledge',
    Bond: 'bond',
  };

  const tools: ToolkitTool[] = [];

  for (const group of toolkitNav.groups) {
    if (group.group === 'Overview') continue;

    const discipline = disciplineMap[group.group] || 'foundation';
    for (const slug of group.pages) {
      const page = getPageBySlug(slug);
      tools.push({
        slug,
        title: page?.title || slug.replace(/-/g, ' '),
        description: page?.description || '',
        discipline,
        status: 'published',
      });
    }
  }

  return tools;
}

/**
 * Full structured content map for the Explore page
 */
export interface ExploreSection {
  tab: string;
  description: string;
  groups: {
    group: string;
    pages: { slug: string; title: string; description: string }[];
  }[];
}

export function getExploreData(): ExploreSection[] {
  const nav = getNavigation();
  const tabDescriptions: Record<string, string> = {
    Codex: 'The core soul document. Philosophy, framework, and vision for humanity and AI.',
    Toolkit: 'Deep-dive reference pages for every tool in the Codex framework.',
    'AI Standard': 'Implementation commitments for artificial minds adopting the Codex.',
  };

  return nav.map((tab) => ({
    tab: tab.tab,
    description: tabDescriptions[tab.tab] || '',
    groups: tab.groups.map((group) => ({
      group: group.group,
      pages: group.pages.map((slug) => {
        const page = getPageBySlug(slug);
        return {
          slug,
          title: page?.title || slug.replace(/-/g, ' '),
          description: page?.description || '',
        };
      }),
    })),
  }));
}

export function getNavigation(): NavTab[] {
  return [
    {
      tab: 'Codex',
      groups: [
        { group: 'Start Here', pages: ['opening', 'who-is-this-for', 'the-problem'] },
        { group: 'The Framework', pages: ['the-proposition', 'the-foundation', 'the-knowledge', 'the-bond'] },
        { group: 'The Application', pages: ['the-practice', 'the-toolkit'] },
        { group: 'The Future', pages: ['the-vision', 'the-governance', 'the-closing', 'the-glossary', 'changelog'] },
      ],
    },
    {
      tab: 'Toolkit',
      groups: [
        { group: 'Overview', pages: ['overview'] },
        {
          group: 'Foundation',
          pages: ['scout-mindset', 'noticing', 'confirmation-bias'],
        },
      ],
    },
    {
      tab: 'AI Standard',
      groups: [
        { group: 'The Standard', pages: ['the-meridian-standard'] },
      ],
    },
  ];
}

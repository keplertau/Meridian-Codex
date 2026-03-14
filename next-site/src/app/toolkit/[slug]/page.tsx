import { notFound } from 'next/navigation';
import { getPageBySlug, getNavigation, getToolkitTools, getPageTitles } from '@/lib/content';
import DocReader from '@/components/DocReader';
import DisciplineLanding from '@/components/DisciplineLanding';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxHeadingComponents } from '@/lib/mdx-components';

// Toolkit deep-dive pages are the same MDX content pages,
// but routed under /toolkit/ instead of /codex/
const TOOLKIT_SLUGS = ['overview', 'scout-mindset', 'noticing', 'confirmation-bias'];

// Discipline section landing pages
const DISCIPLINE_SLUGS = ['foundation', 'knowledge', 'bond'];

interface Props {
  params: Promise<{ slug: string }>;
}

const DISCIPLINE_META: Record<string, { title: string; subtitle: string; description: string }> = {
  foundation: {
    title: 'The Foundation',
    subtitle: 'The discipline of honest inquiry',
    description: 'Tools that train you to notice your own distortions, resist manipulation, and engage disagreement without defensiveness.',
  },
  knowledge: {
    title: 'The Knowledge',
    subtitle: 'The map of the territory',
    description: 'Structural frameworks that reveal why cooperation fractures, why systems calcify or dissolve, and where leverage exists.',
  },
  bond: {
    title: 'The Bond',
    subtitle: 'The recognition of shared purpose',
    description: 'The tools and commitments that turn individual understanding into collective capability.',
  },
};

export async function generateStaticParams() {
  return [...TOOLKIT_SLUGS, ...DISCIPLINE_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  if (DISCIPLINE_SLUGS.includes(slug)) {
    const meta = DISCIPLINE_META[slug];
    return {
      title: `${meta.title} — Toolkit`,
      description: meta.description,
    };
  }

  const page = getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: `${page.title} — Toolkit`,
    description: page.description,
  };
}

export default async function ToolkitPage({ params }: Props) {
  const { slug } = await params;

  // Discipline landing pages
  if (DISCIPLINE_SLUGS.includes(slug)) {
    const meta = DISCIPLINE_META[slug];
    const tools = getToolkitTools().filter((t) => t.discipline === slug);
    return (
      <DisciplineLanding
        discipline={slug as 'foundation' | 'knowledge' | 'bond'}
        title={meta.title}
        subtitle={meta.subtitle}
        description={meta.description}
        tools={tools}
      />
    );
  }

  // Deep-dive MDX pages
  if (!TOOLKIT_SLUGS.includes(slug)) notFound();

  const page = getPageBySlug(slug);
  if (!page) notFound();

  const nav = getNavigation();
  const pageTitles = getPageTitles();

  return (
    <DocReader page={page} navigation={nav} basePath="/toolkit" pageTitles={pageTitles}>
      <MDXRemote source={page.content} components={mdxHeadingComponents} />
    </DocReader>
  );
}

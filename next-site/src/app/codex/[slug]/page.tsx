import { notFound } from 'next/navigation';
import { getPageBySlug, getAllPageSlugs, getNavigation, getPageTitles } from '@/lib/content';
import DocReader from '@/components/DocReader';
import EvolutionLog from '@/components/EvolutionLog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  // Special case: changelog uses the custom EvolutionLog view
  if (slug === 'changelog') {
    return {
      title: 'Evolution Log',
      description: 'The historical record of the Meridian Codex, tracking the evolution of the intellectual framework.',
    };
  }

  const page = getPageBySlug(slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function CodexPage({ params }: Props) {
  const { slug } = await params;

  // Changelog gets the custom Evolution Log timeline instead of MDX reader
  if (slug === 'changelog') {
    return <EvolutionLog />;
  }

  const page = getPageBySlug(slug);
  if (!page) notFound();

  const nav = getNavigation();
  const pageTitles = getPageTitles();

  return <DocReader page={page} navigation={nav} pageTitles={pageTitles} />;
}

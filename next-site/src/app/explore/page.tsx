import { getExploreData } from '@/lib/content';
import ExploreView from '@/components/ExploreView';

export const metadata = {
  title: 'Explore — The Meridian Codex',
  description: 'Navigate the entire Meridian Codex. Every page, every tool, every section at a glance.',
};

export default function ExplorePage() {
  const sections = getExploreData();
  return <ExploreView sections={sections} />;
}

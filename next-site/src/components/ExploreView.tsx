'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import {
  Compass,
  BookOpen,
  Layers,
  ShieldAlert,
  ChevronRight,
  Eye,
  Network,
  Share2,
  Lightbulb,
  History,
  Scale,
  Globe,
  Scroll,
  Users,
  Target,
  Orbit,
  FileText,
} from 'lucide-react';
import ApertureIcon from './ApertureIcon';
import type { ExploreSection } from '@/lib/content';

// Map slugs to icons for visual variety
const PAGE_ICONS: Record<string, typeof BookOpen> = {
  opening: BookOpen,
  'who-is-this-for': Users,
  'the-problem': Target,
  'the-proposition': Lightbulb,
  'the-foundation': Eye,
  'the-knowledge': Network,
  'the-bond': Share2,
  'the-practice': Orbit,
  'the-toolkit': Layers,
  'the-vision': Globe,
  'the-governance': Scale,
  'the-closing': Scroll,
  'the-glossary': FileText,
  changelog: History,
  overview: Compass,
  'scout-mindset': Eye,
  noticing: Eye,
  'confirmation-bias': Eye,
  'the-meridian-standard': ShieldAlert,
};

const TAB_ICONS: Record<string, typeof BookOpen> = {
  Codex: BookOpen,
  Toolkit: Layers,
  'AI Standard': ShieldAlert,
};

// Route mapping: which tab goes to which base path
const TAB_ROUTES: Record<string, string> = {
  Codex: '/codex',
  Toolkit: '/toolkit',
  'AI Standard': '/codex',
};

interface ExploreViewProps {
  sections: ExploreSection[];
}

export default function ExploreView({ sections }: ExploreViewProps) {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';

  return (
    <div className="max-w-[1400px] mx-auto pb-10 w-full space-y-10">
      {/* Hero */}
      <div className={`rounded-2xl relative overflow-hidden ${panelStyle}`}>
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
            isDark ? 'bg-cyan/10' : 'bg-meridian/15'
          }`}
        />
        <div className="p-8 md:p-12 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Full Index
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-3 tracking-tight ${
              isDark ? 'text-text-bright' : 'text-ink'
            }`}
          >
            Explore the Codex
          </h2>
          <p
            className={`text-[13px] font-mono max-w-3xl leading-relaxed ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            Every page in the Meridian Codex at a glance. The soul document, the toolkit, and the
            AI Standard, organized by section.
          </p>
        </div>
      </div>

      {/* Section Blocks */}
      {sections.map((section) => {
        const TabIcon = TAB_ICONS[section.tab] || BookOpen;
        const basePath = TAB_ROUTES[section.tab] || '/codex';

        return (
          <section key={section.tab} className="space-y-6">
            {/* Tab Header */}
            <div
              className={`flex items-center gap-4 px-2 pb-4 border-b ${
                isDark ? 'border-white/10' : 'border-border-light'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-cyan'
                    : 'bg-[#E8F8EE]/60 border-meridian/30 text-meridian-dark'
                }`}
              >
                <TabIcon className="w-5 h-5" />
              </div>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    isDark ? 'text-text-bright' : 'text-ink'
                  }`}
                >
                  {section.tab}
                </h3>
                <p
                  className={`text-[12px] ${
                    isDark ? 'text-text-muted' : 'text-text-subtle'
                  }`}
                >
                  {section.description}
                </p>
              </div>
            </div>

            {/* Groups within Tab */}
            {section.groups.map((group) => (
              <div key={group.group} className="space-y-3">
                <h4
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2 ${
                    isDark ? 'text-text-muted' : 'text-text-muted'
                  }`}
                >
                  {group.group}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.pages.map((page) => {
                    const PageIcon = PAGE_ICONS[page.slug] || BookOpen;
                    return (
                      <Link
                        key={page.slug}
                        href={`${basePath}/${page.slug}`}
                        className={`p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group flex items-start gap-4 ${panelStyle}`}
                      >
                        <PageIcon
                          className={`w-4.5 h-4.5 mt-0.5 shrink-0 ${
                            isDark ? 'text-cyan/60' : 'text-meridian/60'
                          }`}
                        />
                        <div className="min-w-0">
                          <h5
                            className={`text-[14px] font-bold mb-1 transition-colors ${
                              isDark
                                ? 'text-text-bright group-hover:text-cyan'
                                : 'text-ink group-hover:text-meridian'
                            }`}
                          >
                            {page.title}
                          </h5>
                          {page.description && (
                            <p
                              className={`text-[11px] leading-relaxed line-clamp-2 ${
                                isDark ? 'text-text-muted' : 'text-text-subtle'
                              }`}
                            >
                              {page.description}
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDark ? 'text-cyan' : 'text-meridian'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {/* Bottom */}
      <div className="flex items-center justify-center pt-8">
        <ApertureIcon className="w-8 h-8 text-text-muted" />
      </div>
    </div>
  );
}

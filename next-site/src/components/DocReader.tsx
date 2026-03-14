'use client';

import { useTheme } from '@/lib/theme';
import Link from 'next/link';
import { BookOpen, ChevronRight, ChevronDown, Menu, X, ArrowRight, FolderTree, List } from 'lucide-react';
import { useState, useEffect } from 'react';
import ApertureIcon from './ApertureIcon';
import type { PageContent, NavTab, NavGroup } from '@/lib/content';

/** Fallback: convert a slug like "the-foundation" to "The Foundation" */
function titleCase(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Extract headings (h2, h3) from raw MDX content for table of contents */
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[2].replace(/[*_`]/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

// ─── SidebarGroup — collapsible nav group matching dashboard TreeItem ───
function SidebarGroup({
  group,
  basePath,
  activeSlug,
  onNavigate,
  pageTitles,
}: {
  group: NavGroup;
  basePath: string;
  activeSlug: string;
  onNavigate: () => void;
  pageTitles: Record<string, string>;
}) {
  const { isDark } = useTheme();
  const accent = isDark ? 'text-cyan' : 'text-meridian';
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] font-bold tracking-wider uppercase transition-all ${
          isDark
            ? 'text-text-bright hover:bg-white/5'
            : 'text-ink hover:bg-white/40'
        }`}
      >
        <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${expanded ? '' : '-rotate-90'} ${isDark ? 'text-white/30' : 'text-black/20'}`} />
        <FolderTree className={`w-3.5 h-3.5 shrink-0 ${accent}`} />
        {group.group}
      </button>
      {expanded && (
        <div className="mt-0.5">
          {group.pages.map((slug) => {
            const isActive = activeSlug === slug;
            return (
              <Link
                key={slug}
                href={`${basePath}/${slug}`}
                onClick={onNavigate}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all group ${
                  isActive
                    ? isDark
                      ? 'bg-cyan/10 text-cyan font-bold'
                      : 'bg-[#E8F8EE] text-meridian-dark font-bold'
                    : isDark
                    ? 'text-text-muted hover:text-cyan hover:bg-white/5'
                    : 'text-text-subtle hover:text-meridian hover:bg-white/40'
                }`}
                style={{ paddingLeft: '28px' }}
              >
                <ArrowRight className={`w-3 h-3 shrink-0 ${
                  isActive
                    ? accent
                    : isDark ? 'text-white/20 group-hover:text-cyan' : 'text-black/15 group-hover:text-meridian'
                }`} />
                {pageTitles[slug] || titleCase(slug)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface DocReaderProps {
  page: PageContent;
  navigation: NavTab[];
  basePath?: string; // '/codex' or '/toolkit'
  pageTitles?: Record<string, string>;
  children: React.ReactNode; // Pre-rendered MDX content from server component
}

export default function DocReader({ page, navigation, basePath = '/codex', pageTitles = {}, children }: DocReaderProps) {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  // Find which tab this page belongs to
  const currentTab = navigation.find((tab) =>
    tab.groups.some((group) => group.pages.includes(page.slug))
  );

  // Extract headings from MDX content for TOC
  const headings = extractHeadings(page.content);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [page.slug]);

  return (
    <div className="max-w-[1700px] mx-auto flex items-start gap-8 pb-10 w-full relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar: Navigation */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:block shrink-0 lg:sticky lg:top-[84px] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className={`h-full lg:h-auto lg:max-h-[calc(100vh-100px)] overflow-y-auto p-4 lg:p-0 ${
            isDark ? 'bg-dark-surface lg:bg-transparent' : 'bg-warm-paper lg:bg-transparent'
          }`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden absolute top-6 right-6 p-2 rounded-full ${
              isDark ? 'bg-white/10 text-white' : 'bg-white/60 text-ink'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div
            className={`rounded-2xl p-5 border ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <BookOpen className={`w-4 h-4 ${isDark ? 'text-cyan/80' : 'text-meridian'}`} />
              <h3
                className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                  isDark ? 'text-text-bright' : 'text-ink'
                }`}
              >
                {currentTab?.tab || 'Codex'} Index
              </h3>
            </div>

            <div className="space-y-1">
              {(currentTab || navigation[0]).groups.map((group) => (
                <SidebarGroup key={group.group} group={group} basePath={basePath} activeSlug={page.slug} onNavigate={() => setSidebarOpen(false)} pageTitles={pageTitles} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Main Content */}
      <div
        className={`flex-1 min-w-0 rounded-2xl p-6 md:p-8 lg:p-14 w-full max-w-full overflow-hidden ${
          isDark ? 'glass-reading-dark' : 'glass-reading-light'
        }`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumbs */}
          <div
            className={`flex items-center gap-2.5 text-[10px] font-bold tracking-[0.2em] uppercase flex-wrap mb-8 ${
              isDark ? 'text-cyan' : 'text-meridian'
            }`}
          >
            <button
              className="lg:hidden p-1.5 rounded bg-black/20 hover:bg-black/40 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
            <Link href={basePath} className="hover:opacity-80">{basePath === '/toolkit' ? 'Toolkit' : 'Codex'}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {currentTab && currentTab.tab !== 'Codex' && currentTab.tab !== 'Toolkit' && (
              <>
                <span>{currentTab.tab}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className={isDark ? 'text-text-muted' : 'text-text-muted'}>{page.title}</span>
          </div>

          {/* Page Title */}
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 ${
              isDark ? 'text-text-bright' : 'text-ink'
            }`}
          >
            {page.title}
          </h1>

          {page.description && (
            <p className={`text-lg font-medium leading-relaxed mb-10 ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
              {page.description}
            </p>
          )}

          <hr className={`mb-10 border-t ${isDark ? 'border-white/10' : 'border-border-light'}`} />

          {/* MDX Content */}
          <div className={`mdx-content ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
            {children}
          </div>

          {/* Bottom decoration */}
          <div className="mt-16 flex items-center justify-center pt-8 border-t border-dashed border-white/10">
            <ApertureIcon className="w-10 h-10 text-text-muted" />
          </div>
        </div>
      </div>

      {/* Right Panel: Table of Contents (hidden below xl) */}
      {headings.length > 0 && (
        <div className="hidden xl:block w-56 shrink-0 sticky top-[84px]">
          <div className={`rounded-2xl p-5 border ${isDark ? 'glass-panel-dark' : 'glass-panel-light'}`}>
            <div className="flex items-center gap-2.5 mb-4">
              <List className={`w-4 h-4 ${isDark ? 'text-cyan/80' : 'text-meridian'}`} />
              <h3
                className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                  isDark ? 'text-text-bright' : 'text-ink'
                }`}
              >
                On This Page
              </h3>
            </div>
            <nav className="space-y-0.5">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={`block text-[13px] leading-snug py-1.5 transition-all ${
                    h.level === 3 ? 'pl-4' : 'pl-0'
                  } ${
                    activeHeading === h.id
                      ? isDark
                        ? 'text-cyan font-bold'
                        : 'text-meridian-dark font-bold'
                      : isDark
                      ? 'text-text-muted hover:text-cyan'
                      : 'text-text-subtle hover:text-meridian'
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

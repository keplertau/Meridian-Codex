'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { X, Search, Sparkles, BookOpen, Layers, ShieldAlert, ArrowRight } from 'lucide-react';

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  tab: string;
  group: string;
  href: string;
  excerpt?: string;
}

const TAB_ICONS: Record<string, typeof BookOpen> = {
  Codex: BookOpen,
  Toolkit: Layers,
  'AI Standard': ShieldAlert,
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch search index on first open
  useEffect(() => {
    if (isOpen && !loaded) {
      fetch('/api/search')
        .then((r) => r.json())
        .then((data: SearchItem[]) => {
          setIndex(data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [isOpen, loaded]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Filter results — searches title, description, tab, group, slug, and excerpt content
  const results = useMemo(() => {
    if (!query.trim()) return index;
    const q = query.toLowerCase();
    return index.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tab.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(q))
    );
  }, [query, index]);

  // Group results by tab
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of results) {
      if (!groups[item.tab]) groups[item.tab] = [];
      groups[item.tab].push(item);
    }
    return groups;
  }, [results]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${
          isDark ? 'bg-dark-deep/80 backdrop-blur-md' : 'bg-warm-paper/80 backdrop-blur-md'
        }`}
        onClick={onClose}
      />

      {/* Search Panel */}
      <div
        className={`relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden shadow-2xl border ${
          isDark
            ? 'bg-dark-surface/95 border-white/15 shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.12)]'
        }`}
      >
        {/* Input area */}
        <div
          className={`flex items-center gap-3 px-5 py-4 border-b ${
            isDark ? 'border-white/10' : 'border-border-light'
          }`}
        >
          <Sparkles className={`w-5 h-5 shrink-0 ${isDark ? 'text-cyan' : 'text-meridian'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the Codex..."
            className={`flex-1 bg-transparent border-none outline-none text-[15px] font-medium placeholder:font-mono ${
              isDark
                ? 'text-text-bright placeholder:text-text-muted'
                : 'text-ink placeholder:text-text-muted'
            }`}
          />
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-white/10 text-text-muted' : 'hover:bg-black/5 text-text-subtle'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-3">
          {!loaded ? (
            <div className="py-12 text-center">
              <p className={`text-[13px] font-mono ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
                Loading index...
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <Search
                className={`w-8 h-8 mx-auto mb-3 ${
                  isDark ? 'text-text-muted' : 'text-text-subtle'
                }`}
              />
              <p
                className={`text-[13px] font-medium ${
                  isDark ? 'text-text-muted' : 'text-text-subtle'
                }`}
              >
                No results found for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            Object.entries(groupedResults).map(([tab, items]) => {
              const TabIcon = TAB_ICONS[tab] || BookOpen;
              return (
                <div key={tab} className="mb-4 last:mb-0">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase ${
                      isDark ? 'text-text-muted' : 'text-text-muted'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    {tab}
                  </div>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between gap-4 px-4 py-3 rounded-xl transition-all group ${
                          isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-black/3'
                        }`}
                      >
                        <div className="min-w-0">
                          <div
                            className={`text-[14px] font-bold transition-colors ${
                              isDark
                                ? 'text-text-bright group-hover:text-cyan'
                                : 'text-ink group-hover:text-meridian'
                            }`}
                          >
                            {item.title}
                          </div>
                          <div
                            className={`text-[11px] truncate ${
                              isDark ? 'text-text-muted' : 'text-text-subtle'
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                        <ArrowRight
                          className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isDark ? 'text-cyan' : 'text-meridian'
                          }`}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between text-[10px] font-mono tracking-widest uppercase ${
            isDark ? 'border-white/10 text-text-muted' : 'border-border-light text-text-muted'
          }`}
        >
          <span>{results.length} pages</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun, Moon, Search, Menu, X, ChevronRight, Sparkles, ChevronDown,
  Eye, Network, Share2, BookOpen, Wrench, Scale, History, FileText,
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import ApertureIcon from './ApertureIcon';
import SearchOverlay from './SearchOverlay';

// ─── Navigation structure ───
const CODEX_SECTIONS = [
  {
    group: 'Start Here',
    items: [
      { label: 'The Opening', href: '/codex/opening', icon: BookOpen },
      { label: 'Who Is This For', href: '/codex/who-is-this-for', icon: FileText },
      { label: 'The Problem', href: '/codex/the-problem', icon: FileText },
    ],
  },
  {
    group: 'The Framework',
    items: [
      { label: 'The Proposition', href: '/codex/the-proposition', icon: FileText },
      { label: 'The Foundation', href: '/codex/the-foundation', icon: Eye },
      { label: 'The Knowledge', href: '/codex/the-knowledge', icon: Network },
      { label: 'The Bond', href: '/codex/the-bond', icon: Share2 },
    ],
  },
  {
    group: 'The Application',
    items: [
      { label: 'The Practice', href: '/codex/the-practice', icon: Wrench },
      { label: 'The Toolkit', href: '/codex/the-toolkit', icon: Wrench },
    ],
  },
  {
    group: 'More',
    items: [
      { label: 'The Vision', href: '/codex/the-vision', icon: FileText },
      { label: 'The Governance', href: '/codex/the-governance', icon: Scale },
      { label: 'The Closing', href: '/codex/the-closing', icon: FileText },
      { label: 'The Glossary', href: '/codex/the-glossary', icon: BookOpen },
      { label: 'Evolution Log', href: '/codex/changelog', icon: History },
    ],
  },
];

const TOOLKIT_SECTIONS = [
  {
    group: 'By Discipline',
    items: [
      { label: 'Foundation Tools', href: '/toolkit/foundation', icon: Eye, desc: 'Scout Mindset, Noticing, Confirmation Bias' },
      { label: 'Knowledge Tools', href: '/toolkit/knowledge', icon: Network, desc: 'Game Theory, Systems Dynamics, Causal Inference' },
      { label: 'Bond Tools', href: '/toolkit/bond', icon: Share2, desc: 'Reciprocity, Trust Dynamics, Coordination' },
    ],
  },
];

const NAV_ITEMS = [
  { label: 'Home', href: '/', dropdown: null },
  { label: 'Codex', href: '/codex', dropdown: 'codex' as const },
  { label: 'Toolkit', href: '/toolkit', dropdown: 'toolkit' as const },
  { label: 'AI Standard', href: '/codex/the-meridian-standard', dropdown: null },
];

// ─── Dropdown component ───
function NavDropdown({
  type,
  isOpen,
  onClose,
}: {
  type: 'codex' | 'toolkit';
  isOpen: boolean;
  onClose: () => void;
}) {
  const { isDark } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const accent = isDark ? 'text-cyan' : 'text-meridian';
  const sections = type === 'codex' ? CODEX_SECTIONS : TOOLKIT_SECTIONS;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 rounded-2xl border shadow-2xl overflow-hidden z-[60] ${
        type === 'codex' ? 'left-0 w-[540px]' : 'left-0 w-[380px]'
      } ${
        isDark
          ? 'bg-[#0B111D]/95 backdrop-blur-2xl border-white/10'
          : 'bg-white/95 backdrop-blur-2xl border-border-light'
      }`}
    >
      <div className={`p-5 ${type === 'codex' ? 'grid grid-cols-2 gap-x-6 gap-y-4' : 'space-y-4'}`}>
        {sections.map((section) => (
          <div key={section.group}>
            <div className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5 px-1 ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
              {section.group}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all group ${
                    isDark
                      ? 'hover:bg-white/5 text-text-dark hover:text-cyan'
                      : 'hover:bg-white/60 text-text-light hover:text-meridian'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-white/20 group-hover:text-cyan' : 'text-black/15 group-hover:text-meridian'}`} />
                  <div>
                    <span className="text-[13px] font-semibold">{item.label}</span>
                    {'desc' in item && (item as { desc?: string }).desc && (
                      <p className={`text-[11px] mt-0.5 ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>{(item as { desc?: string }).desc}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Footer link */}
      <div className={`px-5 py-3 border-t ${isDark ? 'border-white/5' : 'border-border-light'}`}>
        <Link
          href={type === 'codex' ? '/codex' : '/toolkit'}
          onClick={onClose}
          className={`flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-all ${accent}`}
        >
          {type === 'codex' ? 'Command Center' : 'Browse All Tools'} <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'codex' | 'toolkit' | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/codex/the-meridian-standard') {
      return pathname === '/codex/the-meridian-standard';
    }
    if (href === '/codex') {
      return pathname.startsWith('/codex') && pathname !== '/codex/the-meridian-standard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`h-16 mt-3 mx-4 rounded-2xl flex items-center justify-between px-5 shrink-0 z-50 sticky top-3 transition-all duration-500 ${
          isDark
            ? 'bg-[#0B111D]/50 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/50 backdrop-blur-2xl border border-white/60 shadow-lg'
        }`}
      >
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <ApertureIcon
              className={`w-7 h-7 transition-transform duration-700 ease-out group-hover:rotate-180 ${
                isDark
                  ? 'text-cyan drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                  : 'text-meridian drop-shadow-[0_0_8px_rgba(62,207,107,0.3)]'
              }`}
            />
            <span
              className={`font-extrabold text-sm tracking-[0.2em] uppercase transition-colors ${
                isDark ? 'text-text-bright group-hover:text-cyan' : 'text-ink group-hover:text-meridian'
              }`}
            >
              Meridian
            </span>
          </Link>

          <div className={`h-6 w-px ${isDark ? 'bg-white/10' : 'bg-border-light'}`} />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.dropdown ? null : item.dropdown)}
                    onMouseEnter={() => setOpenDropdown(item.dropdown)}
                    className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1 ${
                      isActive(item.href)
                        ? isDark
                          ? 'bg-cyan/20 text-cyan shadow-sm'
                          : 'bg-meridian/10 text-ink shadow-sm'
                        : isDark
                        ? 'text-text-muted hover:text-text-bright hover:bg-white/10'
                        : 'text-text-muted hover:text-ink hover:bg-white/40'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.dropdown ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                      isActive(item.href)
                        ? isDark
                          ? 'bg-cyan/20 text-cyan shadow-sm'
                          : 'bg-meridian/10 text-ink shadow-sm'
                        : isDark
                        ? 'text-text-muted hover:text-text-bright hover:bg-white/10'
                        : 'text-text-muted hover:text-ink hover:bg-white/40'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <div onMouseLeave={() => setOpenDropdown(null)}>
                    <NavDropdown
                      type={item.dropdown}
                      isOpen={openDropdown === item.dropdown}
                      onClose={() => setOpenDropdown(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Center: Search trigger (desktop) */}
        <div
          className="flex-1 max-w-xl mx-8 relative hidden lg:block group cursor-pointer"
          onClick={() => setSearchOpen(true)}
        >
          <div
            className={`relative flex items-center w-full border rounded-lg overflow-hidden transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#0D1421]/80 border-white/20 shadow-inner'
                : 'bg-white/60 border-white/60 shadow-sm'
            }`}
          >
            <div className={`pl-3 pr-2 py-2 flex items-center border-r ${isDark ? 'border-white/10' : 'border-border-light'}`}>
              <Sparkles className={`w-4 h-4 ${isDark ? 'text-cyan' : 'text-meridian'}`} />
            </div>
            <div className={`w-full bg-transparent border-none text-[13px] px-3 py-2 font-mono ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
              Search the Codex...
            </div>
            <div className="pr-2 flex items-center gap-1">
              <span
                className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded border ${
                  isDark ? 'text-text-muted border-white/10 bg-white/5' : 'text-text-muted border-border-light bg-white/50'
                }`}
              >
                INTENT
              </span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-text-dark hover:text-white hover:bg-white/10' : 'text-text-subtle hover:text-ink hover:bg-white/40'
            }`}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-text-dark hover:text-white hover:bg-white/10' : 'text-text-subtle hover:text-ink hover:bg-white/40'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-text-dark hover:text-white hover:bg-white/10' : 'text-text-subtle hover:text-ink hover:bg-white/40'
            }`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div
          className={`absolute top-24 left-4 right-4 z-50 rounded-2xl border p-4 shadow-2xl md:hidden max-h-[70vh] overflow-y-auto ${
            isDark ? 'glass-panel-dark' : 'glass-panel-light'
          }`}
        >
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    isActive(item.href)
                      ? isDark
                        ? 'bg-cyan/20 text-cyan border border-cyan/30'
                        : 'bg-[#E8F8EE] text-meridian-dark border border-meridian/30'
                      : isDark
                      ? 'text-text-muted hover:text-text-dark hover:bg-white/10 border border-transparent'
                      : 'text-text-subtle hover:text-ink hover:bg-white/40 border border-transparent'
                  }`}
                >
                  {item.label}
                  <ChevronRight className="w-3 h-3 opacity-50" />
                </Link>
                {/* Mobile sub-nav for Codex */}
                {item.dropdown === 'codex' && (
                  <div className="pl-4 mt-1 mb-2 space-y-0.5">
                    {CODEX_SECTIONS.flatMap((s) => s.items).slice(0, 6).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${
                          isDark ? 'text-text-muted hover:text-cyan hover:bg-white/5' : 'text-text-subtle hover:text-meridian hover:bg-white/40'
                        }`}
                      >
                        <sub.icon className="w-3 h-3 shrink-0 opacity-40" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
                {/* Mobile sub-nav for Toolkit */}
                {item.dropdown === 'toolkit' && (
                  <div className="pl-4 mt-1 mb-2 space-y-0.5">
                    {TOOLKIT_SECTIONS.flatMap((s) => s.items).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${
                          isDark ? 'text-text-muted hover:text-cyan hover:bg-white/5' : 'text-text-subtle hover:text-meridian hover:bg-white/40'
                        }`}
                      >
                        <sub.icon className="w-3 h-3 shrink-0 opacity-40" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Search overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

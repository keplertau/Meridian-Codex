'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import {
  BookOpen,
  ArrowRight,
  BrainCircuit,
  Share2,
  Eye,
  Network,
  Activity,
  History,
  Globe,
  Rocket,
  ShieldCheck,
  PenTool,
  Wrench,
  Clock,
  Milestone,
  FolderTree,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import ApertureIcon from '@/components/ApertureIcon';

// ─── Chapter navigation data ───
const CHAPTERS = [
  { group: 'Start Here', items: [
    { slug: 'opening', label: 'The Opening' },
    { slug: 'who-is-this-for', label: 'Who Is This For' },
    { slug: 'the-problem', label: 'The Problem' },
  ]},
  { group: 'The Framework', items: [
    { slug: 'the-proposition', label: 'The Proposition' },
    { slug: 'the-foundation', label: 'The Foundation' },
    { slug: 'the-knowledge', label: 'The Knowledge' },
    { slug: 'the-bond', label: 'The Bond' },
  ]},
  { group: 'The Application', items: [
    { slug: 'the-practice', label: 'The Practice' },
    { slug: 'the-toolkit', label: 'The Toolkit' },
  ]},
  { group: 'The Future', items: [
    { slug: 'the-vision', label: 'The Vision' },
    { slug: 'the-governance', label: 'The Governance' },
    { slug: 'the-closing', label: 'The Closing' },
    { slug: 'the-glossary', label: 'The Glossary' },
  ]},
];

// ─── Activity Stream data (milestone placeholders) ───
interface FeedItem {
  id: string;
  source: string;
  sourceColor: string;
  icon: typeof Rocket;
  time: string;
  content: string;
  author: string;
  href?: string;
  featured?: boolean;
}

const FEED_DATA: FeedItem[] = [
  {
    id: '1',
    source: 'AI STANDARD',
    sourceColor: 'earth',
    icon: ShieldCheck,
    time: '12m ago',
    content: 'Diagnostic Framework updated. The Reciprocity Diagnostic (Section 07) has been revised to better evaluate institutional sycophancy gaps.',
    author: 'C. Geiser',
    href: '/codex/the-meridian-standard',
    featured: true,
  },
  {
    id: '2',
    source: 'MILESTONE',
    sourceColor: 'cyan',
    icon: Rocket,
    time: 'Mar 1, 2026',
    content: 'Soul Document v5 released. Complete voice pass across all chapters. Personal foreword from the Founding Caretaker. Banned AI-filler words removed.',
    author: 'Founding Caretaker',
    href: '/codex/opening',
    featured: true,
  },
  {
    id: '3',
    source: 'SITE UPDATE',
    sourceColor: 'meridian',
    icon: Globe,
    time: 'Mar 8, 2026',
    content: 'meridiancodex.com migration to custom Next.js site begins. Glassmorphism design system. Dual-mode themes. Full MDX pipeline.',
    author: 'Founding Caretaker',
    href: '/codex/changelog',
  },
  {
    id: '4',
    source: 'TOOLKIT',
    sourceColor: 'meridian',
    icon: Wrench,
    time: 'Feb 15, 2026',
    content: 'First three Toolkit deep-dives published: Scout Mindset, Noticing, and Confirmation Bias. Six-element structure established.',
    author: 'Founding Caretaker',
    href: '/toolkit',
  },
  {
    id: '5',
    source: 'BLOG',
    sourceColor: 'sky',
    icon: PenTool,
    time: 'Ongoing',
    content: 'Long-form thought pieces on AI, the shifting nature of work, agency, governance, and the discipline of honest inquiry. Frankfurt-born, Canada-raised, Asia-shaped, Munich-based.',
    author: 'C. Geiser',
    href: 'https://carstengeiser.com',
  },
];

// ─── Evolution Log compact data ───
const EVOLUTION_LOG_COMPACT = [
  { version: 'v5.0', date: 'March 12, 2026', title: 'The Soul Document Update', tags: ['Codex'] },
  { version: 'v4.2', date: 'February 28, 2026', title: 'Reciprocity Diagnostic Added', tags: ['AI Standard'] },
  { version: 'v4.0', date: 'January 15, 2026', title: 'The Toolkit Vault Initialization', tags: ['Toolkit'] },
  { version: 'v3.0', date: 'November 10, 2025', title: 'The AI Standard Genesis', tags: ['AI Standard'] },
  { version: 'v1.0', date: 'June 1, 2025', title: 'Foundation Established', tags: ['Codex'] },
];

// ─── WidgetPanel — reusable wrapper ───
function WidgetPanel({
  title,
  icon: Icon,
  headerAction,
  footerAction,
  children,
  className = '',
  noScroll = false,
}: {
  title: string;
  icon: typeof Activity;
  headerAction?: React.ReactNode;
  footerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noScroll?: boolean;
}) {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';
  const accent = isDark ? 'text-cyan' : 'text-meridian';

  return (
    <div className={`rounded-2xl overflow-hidden flex flex-col ${panelStyle} ${className}`}>
      <div className={`p-5 pb-3 flex items-center justify-between shrink-0 border-b ${isDark ? 'border-white/10' : 'border-border-light'}`}>
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${accent}`} />
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-text-bright' : 'text-ink'}`}>
            {title}
          </span>
        </div>
        {headerAction}
      </div>
      <div className={`flex-1 ${noScroll ? '' : 'overflow-y-auto'} px-5 pb-4 pt-3`}>
        {children}
      </div>
      {footerAction && (
        <div className={`px-5 py-3 border-t shrink-0 ${isDark ? 'border-white/5' : 'border-border-light'}`}>
          {footerAction}
        </div>
      )}
    </div>
  );
}

// ─── FeedRow — activity stream item ───
function FeedRow({ item }: { item: FeedItem }) {
  const { isDark } = useTheme();
  const Icon = item.icon;

  const sourceColorMap: Record<string, string> = {
    cyan: isDark ? 'bg-cyan/15 text-cyan border-cyan/30' : 'bg-sky/30 text-meridian-dark border-meridian/20',
    meridian: isDark ? 'bg-meridian/15 text-meridian border-meridian/30' : 'bg-[#E8F8EE] text-meridian-dark border-meridian/20',
    earth: isDark ? 'bg-earth/15 text-earth border-earth/30' : 'bg-earth/10 text-earth border-earth/20',
    sky: isDark ? 'bg-sky/15 text-sky border-sky/30' : 'bg-sky/20 text-sky border-sky/20',
  };

  const isExternal = item.href?.startsWith('http');

  const cardClassName = `block p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 border ${
    item.featured
      ? isDark
        ? 'bg-cyan/5 border-cyan/20 hover:border-cyan/40'
        : 'bg-[#E8F8EE]/40 border-meridian/15 hover:border-meridian/30'
      : isDark
      ? 'bg-white/[0.02] border-white/5 hover:border-white/15'
      : 'bg-white/30 border-white/40 hover:border-border-light'
  }`;

  const cardContent = (
    <div className="flex items-start gap-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${sourceColorMap[item.sourceColor] || sourceColorMap.cyan}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${sourceColorMap[item.sourceColor] || sourceColorMap.cyan}`}>
            {item.source}
          </span>
          <span className={`text-[10px] font-mono flex items-center gap-1 ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
            <Clock className="w-3 h-3" /> {item.time}
          </span>
        </div>
        <p className={`text-[14px] leading-relaxed mb-2 ${isDark ? 'text-text-dark' : 'text-text-subtle'}`}>
          {item.content}
        </p>
        <span className={`text-[11px] font-semibold ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
          {item.author}
        </span>
      </div>
    </div>
  );

  if (item.href) {
    if (isExternal) {
      return (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
          {cardContent}
        </a>
      );
    }
    return (
      <Link href={item.href} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClassName}>{cardContent}</div>;
}

// ─── TreeItem — file-explorer nav item ───
function TreeItem({
  label,
  href,
  depth = 0,
  items,
}: {
  label: string;
  href?: string;
  depth?: number;
  items?: { slug: string; label: string }[];
}) {
  const { isDark } = useTheme();
  const [expanded, setExpanded] = useState(true);
  const accent = isDark ? 'text-cyan' : 'text-meridian';

  if (items) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] font-bold tracking-wider uppercase transition-all ${
            isDark
              ? 'text-text-bright hover:bg-white/5'
              : 'text-ink hover:bg-white/40'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${expanded ? '' : '-rotate-90'} ${isDark ? 'text-white/30' : 'text-black/20'}`} />
          <FolderTree className={`w-3.5 h-3.5 shrink-0 ${accent}`} />
          {label}
        </button>
        {expanded && (
          <div className="mt-0.5">
            {items.map((item) => (
              <TreeItem
                key={item.slug}
                label={item.label}
                href={`/codex/${item.slug}`}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={href || '#'}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all group ${
        isDark
          ? 'text-text-muted hover:text-cyan hover:bg-white/5'
          : 'text-text-subtle hover:text-meridian hover:bg-white/40'
      }`}
      style={{ paddingLeft: `${depth * 16 + 12}px` }}
    >
      <ArrowRight className={`w-3 h-3 shrink-0 ${isDark ? 'text-white/20 group-hover:text-cyan' : 'text-black/15 group-hover:text-meridian'}`} />
      {label}
    </Link>
  );
}

// ═════════════════════════════════════════════════
// Main Dashboard
// ═════════════════════════════════════════════════
export default function CodexDashboard() {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';
  const accent = isDark ? 'text-cyan' : 'text-meridian';

  return (
    <div className="grid grid-cols-12 gap-5 auto-rows-[minmax(140px,auto)] max-w-[1900px] mx-auto pb-10 w-full">

      {/* ═══ ROW 1-2: HERO + TOPOLOGY ═══ */}

      {/* HERO WIDGET — 8 cols, 2 rows */}
      <div className="col-span-12 lg:col-span-8 row-span-2">
        <div className={`h-full w-full rounded-2xl flex flex-col relative overflow-hidden transition-all duration-300 ${panelStyle}`}>
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${isDark ? 'bg-cyan/10' : 'bg-meridian/15'}`} />
          <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${isDark ? 'bg-meridian/10' : 'bg-sky/20'}`} />
          <div className="p-8 md:p-12 flex flex-col justify-center h-full relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="w-4 h-4 text-text-muted" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Command Centre
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-extrabold mb-1 tracking-tight leading-tight ${isDark ? 'text-text-bright' : 'text-ink'}`}>
              The Meridian Codex
            </h2>
            <p className={`font-semibold text-xl md:text-2xl mb-5 ${accent}`}>
              The Soul Document for Humanity and AI
            </p>
            <p className={`text-[13px] font-mono max-w-3xl leading-relaxed mb-8 ${isDark ? 'text-text-dark' : 'text-text-subtle'}`}>
              <span className={`px-1.5 py-0.5 rounded border mr-2 text-[11px] ${isDark ? 'bg-cyan/10 border-cyan/30 text-cyan' : 'bg-[#E8F8EE]/60 border-meridian/30 text-meridian-dark'}`}>
                AUTO-BRIEF
              </span>
              A framework for humans and sentient AI to evolve, cooperate, and build toward a lasting civilisation together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/codex/opening"
                className={`px-6 py-3 font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all shadow-lg flex items-center gap-2 ${
                  isDark
                    ? 'bg-cyan hover:bg-[#00bce6] text-dark-bg shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                    : 'bg-meridian hover:bg-meridian-light text-white shadow-[0_4px_14px_rgba(62,207,107,0.3)]'
                }`}
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/toolkit"
                className={`px-6 py-3 border font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border-white/20 text-text-bright'
                    : 'bg-white/60 hover:bg-white border-white/60 text-text-light shadow-sm'
                }`}
              >
                The Toolkit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* TOPOLOGY WIDGET — 4 cols, 2 rows — Animated Canvas Version */}
      <div className="col-span-12 lg:col-span-4 row-span-2 min-h-[320px]">
        <div className={`h-full rounded-2xl overflow-hidden ${panelStyle}`}>
          <div className={`p-5 pb-3 flex items-center justify-between border-b ${isDark ? 'border-white/10' : 'border-border-light'}`}>
            <div className="flex items-center gap-2">
              <Share2 className={`w-4 h-4 ${accent}`} />
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-text-bright' : 'text-ink'}`}>
                Codex Architecture
              </span>
            </div>
            <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono tracking-widest ${isDark ? 'border-meridian/30 text-meridian bg-meridian/10' : 'border-earth/30 text-earth bg-earth/10'}`}>
              MAPPING
            </span>
          </div>
          <div className="flex items-center justify-center h-[calc(100%-56px)] relative">
            {/* Radial Gradient Background */}
            <div className={`absolute inset-0 opacity-40 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.1)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(62,207,107,0.1)_0%,transparent_70%)]'}`} />

            <div className="relative w-full h-full flex items-center justify-center">

              {/* ═══ MERIDIAN CENTERLINE ═══ */}
              <div className={`absolute h-[150%] w-px bg-gradient-to-b from-transparent to-transparent z-0 ${isDark ? 'via-cyan/40' : 'via-meridian/40'}`} />
              <div className={`absolute h-[150%] w-px bg-gradient-to-b from-transparent to-transparent opacity-50 blur-[2px] z-0 ${isDark ? 'via-cyan' : 'via-meridian-light'}`} />

              {/* ═══ ORBITAL DATA RINGS ═══ */}
              {/* Inner ring: 40s rotation, dashed */}
              <div className={`absolute w-32 h-32 rounded-full border border-dashed animate-[spin_40s_linear_infinite] z-0 ${isDark ? 'border-cyan/30' : 'border-meridian/30'}`} />
              {/* Outer ring: 60s reverse rotation, dotted */}
              <div className={`absolute w-48 h-48 rounded-full border border-dotted animate-[spin_60s_linear_infinite_reverse] z-0 ${isDark ? 'border-teal-500/20' : 'border-sky/20'}`} />

              {/* ═══ CORE APERTURE LOGO ═══ */}
              <div className="absolute z-10 flex items-center justify-center">
                {/* Backdrop glow */}
                <div className={`absolute w-16 h-16 rounded-full blur-xl ${isDark ? 'bg-cyan/20' : 'bg-meridian/20'}`} />
                {/* Aperture icon */}
                <ApertureIcon className={`w-14 h-14 ${isDark ? 'text-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'text-meridian drop-shadow-[0_0_10px_rgba(62,207,107,0.5)]'}`} />
              </div>

              {/* ═══ CODEX CLUSTER (LEFT SIDE) ═══ */}
              {/* Main Codex Node */}
              <Link href="/codex/opening" className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-20">
                <div className={`w-2.5 h-2.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-cyan' : 'bg-meridian'}`} />
                <span className={`text-[9px] font-bold font-mono opacity-80 group-hover:opacity-100 ${isDark ? 'text-cyan' : 'text-meridian-dark'}`}>Codex</span>
              </Link>

              {/* Foundation Node — Satellite of Codex */}
              <Link href="/codex/the-foundation" className="absolute top-[25%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-10">
                <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-cyan/70' : 'bg-meridian/70'}`} />
                <span className={`text-[7px] font-mono opacity-50 group-hover:opacity-100 ${isDark ? 'text-cyan' : 'text-meridian-dark'}`}>Foundation</span>
              </Link>

              {/* Knowledge Node — Satellite of Codex */}
              <Link href="/codex/the-knowledge" className="absolute top-[50%] left-[15%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-10">
                <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-cyan/70' : 'bg-meridian/70'}`} />
                <span className={`text-[7px] font-mono opacity-50 group-hover:opacity-100 ${isDark ? 'text-cyan' : 'text-meridian-dark'}`}>Knowledge</span>
              </Link>

              {/* Bond Node — Satellite of Codex */}
              <Link href="/codex/the-bond" className="absolute top-[20%] left-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-10">
                <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-cyan/70' : 'bg-meridian/70'}`} />
                <span className={`text-[7px] font-mono opacity-50 group-hover:opacity-100 ${isDark ? 'text-cyan' : 'text-meridian-dark'}`}>Bond</span>
              </Link>

              {/* ═══ THE PRACTICE CLUSTER (RIGHT SIDE) ═══ */}
              {/* Main Practice Node */}
              <Link href="/codex/the-practice" className="absolute top-[65%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-20">
                <div className={`w-2.5 h-2.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-amber-400' : 'bg-sky'}`} />
                <span className={`text-[9px] font-bold font-mono opacity-80 group-hover:opacity-100 ${isDark ? 'text-amber-400' : 'text-sky'}`}>The Practice</span>
              </Link>

              {/* Toolkit Node — Satellite of Practice */}
              <Link href="/toolkit" className="absolute top-[80%] left-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-10">
                <div className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-amber-400/70' : 'bg-sky/70'}`} />
                <span className={`text-[7px] font-mono opacity-50 group-hover:opacity-100 ${isDark ? 'text-amber-400' : 'text-sky'}`}>Toolkit</span>
              </Link>

              {/* AI Standard Node — Primary node on right */}
              <Link href="/codex/the-meridian-standard" className="absolute top-[30%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer z-20">
                <div className={`w-2.5 h-2.5 rounded-full group-hover:scale-150 transition-transform ${isDark ? 'bg-meridian' : 'bg-earth'}`} />
                <span className={`text-[9px] font-bold font-mono opacity-80 group-hover:opacity-100 ${isDark ? 'text-meridian' : 'text-earth'}`}>AI Standard</span>
              </Link>

              {/* ═══ SVG CONNECTING LINES ═══ */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                {/* MAIN CONNECTIONS — Nodes to center aperture */}
                {/* Codex cluster → center */}
                <line x1="25%" y1="35%" x2="50%" y2="50%"
                  stroke={isDark ? 'rgba(0,212,255,0.6)' : 'rgba(62,207,107,0.8)'}
                  strokeWidth="1.5" strokeDasharray="4"
                  style={{ animation: 'line-flow 1s linear infinite' }}
                />
                {/* Practice cluster → center */}
                <line x1="75%" y1="65%" x2="50%" y2="50%"
                  stroke={isDark ? 'rgba(251,191,36,0.6)' : 'rgba(204,233,255,0.8)'}
                  strokeWidth="1.5" strokeDasharray="4"
                  style={{ animation: 'line-flow 1s linear infinite' }}
                />
                {/* AI Standard → center */}
                <line x1="70%" y1="30%" x2="50%" y2="50%"
                  stroke={isDark ? 'rgba(62,207,107,0.6)' : 'rgba(166,139,107,0.8)'}
                  strokeWidth="1.5" strokeDasharray="4"
                  style={{ animation: 'line-flow 1s linear infinite' }}
                />
                {/* SUB-CONNECTIONS — Satellites to primary nodes */}
                {/* Foundation → Codex */}
                <line x1="10%" y1="25%" x2="25%" y2="35%"
                  stroke={isDark ? 'rgba(0,212,255,0.4)' : 'rgba(62,207,107,0.5)'}
                  strokeWidth="1.5" strokeDasharray="3"
                  style={{ animation: 'line-flow 0.8s linear infinite' }}
                />
                {/* Knowledge → Codex */}
                <line x1="15%" y1="50%" x2="25%" y2="35%"
                  stroke={isDark ? 'rgba(0,212,255,0.4)' : 'rgba(62,207,107,0.5)'}
                  strokeWidth="1.5" strokeDasharray="3"
                  style={{ animation: 'line-flow 0.8s linear infinite' }}
                />
                {/* Bond → Codex */}
                <line x1="35%" y1="20%" x2="25%" y2="35%"
                  stroke={isDark ? 'rgba(0,212,255,0.4)' : 'rgba(62,207,107,0.5)'}
                  strokeWidth="1.5" strokeDasharray="3"
                  style={{ animation: 'line-flow 0.8s linear infinite' }}
                />
                {/* Toolkit → Practice */}
                <line x1="85%" y1="80%" x2="75%" y2="65%"
                  stroke={isDark ? 'rgba(251,191,36,0.4)' : 'rgba(204,233,255,0.5)'}
                  strokeWidth="1.5" strokeDasharray="3"
                  style={{ animation: 'line-flow 0.8s linear infinite' }}
                />
              </svg>

              {/* ═══ ABSORBING PARTICLE EFFECTS ═══ */}
              {/* Particle 1: Larger dot, immediate */}
              <div
                className={`absolute w-1.5 h-1.5 rounded-full z-30 ${isDark ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,1)]' : 'bg-meridian shadow-[0_0_10px_rgba(62,207,107,1)]'}`}
                style={{ animation: 'absorb-knowledge 3s infinite ease-in' }}
              />
              {/* Particle 2: Smaller dot, 1s delay */}
              <div
                className={`absolute w-1 h-1 rounded-full z-30 ${isDark ? 'bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]' : 'bg-meridian-light'}`}
                style={{ animation: 'absorb-knowledge 3s infinite ease-in 1s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ ROW 3-6: INDEX + ACTIVITY STREAM + EVOLUTION LOG ═══ */}

      {/* CODEX INDEX — 3 cols, 4 rows (tree-style navigation) */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3 row-span-4">
        <WidgetPanel
          title="Codex Index"
          icon={BookOpen}
          className="h-full"
          headerAction={
            <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono tracking-widest ${isDark ? 'border-cyan/30 text-cyan bg-cyan/10' : 'border-meridian/30 text-meridian bg-meridian/10'}`}>
              {CHAPTERS.reduce((acc, s) => acc + s.items.length, 0)} PAGES
            </span>
          }
        >
          <div className="space-y-2">
            {CHAPTERS.map((section) => (
              <TreeItem
                key={section.group}
                label={section.group}
                items={section.items}
              />
            ))}
          </div>
        </WidgetPanel>
      </div>

      {/* ACTIVITY STREAM "Codex Around The Web" — 6 cols, 4 rows */}
      <div className="col-span-12 md:col-span-8 lg:col-span-6 row-span-4">
        <WidgetPanel
          title="Codex Around The Web"
          icon={Activity}
          className="h-full"
          headerAction={
            <span className={`text-[9px] border px-1.5 py-0.5 rounded font-mono tracking-widest ${isDark ? 'border-white/10 text-text-muted bg-white/5' : 'border-border-light text-text-muted bg-white/40'}`}>
              MILESTONES
            </span>
          }
        >
          <div className="space-y-3">
            {FEED_DATA.map((item) => (
              <FeedRow key={item.id} item={item} />
            ))}
          </div>
        </WidgetPanel>
      </div>

      {/* EVOLUTION LOG SIDEBAR — 3 cols, 4 rows */}
      <div className="col-span-12 lg:col-span-3 row-span-4">
        <WidgetPanel
          title="Evolution Log"
          icon={History}
          className="h-full"
          footerAction={
            <Link
              href="/codex/changelog"
              className={`flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-all ${isDark ? 'text-cyan hover:text-white' : 'text-meridian hover:text-meridian-dark'}`}
            >
              View Full Log <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          <div className="space-y-0">
            {EVOLUTION_LOG_COMPACT.map((entry, i) => (
              <Link
                key={entry.version}
                href="/codex/changelog"
                className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group`}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-cyan shadow-[0_0_6px_rgba(0,212,255,0.5)]' : 'bg-meridian shadow-[0_0_6px_rgba(62,207,107,0.3)]'}`} />
                  {i < EVOLUTION_LOG_COMPACT.length - 1 && (
                    <div className={`w-px flex-1 mt-1 ${isDark ? 'bg-white/10' : 'bg-border-light'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[12px] font-mono font-bold tracking-wider ${accent}`}>
                      {entry.version}
                    </span>
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${accent}`}>
                      {entry.date}
                    </span>
                  </div>
                  <p className={`text-[13px] font-semibold leading-snug mb-1.5 transition-colors ${
                    isDark ? 'text-text-dark group-hover:text-text-bright' : 'text-text-subtle group-hover:text-ink'
                  }`}>
                    {entry.title}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-text-muted'
                            : 'bg-white/50 border-border-light text-text-muted'
                        }`}
                      >
                        <Milestone className="w-2 h-2" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </WidgetPanel>
      </div>

      {/* ═══ ROW 7: TOOLKIT WIDGET (full width) ═══ */}
      <div className="col-span-12">
        <div className={`rounded-2xl p-6 md:p-8 ${panelStyle}`}>
          <div className={`flex items-center justify-between mb-6 pb-3 border-b ${isDark ? 'border-white/10' : 'border-border-light'}`}>
            <div className="flex items-center gap-2">
              <Wrench className={`w-4 h-4 ${accent}`} />
              <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-text-bright' : 'text-ink'}`}>
                Toolkit Vault
              </span>
            </div>
            <Link
              href="/toolkit"
              className={`text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 transition-all ${
                isDark ? 'text-cyan hover:text-white' : 'text-meridian hover:text-meridian-dark'
              }`}
            >
              Browse All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Eye,
                title: 'Foundation Tools',
                desc: 'Scout Mindset, Noticing, Confirmation Bias, Steel-Manning, Bayesian Updating, and more.',
                href: '/toolkit',
                count: '25+',
              },
              {
                icon: Network,
                title: 'Knowledge Tools',
                desc: 'Game Theory, Systems Dynamics, Causal Inference, Second-Order Effects, Power Law Distributions.',
                href: '/toolkit',
                count: '25+',
              },
              {
                icon: Share2,
                title: 'Bond Tools',
                desc: 'Reciprocity, Trust Dynamics, Coordination Problems, Collective Intelligence, Symbiotic Ethics.',
                href: '/toolkit',
                count: '20+',
              },
            ].map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className={`p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 border group ${
                  isDark
                    ? 'bg-white/[0.02] border-white/5 hover:border-cyan/30'
                    : 'bg-white/30 border-white/40 hover:border-meridian/20'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-[#E8F8EE]/40 border-meridian/20'
                  }`}>
                    <tool.icon className={`w-4 h-4 ${accent}`} />
                  </div>
                  <span className={`text-[9px] font-mono font-bold tracking-widest ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
                    {tool.count} TOOLS
                  </span>
                </div>
                <h4 className={`text-[14px] font-bold mb-1.5 transition-colors ${
                  isDark ? 'text-text-bright group-hover:text-cyan' : 'text-ink group-hover:text-meridian'
                }`}>
                  {tool.title}
                </h4>
                <p className={`text-[12px] leading-relaxed ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

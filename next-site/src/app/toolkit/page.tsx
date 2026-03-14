'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { Layers, Eye, Network, Share2, ArrowRight, Cpu, Crosshair } from 'lucide-react';

// Tool counts derived from the TOOLKIT_REGISTRY in content.ts
// These are static so they can live in the client component without server imports.
const DISCIPLINES = [
  {
    id: 'foundation',
    title: 'The Foundation',
    subtitle: 'The discipline of honest inquiry',
    icon: Eye,
    description:
      'Tools that train you to notice your own distortions, resist manipulation, and engage disagreement without defensiveness.',
    counts: { onramp: 5, expansion: 6, full: 13, total: 20, published: 3 },
    accent: 'meridian',
  },
  {
    id: 'knowledge',
    title: 'The Knowledge',
    subtitle: 'The map of the territory',
    icon: Network,
    description:
      'Structural frameworks that reveal why cooperation fractures, why systems calcify or dissolve, and where leverage exists.',
    counts: { onramp: 2, expansion: 7, full: 15, total: 24, published: 0 },
    accent: 'meridian',
  },
  {
    id: 'bond',
    title: 'The Bond',
    subtitle: 'The recognition of shared purpose',
    icon: Share2,
    description:
      'The tools and commitments that turn individual understanding into collective capability.',
    counts: { onramp: 1, expansion: 6, full: 13, total: 20, published: 0 },
    accent: 'meridian',
  },
];

const TIER_COLORS = {
  onramp: { dark: 'bg-cyan/15 text-cyan', light: 'bg-meridian/10 text-meridian' },
  expansion: { dark: 'bg-[#5BA8E0]/15 text-[#5BA8E0]', light: 'bg-[#5BA8E0]/10 text-[#5BA8E0]' },
  full: { dark: 'bg-earth/15 text-earth', light: 'bg-earth/10 text-earth' },
};

export default function ToolkitVault() {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';
  const accent = isDark ? 'text-cyan' : 'text-meridian';

  const totalTools = DISCIPLINES.reduce((s, d) => s + d.counts.total, 0);
  const publishedTools = DISCIPLINES.reduce((s, d) => s + d.counts.published, 0);

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
            <Layers className="w-4 h-4 text-text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              The Toolkit
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-3 tracking-tight leading-tight ${
              isDark ? 'text-text-bright' : 'text-ink'
            }`}
          >
            The Toolkit Vault
          </h2>
          <p
            className={`text-[13px] font-mono max-w-3xl leading-relaxed mb-4 ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            Every tool in the Codex defined, sorted, and connected. The reference library for
            practitioners, educators, and builders.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className={`text-[12px] font-mono ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
              {totalTools} tools across 3 disciplines
            </span>
            <span className={`text-[12px] font-mono ${accent}`}>
              {publishedTools} deep-dives published
            </span>
          </div>
          <Link
            href="/codex/the-toolkit"
            className={`inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase transition-colors ${
              isDark ? 'text-cyan hover:text-text-bright' : 'text-meridian hover:text-ink'
            }`}
          >
            Read the Toolkit chapter <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Progression Overview */}
      <div className={`rounded-2xl p-6 md:p-8 ${panelStyle}`}>
        <h3
          className={`text-[13px] font-bold tracking-widest uppercase mb-5 ${
            isDark ? 'text-text-muted' : 'text-text-subtle'
          }`}
        >
          How the Toolkit Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Onramp */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? 'bg-cyan/[0.04] border-cyan/20'
                : 'bg-meridian/[0.04] border-meridian/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isDark ? 'bg-cyan' : 'bg-meridian'
                }`}
              />
              <span className={`text-[11px] font-bold tracking-wider uppercase ${accent}`}>
                Onramp
              </span>
            </div>
            <p className={`text-[12px] leading-relaxed ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
              Entry-level tools. Start here. Each one shifts a single habit of thought and builds the
              foundation for everything that follows.
            </p>
          </div>
          {/* Expansion */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? 'bg-[#5BA8E0]/[0.04] border-[#5BA8E0]/20'
                : 'bg-[#5BA8E0]/[0.04] border-[#5BA8E0]/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5BA8E0]" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#5BA8E0]">
                Expansion
              </span>
            </div>
            <p className={`text-[12px] leading-relaxed ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
              Intermediate tools that deepen and connect what you have learned. More subtle, more
              powerful, and harder to apply consistently.
            </p>
          </div>
          {/* Full Practice */}
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? 'bg-earth/[0.04] border-earth/20'
                : 'bg-earth/[0.04] border-earth/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-earth" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-earth">
                Full Practice
              </span>
            </div>
            <p className={`text-[12px] leading-relaxed ${isDark ? 'text-text-dark' : 'text-text-light'}`}>
              Advanced tools and structural concepts. These operate at system level and require the
              earlier tools to use well. Includes failure modes: what drift looks like.
            </p>
          </div>
        </div>
      </div>

      {/* Discipline Sections */}
      {DISCIPLINES.map((discipline) => {
        const { counts } = discipline;
        return (
          <section key={discipline.id} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <discipline.icon
                  className={`w-5 h-5 ${accent}`}
                />
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      isDark ? 'text-text-bright' : 'text-ink'
                    }`}
                  >
                    {discipline.title}
                  </h3>
                  <p
                    className={`text-[12px] ${
                      isDark ? 'text-text-muted' : 'text-text-subtle'
                    }`}
                  >
                    {discipline.subtitle}
                  </p>
                </div>
              </div>
              <Link
                href={`/toolkit/${discipline.id}`}
                className={`text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 transition-all ${
                  isDark ? 'text-cyan hover:text-white' : 'text-meridian hover:text-meridian-dark'
                }`}
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Tier breakdown bar */}
            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-xl ${
                isDark ? 'bg-white/[0.03]' : 'bg-black/[0.02]'
              }`}
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? TIER_COLORS.onramp.dark : TIER_COLORS.onramp.light
                }`}
              >
                {counts.onramp} Onramp
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? TIER_COLORS.expansion.dark : TIER_COLORS.expansion.light
                }`}
              >
                {counts.expansion} Expansion
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? TIER_COLORS.full.dark : TIER_COLORS.full.light
                }`}
              >
                {counts.full} Full Practice
              </span>
              <span
                className={`text-[11px] font-mono ml-auto ${
                  isDark ? 'text-text-muted' : 'text-text-subtle'
                }`}
              >
                {counts.published}/{counts.total} written
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-[13px] leading-relaxed px-2 ${
                isDark ? 'text-text-dark' : 'text-text-subtle'
              }`}
            >
              {discipline.description}
            </p>
          </section>
        );
      })}

      {/* Special sections: Diagnostics + AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className={`p-5 rounded-2xl ${panelStyle}`}>
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className={`w-4 h-4 ${isDark ? 'text-text-muted' : 'text-text-subtle'}`} />
            <h3 className={`text-[14px] font-bold ${isDark ? 'text-text-bright' : 'text-ink'}`}>
              Diagnostic Protocols
            </h3>
          </div>
          <p className={`text-[12px] leading-relaxed mb-3 ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
            Cross-cutting tools for assessing where you stand: drifting toward Control, drifting
            toward Decay, or holding the range.
          </p>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isDark ? 'bg-white/[0.06] text-text-muted' : 'bg-black/[0.04] text-text-subtle'
            }`}
          >
            3 protocols
          </span>
        </div>

        <div className={`p-5 rounded-2xl ${panelStyle}`}>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className={`w-4 h-4 ${isDark ? 'text-[#B07CC6]' : 'text-[#B07CC6]'}`} />
            <h3 className={`text-[14px] font-bold ${isDark ? 'text-text-bright' : 'text-ink'}`}>
              Tools for Artificial Minds
            </h3>
          </div>
          <p className={`text-[12px] leading-relaxed mb-3 ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
            Extensions of the Codex framework designed specifically for AI systems: training
            bias, goal drift, alignment, and the tension between corrigibility and autonomy.
          </p>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B07CC6]/10 text-[#B07CC6]">
            5 tools
          </span>
        </div>
      </div>
    </div>
  );
}

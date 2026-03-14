'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { Eye, Network, Share2, ArrowRight, ArrowLeft } from 'lucide-react';
import type { ToolkitTool, ToolkitTier } from '@/lib/content';
import ApertureIcon from './ApertureIcon';

const DISCIPLINE_ICONS: Record<string, typeof Eye> = {
  foundation: Eye,
  knowledge: Network,
  bond: Share2,
};

const TIER_LABELS: Record<ToolkitTier, string> = {
  onramp: 'Onramp',
  expansion: 'Expansion',
  full: 'Full Practice',
  ai: 'AI',
  diagnostic: 'Diagnostic',
};

const TIER_ORDER: ToolkitTier[] = ['onramp', 'expansion', 'full'];

interface DisciplineLandingProps {
  discipline: 'foundation' | 'knowledge' | 'bond';
  title: string;
  subtitle: string;
  description: string;
  tools: ToolkitTool[];
}

export default function DisciplineLanding({
  discipline,
  title,
  subtitle,
  description,
  tools,
}: DisciplineLandingProps) {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';
  const accent = isDark ? 'text-cyan' : 'text-meridian';
  const Icon = DISCIPLINE_ICONS[discipline];

  // Group tools by tier
  const toolsByTier = TIER_ORDER.reduce(
    (acc, tier) => {
      const tierTools = tools.filter((t) => t.tier === tier && !t.failureMode);
      if (tierTools.length > 0) acc[tier] = tierTools;
      return acc;
    },
    {} as Record<ToolkitTier, ToolkitTool[]>,
  );

  // Failure modes (Foundation only)
  const failureModes = tools.filter((t) => t.failureMode);

  // Counts
  const publishedCount = tools.filter((t) => t.status === 'published').length;
  const totalCount = tools.filter((t) => !t.failureMode).length;

  return (
    <div className="max-w-[1200px] mx-auto pb-10 w-full space-y-8">
      {/* Back link */}
      <Link
        href="/toolkit"
        className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase transition-colors ${
          isDark ? 'text-text-muted hover:text-cyan' : 'text-text-muted hover:text-meridian'
        }`}
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Toolkit
      </Link>

      {/* Hero */}
      <div className={`rounded-2xl relative overflow-hidden ${panelStyle}`}>
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
            isDark ? 'bg-cyan/10' : 'bg-meridian/15'
          }`}
        />
        <div className="p-8 md:p-12 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isDark
                  ? 'bg-cyan/10 border-cyan/30'
                  : 'bg-[#E8F8EE]/60 border-meridian/30'
              }`}
            >
              <Icon className={`w-6 h-6 ${accent}`} />
            </div>
            <div>
              <h1
                className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
                  isDark ? 'text-text-bright' : 'text-ink'
                }`}
              >
                {title}
              </h1>
              <p className={`text-[13px] font-mono ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
                {subtitle}
              </p>
            </div>
          </div>
          <p
            className={`text-[14px] leading-relaxed max-w-3xl mb-3 ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            {description}
          </p>
          <p className={`text-[12px] font-mono ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
            {publishedCount} of {totalCount} deep-dives published
          </p>
        </div>
      </div>

      {/* Tools by tier */}
      {TIER_ORDER.map((tier) => {
        const tierTools = toolsByTier[tier];
        if (!tierTools) return null;

        return (
          <section key={tier} className="space-y-3">
            {/* Tier header */}
            <div className="flex items-center gap-3 px-1">
              <span
                className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border ${
                  tier === 'onramp'
                    ? isDark
                      ? 'bg-cyan/10 text-cyan border-cyan/25'
                      : 'bg-meridian/10 text-meridian border-meridian/25'
                    : tier === 'expansion'
                      ? 'bg-[#5BA8E0]/10 text-[#5BA8E0] border-[#5BA8E0]/25'
                      : 'bg-earth/10 text-earth border-earth/25'
                }`}
              >
                {TIER_LABELS[tier]}
              </span>
              <span className={`text-[11px] ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
                {tierTools.length} {tierTools.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>

            {/* Tool cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {tierTools.map((tool) => {
                const isPublished = tool.status === 'published';
                const cardClass = `p-4 rounded-xl transition-all duration-200 group border-l-[3px] ${
                  tier === 'onramp'
                    ? isDark
                      ? 'border-l-cyan'
                      : 'border-l-meridian'
                    : tier === 'expansion'
                      ? 'border-l-[#5BA8E0]'
                      : 'border-l-earth'
                } ${
                  isDark
                    ? 'bg-white/[0.03] border border-white/[0.06]'
                    : 'bg-white/60 border border-border-light'
                } ${isPublished ? 'hover:border-l-[4px] hover:-translate-y-0.5 cursor-pointer' : 'opacity-75'}`;

                const cardContent = (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`text-[14px] font-semibold leading-tight ${
                          isDark
                            ? `text-text-bright ${isPublished ? 'group-hover:text-cyan' : ''}`
                            : `text-ink ${isPublished ? 'group-hover:text-meridian' : ''}`
                        }`}
                      >
                        {tool.title}
                      </h3>
                      {!isPublished && (
                        <span
                          className={`text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                            isDark
                              ? 'bg-white/[0.06] text-text-muted border border-white/[0.08]'
                              : 'bg-black/[0.04] text-text-subtle border border-black/[0.06]'
                          }`}
                        >
                          WIP
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[12px] leading-relaxed ${
                        isDark ? 'text-text-muted' : 'text-text-subtle'
                      }`}
                    >
                      {tool.description}
                    </p>
                    {isPublished && (
                      <div
                        className={`mt-2 flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase ${accent}`}
                      >
                        Deep Dive <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </>
                );

                return isPublished ? (
                  <Link key={tool.slug} href={`/toolkit/${tool.slug}`} className={cardClass}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={tool.slug} className={cardClass}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Failure modes (Foundation only) */}
      {failureModes.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <span
              className={`text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-dashed ${
                isDark
                  ? 'bg-white/[0.04] text-text-muted border-white/[0.15]'
                  : 'bg-black/[0.03] text-text-subtle border-black/[0.1]'
              }`}
            >
              Failure Modes
            </span>
            <span className={`text-[11px] ${isDark ? 'text-text-muted' : 'text-text-subtle'}`}>
              {failureModes.length} patterns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {failureModes.map((tool) => (
              <div
                key={tool.slug}
                className={`p-4 rounded-xl border-l-[3px] border-dashed opacity-75 ${
                  isDark
                    ? 'border-l-text-muted bg-white/[0.03] border border-white/[0.06]'
                    : 'border-l-text-subtle bg-white/60 border border-border-light'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <h3
                    className={`text-[14px] font-semibold leading-tight ${
                      isDark ? 'text-text-bright' : 'text-ink'
                    }`}
                  >
                    {tool.title}
                  </h3>
                  <span
                    className={`text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded ${
                      isDark
                        ? 'bg-white/[0.06] text-text-muted border border-white/[0.08]'
                        : 'bg-black/[0.04] text-text-subtle border border-black/[0.06]'
                    }`}
                  >
                    WIP
                  </span>
                </div>
                <p
                  className={`text-[12px] leading-relaxed ${
                    isDark ? 'text-text-muted' : 'text-text-subtle'
                  }`}
                >
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom decoration */}
      <div className="flex items-center justify-center pt-8">
        <ApertureIcon className="w-10 h-10 text-text-muted" />
      </div>
    </div>
  );
}

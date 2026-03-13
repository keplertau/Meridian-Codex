'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { Eye, Network, Share2, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import type { ToolkitTool } from '@/lib/content';
import ApertureIcon from './ApertureIcon';

const DISCIPLINE_ICONS: Record<string, typeof Eye> = {
  foundation: Eye,
  knowledge: Network,
  bond: Share2,
};

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
            className={`text-[14px] leading-relaxed max-w-3xl ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/toolkit/${tool.slug}`}
              className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${panelStyle}`}
            >
              <h3
                className={`text-[16px] font-bold mb-2 transition-colors ${
                  isDark
                    ? 'text-text-bright group-hover:text-cyan'
                    : 'text-ink group-hover:text-meridian'
                }`}
              >
                {tool.title}
              </h3>
              <p
                className={`text-[13px] leading-relaxed mb-4 ${
                  isDark ? 'text-text-muted' : 'text-text-subtle'
                }`}
              >
                {tool.description}
              </p>
              <div
                className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${accent}`}
              >
                Deep Dive <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className={`p-8 rounded-2xl border-2 border-dashed flex items-center gap-4 ${
            isDark
              ? 'border-white/10 text-text-muted'
              : 'border-border-light text-text-subtle'
          }`}
        >
          <Lock className="w-6 h-6 shrink-0" />
          <div>
            <p className={`text-[15px] font-bold mb-1 ${isDark ? 'text-text-bright' : 'text-ink'}`}>
              Deep-dives coming soon
            </p>
            <p className="text-[13px]">
              The {title.toLowerCase()} tools are being written. Each will receive a full six-element deep-dive page.
            </p>
          </div>
        </div>
      )}

      {/* Bottom decoration */}
      <div className="flex items-center justify-center pt-8">
        <ApertureIcon className="w-10 h-10 text-text-muted" />
      </div>
    </div>
  );
}

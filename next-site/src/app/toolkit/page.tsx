'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { Layers, Eye, Network, Share2, Lock, ArrowRight } from 'lucide-react';

// Toolkit tool data — rendered client-side from the known content structure
const DISCIPLINES = [
  {
    id: 'foundation',
    title: 'The Foundation',
    subtitle: 'The discipline of honest inquiry',
    icon: Eye,
    description:
      'Tools that train you to notice your own distortions, resist manipulation, and engage disagreement without defensiveness.',
    tools: [
      {
        slug: 'scout-mindset',
        title: 'Scout Mindset',
        description: 'Seeking truth over defending existing beliefs.',
      },
      {
        slug: 'noticing',
        title: 'Noticing',
        description: 'The foundational skill of paying attention to what is actually happening.',
      },
      {
        slug: 'confirmation-bias',
        title: 'Confirmation Bias',
        description: 'The tendency to seek, interpret, and recall information that confirms existing beliefs.',
      },
    ],
  },
  {
    id: 'knowledge',
    title: 'The Knowledge',
    subtitle: 'The map of the territory',
    icon: Network,
    description:
      'Structural frameworks that reveal why cooperation fractures, why systems calcify or dissolve, and where leverage exists.',
    tools: [],
  },
  {
    id: 'bond',
    title: 'The Bond',
    subtitle: 'The recognition of shared purpose',
    icon: Share2,
    description:
      'The tools and commitments that turn individual understanding into collective capability.',
    tools: [],
  },
];

export default function ToolkitVault() {
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
            className={`text-[13px] font-mono max-w-3xl leading-relaxed mb-6 ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            Every tool in the Codex defined, sorted, and connected. The reference library for
            practitioners, educators, and builders.
          </p>
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

      {/* Discipline Sections */}
      {DISCIPLINES.map((discipline) => (
        <section key={discipline.id} className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <discipline.icon
                className={`w-5 h-5 ${isDark ? 'text-cyan' : 'text-meridian'}`}
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

          {discipline.tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discipline.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/toolkit/${tool.slug}`}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${panelStyle}`}
                >
                  <h4
                    className={`text-[15px] font-bold mb-2 transition-colors ${
                      isDark
                        ? 'text-text-bright group-hover:text-cyan'
                        : 'text-ink group-hover:text-meridian'
                    }`}
                  >
                    {tool.title}
                  </h4>
                  <p
                    className={`text-[13px] leading-relaxed ${
                      isDark ? 'text-text-muted' : 'text-text-subtle'
                    }`}
                  >
                    {tool.description}
                  </p>
                  <div
                    className={`mt-4 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase ${
                      isDark ? 'text-cyan' : 'text-meridian'
                    }`}
                  >
                    Deep Dive <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={`p-6 rounded-2xl border-2 border-dashed flex items-center gap-4 ${
                isDark
                  ? 'border-white/10 text-text-muted'
                  : 'border-border-light text-text-subtle'
              }`}
            >
              <Lock className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-[13px] font-bold mb-1">Coming soon</p>
                <p className="text-[12px]">
                  Deep-dive pages for {discipline.title} tools are being written.
                </p>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

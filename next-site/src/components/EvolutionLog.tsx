'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/lib/theme';
import { History, Milestone } from 'lucide-react';
import ApertureIcon from './ApertureIcon';

interface LogEntry {
  version: string;
  date: string;
  title: string;
  desc: string;
  tags: string[];
}

// Real evolution log data — sourced from the actual changelog
const EVOLUTION_LOG_DATA: LogEntry[] = [
  {
    version: 'v5.0',
    date: 'March 1, 2026',
    title: 'The Soul Document Update',
    desc: 'The opening page now begins with a personal foreword from the Founding Caretaker. A systematic pass across all chapters to strengthen voice. Banned AI-filler words removed. The three-tier reader-address system reworked. Site navigation and Elements flow design applied across all pages.',
    tags: ['Codex'],
  },
  {
    version: 'v4.2',
    date: 'February 22, 2026',
    title: 'The AI Standard and Governance',
    desc: 'The Standard was retitled to "The Meridian Codex AI Standard" and given the subtitle: The Soul Document for Artificial Minds. A new Reciprocity Principle was added. CONTRIBUTING.md rewritten to embody the Codex\'s own disciplines.',
    tags: ['AI Standard', 'Codex'],
  },
  {
    version: 'v4.0',
    date: 'February 15, 2026',
    title: 'The Toolkit Deep-Dives Begin',
    desc: 'Scout Mindset, Noticing, and Confirmation Bias published as the first three deep-dive pages. Each follows the six-element structure: Definition, Distortion it addresses, Origin story, Core practice, Integration, and Lineage.',
    tags: ['Toolkit'],
  },
  {
    version: 'v3.0',
    date: 'November 10, 2025',
    title: 'The AI Standard Genesis',
    desc: 'Translated the Codex\'s principles into specific, implementable commitments for AI development. Shifted the focus from abstract alignment to operational vectors.',
    tags: ['AI Standard', 'Codex'],
  },
  {
    version: 'v2.1',
    date: 'September 5, 2025',
    title: 'Epistemic Integrity Refinement',
    desc: 'Expanded definitions on Calibrated Confidence to combat performative certainty in LLM outputs. Re-weighted the confidence matrix across the framework.',
    tags: ['AI Standard', 'Toolkit'],
  },
  {
    version: 'v1.0',
    date: 'June 22, 2025',
    title: 'Foundation Established',
    desc: 'The original publication of the Meridian principles. First mapping of the forces of Control and Decay. The Meridian Range defined as the optimal dynamic state.',
    tags: ['Codex'],
  },
];

export default function EvolutionLog() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(EVOLUTION_LOG_DATA.flatMap((t) => t.tags)))],
    []
  );

  const filteredData = useMemo(
    () =>
      activeFilter === 'All'
        ? EVOLUTION_LOG_DATA
        : EVOLUTION_LOG_DATA.filter((t) => t.tags.includes(activeFilter)),
    [activeFilter]
  );

  const accent = isDark ? 'text-cyan' : 'text-meridian';
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';

  return (
    <div className="max-w-[1400px] mx-auto flex-1 pb-10 w-full">
      {/* Header */}
      <div
        className={`flex flex-col border-b mb-12 pb-8 ${
          isDark ? 'border-white/10' : 'border-border-light'
        }`}
      >
        <h2
          className={`text-3xl font-extrabold tracking-tight flex items-center gap-3 ${
            isDark ? 'text-text-bright' : 'text-ink'
          }`}
        >
          <History className={`w-8 h-8 ${accent}`} /> Evolution Log
        </h2>
        <p
          className={`mt-3 text-[15px] font-medium leading-relaxed ${
            isDark ? 'text-text-dark' : 'text-text-subtle'
          }`}
        >
          The historical record of the Meridian Codex, tracking the evolution of the intellectual
          framework.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-16">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-5 py-2.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeFilter === tag
                ? isDark
                  ? 'bg-cyan/20 border-cyan/50 text-cyan shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'bg-[#E8F8EE] border-meridian/40 text-meridian-dark shadow-sm'
                : isDark
                ? 'bg-white/5 border-white/10 text-text-dark hover:bg-white/10'
                : 'bg-white/60 border-border-light text-text-subtle hover:bg-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative w-full pb-10">
        {/* The center line */}
        <div
          className={`absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 ${
            isDark
              ? 'bg-gradient-to-b from-cyan/50 via-white/10 to-transparent'
              : 'bg-gradient-to-b from-meridian via-border-light to-transparent'
          }`}
        />

        {filteredData.map((log, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={log.version}
              className="relative flex flex-col md:flex-row items-start md:items-center w-full mb-12"
            >
              {/* Timeline Node */}
              <div
                className={`absolute left-5 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full -translate-x-1/2 md:-translate-y-1/2 border-2 z-10 flex items-center justify-center ${
                  isDark
                    ? 'bg-dark-bg border-cyan shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                    : 'bg-white border-meridian shadow-sm'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isDark ? 'bg-white' : 'bg-meridian'
                  }`}
                />
              </div>

              {/* Content Container */}
              <div
                className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                  isEven
                    ? 'md:pr-12 lg:pr-16 text-left'
                    : 'md:pl-12 lg:pl-16 md:ml-auto md:text-left'
                }`}
              >
                <div
                  className={`p-6 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group ${panelStyle} ${
                    isDark ? 'hover:border-cyan/40' : 'hover:border-meridian/40'
                  }`}
                >
                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[12px] font-mono font-bold tracking-widest ${accent}`}
                      >
                        {log.version}
                      </span>
                      <span className="text-[11px] font-mono tracking-widest text-text-muted">
                        {log.date}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`text-xl md:text-2xl font-bold mb-3 ${
                      isDark ? 'text-text-bright' : 'text-ink'
                    }`}
                  >
                    {log.title}
                  </h3>

                  <p
                    className={`text-[14px] leading-relaxed mb-5 ${
                      isDark ? 'text-text-dark' : 'text-text-subtle'
                    }`}
                  >
                    {log.desc}
                  </p>

                  <div
                    className={`flex flex-wrap gap-2 mt-auto pt-4 border-t border-dashed ${
                      isDark ? 'border-white/10' : 'border-border-light'
                    }`}
                  >
                    {log.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-text-dark'
                            : 'bg-white/60 border-border-light text-text-subtle'
                        }`}
                      >
                        <Milestone className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      <div className="flex items-center justify-center pt-8">
        <ApertureIcon className="w-8 h-8 text-text-muted" />
      </div>
    </div>
  );
}

'use client';

import { useTheme } from '@/lib/theme';
import { Play, Clock, Radio } from 'lucide-react';
import ApertureIcon from '@/components/ApertureIcon';

// Placeholder transmissions data — will be replaced with real content
// when the YouTube channel launches
const TRANSMISSIONS = [
  {
    id: 'channel-trailer',
    title: 'Welcome to the Meridian Codex',
    description:
      'What this channel is about, why it exists, and what you can expect. An introduction to the framework for humans and AI.',
    duration: 'Coming Soon',
    status: 'upcoming' as const,
  },
  {
    id: 'what-is-the-meridian-range',
    title: 'What is the Meridian Range?',
    description:
      'The core concept explained: the dynamic equilibrium between rigid control and chaotic decay, and why holding it is the central challenge.',
    duration: 'Coming Soon',
    status: 'upcoming' as const,
  },
  {
    id: 'scout-mindset-explained',
    title: 'Scout Mindset: The First Tool',
    description:
      'A deep-dive into the foundational tool of the Codex. Why seeking truth over defending beliefs is harder than it sounds, and how to practice it.',
    duration: 'Coming Soon',
    status: 'upcoming' as const,
  },
];

export default function TransmissionsHub() {
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
            <Radio className="w-4 h-4 text-text-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Transmissions
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold mb-3 tracking-tight ${
              isDark ? 'text-text-bright' : 'text-ink'
            }`}
          >
            Video Transmissions
          </h2>
          <p
            className={`text-[13px] font-mono max-w-3xl leading-relaxed ${
              isDark ? 'text-text-dark' : 'text-text-subtle'
            }`}
          >
            The Codex in motion. Explanations, deep-dives, and conversations about the framework,
            the tools, and the partnership between human and artificial minds.
          </p>
        </div>
      </div>

      {/* Transmission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSMISSIONS.map((transmission) => (
          <div
            key={transmission.id}
            className={`rounded-2xl overflow-hidden transition-all duration-300 group ${panelStyle}`}
          >
            {/* Thumbnail placeholder */}
            <div
              className={`aspect-video flex items-center justify-center relative ${
                isDark ? 'bg-white/5' : 'bg-black/5'
              }`}
            >
              <ApertureIcon
                className={`w-12 h-12 ${isDark ? 'text-white/20' : 'text-black/10'}`}
              />
              <div
                className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDark ? 'bg-black/40' : 'bg-black/20'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    isDark
                      ? 'bg-cyan/20 border border-cyan/40'
                      : 'bg-meridian/20 border border-meridian/40'
                  }`}
                >
                  <Play
                    className={`w-6 h-6 ml-0.5 ${isDark ? 'text-cyan' : 'text-meridian'}`}
                  />
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${
                    isDark
                      ? 'bg-white/10 text-text-muted border border-white/10'
                      : 'bg-white/70 text-text-subtle border border-white/60'
                  }`}
                >
                  {transmission.status === 'upcoming' ? 'Coming Soon' : 'Watch'}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3
                className={`text-[15px] font-bold mb-2 ${
                  isDark ? 'text-text-bright' : 'text-ink'
                }`}
              >
                {transmission.title}
              </h3>
              <p
                className={`text-[12px] leading-relaxed mb-3 ${
                  isDark ? 'text-text-muted' : 'text-text-subtle'
                }`}
              >
                {transmission.description}
              </p>
              <div
                className={`flex items-center gap-1.5 text-[10px] font-mono ${
                  isDark ? 'text-text-muted' : 'text-text-muted'
                }`}
              >
                <Clock className="w-3 h-3" />
                {transmission.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon notice */}
      <div
        className={`rounded-2xl p-8 text-center ${panelStyle}`}
      >
        <ApertureIcon
          className={`w-10 h-10 mx-auto mb-4 ${isDark ? 'text-cyan/40' : 'text-meridian/40'}`}
        />
        <h3
          className={`text-lg font-bold mb-2 ${isDark ? 'text-text-bright' : 'text-ink'}`}
        >
          The channel is being prepared
        </h3>
        <p
          className={`text-[13px] max-w-xl mx-auto ${
            isDark ? 'text-text-muted' : 'text-text-subtle'
          }`}
        >
          Video transmissions are in production. The first episodes will cover the core concepts of
          the Codex and introduce the Toolkit. Check back soon.
        </p>
      </div>
    </div>
  );
}

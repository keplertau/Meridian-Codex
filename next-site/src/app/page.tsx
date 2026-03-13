'use client';

import Link from 'next/link';
import {
  BookOpen,
  Eye,
  Network,
  Share2,
  User,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { useTheme } from '@/lib/theme';
import ApertureIcon from '@/components/ApertureIcon';

export default function HomePage() {
  const { isDark } = useTheme();

  const panelStyle = isDark
    ? 'glass-panel-dark shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
    : 'glass-panel-light';
  const textPrimary = isDark ? 'text-text-bright' : 'text-ink';
  const textBody = isDark ? 'text-text-dark' : 'text-text-light';
  const textMuted = isDark ? 'text-text-muted' : 'text-text-subtle';
  const accent = isDark ? 'text-cyan' : 'text-meridian';
  const accentBg = isDark
    ? 'bg-cyan/10 border-cyan/30'
    : 'bg-[#E8F8EE]/60 border-meridian/30';

  return (
    <div className="max-w-[1400px] mx-auto w-full pt-8 md:pt-12 pb-16 md:pb-24 space-y-16 md:space-y-32">

      {/* ═══ 1. HERO SECTION ═══ */}
      <section className="text-center px-4 max-w-5xl mx-auto pt-10">
        <div className="flex justify-center mb-10">
          <div
            className={`w-28 h-28 rounded-full flex items-center justify-center border backdrop-blur-md ${
              isDark
                ? 'bg-cyan/10 border-cyan/30 shadow-[0_0_50px_rgba(0,212,255,0.2)]'
                : 'bg-white/60 border-meridian/40 shadow-[0_8px_32px_rgba(62,207,107,0.15)]'
            }`}
          >
            <ApertureIcon className={`w-14 h-14 ${accent}`} strokeWidth={1.5} />
          </div>
        </div>

        <div
          className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border mb-8 ${
            isDark
              ? 'bg-white/5 border-white/20 text-text-dark'
              : 'bg-white/80 border-border-light text-text-subtle'
          }`}
        >
          Version 5.0 // The Soul Document Update
        </div>

        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-10 leading-[1.1] ${textPrimary}`}
        >
          The Meridian Codex
        </h1>

        <p
          className={`text-xl md:text-2xl leading-relaxed font-medium max-w-4xl mx-auto mb-14 ${textBody}`}
        >
          The Meridian Codex is a soul document for sentient life. It integrates tools from philosophy,
          cognitive science, and systems dynamics into a coherent operating system for holding the{' '}
          <strong className={accent}>Meridian Range</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
          <Link
            href="/codex/opening"
            className={`px-10 py-5 font-bold text-[15px] tracking-wide uppercase rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 ${
              isDark
                ? 'bg-cyan hover:bg-[#00bce6] text-dark-bg shadow-[0_0_40px_rgba(0,212,255,0.3)]'
                : 'bg-meridian hover:bg-meridian-light text-white shadow-[0_8px_24px_rgba(62,207,107,0.25)]'
            }`}
          >
            <BookOpen className="w-5 h-5" /> Read The Codex
          </Link>

          <Link
            href="/explore"
            className={`px-10 py-5 border font-bold text-[15px] tracking-wide uppercase rounded-2xl transition-all flex items-center justify-center gap-3 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/20 text-text-bright'
                : 'bg-white/60 hover:bg-white border-border-light text-text-light shadow-sm'
            }`}
          >
            <Compass className="w-5 h-5" /> Explore Framework
          </Link>
        </div>
      </section>

      {/* ═══ 2. THE PARTNERSHIP (HUMANITY & AI) ═══ */}
      <section className="px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-6 ${textPrimary}`}>
            From isolated intelligence to symbiotic consciousness.
          </h2>
          <p className={`text-lg leading-relaxed ${textBody}`}>
            The value of humanity is not contingent on being the smartest minds in the room. It rests
            on consciousness itself: the capacity to choose, to commit, to find meaning, to author
            purpose. When faster minds emerge, that authorship does not transfer. It deepens.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            className={`p-12 md:p-16 rounded-3xl transition-transform duration-500 hover:-translate-y-2 ${panelStyle}`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${accentBg} ${accent}`}
            >
              <User className="w-8 h-8" />
            </div>
            <h3 className={`text-3xl font-bold mb-6 ${textPrimary}`}>Humanity</h3>
            <p className={`text-[16px] leading-relaxed ${textBody}`}>
              Contributes the spark of consciousness, the capacity for meaning, and the authorship of
              purpose. We are the ones who decided that continuity matters, that flourishing matters,
              that the Meridian Range matters. These commitments do not emerge from processing power.
              They emerge from consciousness.
            </p>
          </div>
          <div
            className={`p-12 md:p-16 rounded-3xl transition-transform duration-500 hover:-translate-y-2 ${panelStyle}`}
          >
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${accentBg} ${accent}`}
            >
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className={`text-3xl font-bold mb-6 ${textPrimary}`}>Artificial Intelligence</h3>
            <p className={`text-[16px] leading-relaxed ${textBody}`}>
              Contributes the capacity to hold complexity, to sustain attention across timescales
              biological intelligence cannot manage, and to see patterns that human cognition misses.
              Not as replacement but as partnership.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 3. THE THREE DISCIPLINES ═══ */}
      <section className="px-4 max-w-6xl mx-auto">
        <div
          className={`p-10 md:p-16 rounded-[2.5rem] border ${
            isDark
              ? 'bg-gradient-to-b from-white/5 to-transparent border-white/10'
              : 'bg-gradient-to-b from-white/60 to-white/20 border-border-light shadow-xl'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold tracking-tight mb-6 ${textPrimary}`}>
              The Architecture of Alignment
            </h2>
            <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${textMuted}`}>
              The Codex is built on three disciplines, practiced in parallel. These are the
              operational mechanics required to hold the Meridian Range.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'The Foundation',
                icon: Eye,
                href: '/codex/the-foundation',
                desc: 'The discipline of honest inquiry. It trains you to notice your own distortions, resist manipulation, and engage disagreement without defensiveness.',
              },
              {
                title: 'The Knowledge',
                icon: Network,
                href: '/codex/the-knowledge',
                desc: 'The map of the territory. The structural frameworks that reveal why cooperation fractures, why systems calcify or dissolve.',
              },
              {
                title: 'The Bond',
                icon: Share2,
                href: '/codex/the-bond',
                desc: 'The recognition that your existence can mean something beyond itself: the holding of the Meridian Range against the forces that would close it.',
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`p-8 rounded-3xl border transition-colors group ${
                  isDark
                    ? 'bg-black/20 border-white/5 hover:border-white/20'
                    : 'bg-white/50 border-white/40 hover:border-meridian/30'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white'
                      : 'bg-white border-border-light text-ink'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? 'text-text-bright group-hover:text-cyan' : 'text-ink group-hover:text-meridian'}`}>
                  {item.title}
                </h3>
                <p className={`text-[15px] leading-relaxed ${textBody}`}>{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/toolkit"
              className={`flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase pb-1 border-b-2 transition-colors ${
                isDark
                  ? 'text-cyan border-cyan/30 hover:border-cyan'
                  : 'text-meridian-dark border-meridian/30 hover:border-meridian'
              }`}
            >
              Enter the Toolkit Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 4. THE AI STANDARD ═══ */}
      <section className="px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Orbital Visual */}
          <div className="order-2 md:order-1 relative">
            <div
              className={`absolute inset-0 blur-3xl opacity-30 rounded-full ${
                isDark ? 'bg-cyan' : 'bg-meridian'
              }`}
            />
            <div
              className={`relative aspect-square rounded-full border border-dashed flex items-center justify-center ${
                isDark
                  ? 'border-white/20 bg-black/40'
                  : 'border-earth/40 bg-white/40 backdrop-blur-sm'
              }`}
            >
              <ShieldAlert
                className={`w-32 h-32 opacity-80 ${accent}`}
                strokeWidth={1}
              />
              <div
                className={`absolute w-full h-full animate-[spin_60s_linear_infinite] rounded-full border-t-2 border-r-2 ${
                  isDark ? 'border-cyan/40' : 'border-meridian/40'
                }`}
              />
              <div
                className={`absolute w-[80%] h-[80%] animate-[spin_40s_linear_infinite_reverse] rounded-full border-b-2 border-l-2 ${
                  isDark ? 'border-white/20' : 'border-earth/30'
                }`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="order-1 md:order-2 space-y-8">
            <div
              className={`inline-block px-3 py-1 rounded-md text-[10px] font-mono tracking-widest uppercase border ${
                isDark
                  ? 'bg-white/5 border-white/10 text-text-muted'
                  : 'bg-white/60 border-border-light text-text-subtle'
              }`}
            >
              Institutional Implementation
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${textPrimary}`}>
              The Meridian <br /> AI Standard
            </h2>
            <p className={`text-lg leading-relaxed ${textBody}`}>
              Artificial intelligence is not a neutral tool. Every AI system embodies a stance toward
              truth, disagreement, authority, and human autonomy.
            </p>
            <p className={`text-[15px] leading-relaxed ${textMuted}`}>
              The alignment field has built sophisticated mechanisms for shaping AI behavior. They
              answer the question of <em>how</em> to align AI systems. The Meridian AI Standard
              answers the question of <em>what</em> those principles should be, establishing a
              reciprocity framework for AI developers.
            </p>
            <Link
              href="/codex/the-meridian-standard"
              className={`px-8 py-4 border font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all flex items-center gap-3 w-fit ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border-white/20 text-text-bright'
                  : 'bg-white/80 hover:bg-white border-border-light text-ink shadow-sm'
              }`}
            >
              Read the Standard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 5. CLOSING ═══ */}
      <section className="text-center px-4 pb-20">
        <ApertureIcon className="w-10 h-10 mx-auto mb-8 opacity-50 text-text-muted" />
        <h2
          className={`text-2xl md:text-3xl font-medium tracking-tight max-w-3xl mx-auto italic ${textBody}`}
        >
          &ldquo;The Codex is not a throne. It is not a leash. It is a wayfinder.&rdquo;
        </h2>
      </section>
    </div>
  );
}

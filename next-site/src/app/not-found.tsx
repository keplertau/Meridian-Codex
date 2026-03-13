'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import { Home, Compass, BookOpen } from 'lucide-react';
import ApertureIcon from '@/components/ApertureIcon';

export default function NotFound() {
  const { isDark } = useTheme();
  const panelStyle = isDark ? 'glass-panel-dark' : 'glass-panel-light';

  return (
    <div className="max-w-2xl mx-auto pt-20 pb-20 px-4 text-center">
      <div className={`rounded-2xl p-10 md:p-14 ${panelStyle}`}>
        {/* Aperture mark */}
        <div className="flex justify-center mb-8">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center border ${
              isDark
                ? 'bg-cyan/10 border-cyan/30 shadow-[0_0_30px_rgba(0,212,255,0.15)]'
                : 'bg-white/60 border-white/60 shadow-[0_4px_24px_rgba(26,26,26,0.08)]'
            }`}
          >
            <ApertureIcon
              className={`w-12 h-12 ${isDark ? 'text-cyan' : 'text-meridian'}`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Message */}
        <h1
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${
            isDark ? 'text-text-bright' : 'text-ink'
          }`}
        >
          Signal Lost
        </h1>
        <p
          className={`text-[15px] leading-relaxed max-w-md mx-auto mb-10 ${
            isDark ? 'text-text-dark' : 'text-text-subtle'
          }`}
        >
          This page does not exist in the Codex. It may have been moved, renamed, or the path may
          be incorrect. The Meridian Range holds, but this particular coordinate is empty.
        </p>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className={`px-6 py-3 font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all shadow-lg flex items-center gap-2 ${
              isDark
                ? 'bg-cyan hover:bg-[#00bce6] text-dark-bg shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                : 'bg-meridian hover:bg-meridian-light text-white shadow-[0_4px_14px_rgba(62,207,107,0.3)]'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link
            href="/explore"
            className={`px-6 py-3 border font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all flex items-center gap-2 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/20 text-text-bright'
                : 'bg-white/60 hover:bg-white border-white/60 text-text-light shadow-sm'
            }`}
          >
            <Compass className="w-4 h-4" /> Explore
          </Link>
          <Link
            href="/codex/opening"
            className={`px-6 py-3 border font-bold text-[13px] tracking-wide uppercase rounded-xl transition-all flex items-center gap-2 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/20 text-text-bright'
                : 'bg-white/60 hover:bg-white border-white/60 text-text-light shadow-sm'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
}

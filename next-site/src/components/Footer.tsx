'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';
import ApertureIcon from './ApertureIcon';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`mt-auto w-full max-w-[1900px] mx-auto border-t pt-10 pb-8 flex flex-col items-center justify-center gap-6 transition-colors ${
        isDark ? 'border-white/10 text-text-muted' : 'border-border-light text-text-subtle'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <ApertureIcon className={`w-8 h-8 ${isDark ? 'text-text-dark' : 'text-text-light'}`} strokeWidth={1.5} />
        <span className={`text-[14px] font-bold tracking-widest uppercase text-center ${isDark ? 'text-text-bright' : 'text-ink'}`}>
          The Meridian Codex
        </span>
        <span className="text-[12px] font-medium text-center">A living framework for humanity and AI</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-[11px] font-bold tracking-widest uppercase mt-2">
        {[
          { label: 'Explore', href: '/explore' },
          { label: 'Codex', href: '/codex' },
          { label: 'Toolkit', href: '/toolkit' },
          { label: 'AI Standard', href: '/codex/the-meridian-standard' },
          { label: 'Videos', href: '/transmissions' },
          { label: 'Changelog', href: '/codex/changelog' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${isDark ? 'hover:text-cyan' : 'hover:text-meridian'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className={`flex flex-col items-center mt-4 gap-2 text-[10px] font-mono tracking-widest uppercase ${isDark ? 'text-text-muted' : 'text-text-muted'}`}>
        <a
          href="https://carstengeiser.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`transition-colors ${isDark ? 'hover:text-cyan' : 'hover:text-meridian'}`}
        >
          carstengeiser.com
        </a>
        <span>Built by Carsten Geiser</span>
      </div>
    </footer>
  );
}

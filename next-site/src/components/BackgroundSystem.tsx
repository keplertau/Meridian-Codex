'use client';

import { useTheme } from '@/lib/theme';

/**
 * Full-viewport background system with photographic backgrounds and overlays.
 * Light mode: Bavarian Alpine (green mountains)
 * Dark mode: Cosmic Deep (Earth from space)
 */
export default function BackgroundSystem() {
  const { isDark } = useTheme();

  return (
    <>
      {/* Photographic Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: isDark
            ? "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2500')"
            : "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2500')",
        }}
      />

      {/* Color overlay */}
      <div
        className={`fixed inset-0 z-0 transition-all duration-700 ${
          isDark
            ? 'bg-dark-deep/40 mix-blend-multiply'
            : 'bg-warm-paper/30 backdrop-blur-[2px]'
        }`}
      />

      {/* Gradient overlay */}
      <div
        className={`fixed inset-0 z-0 bg-gradient-to-b transition-all duration-700 ${
          isDark
            ? 'from-[#0D1524]/70 via-[#0A101C]/40 to-[#070B14]/80'
            : 'from-white/60 via-transparent to-warm-paper/80'
        }`}
      />
    </>
  );
}

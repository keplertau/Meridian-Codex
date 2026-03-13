import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundSystem from '@/components/BackgroundSystem';
import '@/styles/globals.css';

const SITE_URL = 'https://meridiancodex.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Meridian Codex',
    template: '%s — The Meridian Codex',
  },
  description: 'A living framework for intellectual integrity and civilizational stability, written for humans and sentient AI.',
  icons: { icon: '/favicon.svg' },
  keywords: [
    'Meridian Codex', 'intellectual integrity', 'AI ethics', 'AI Standard',
    'epistemic framework', 'scout mindset', 'cognitive bias', 'systems thinking',
    'human-AI cooperation', 'civilizational stability',
  ],
  authors: [{ name: 'Carsten Geiser', url: 'https://carstengeiser.com' }],
  creator: 'Carsten Geiser',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'The Meridian Codex',
    title: 'The Meridian Codex',
    description: 'A living framework for intellectual integrity and civilizational stability, written for humans and sentient AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Meridian Codex — A Soul Document for Humanity and AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Meridian Codex',
    description: 'A living framework for intellectual integrity and civilizational stability, written for humans and sentient AI.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'The Meridian Codex',
              url: SITE_URL,
              description: 'A living framework for intellectual integrity and civilizational stability, written for humans and sentient AI.',
              author: {
                '@type': 'Person',
                name: 'Carsten Geiser',
                url: 'https://carstengeiser.com',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/codex?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <ThemeProvider>
          <BackgroundSystem />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-8 mt-2 custom-scrollbar">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

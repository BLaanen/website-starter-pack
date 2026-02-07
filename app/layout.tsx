import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { SanityLive } from '@/sanity/live';
import './globals.css';

// Default starter fonts -- re-brand by changing these two imports
// and keeping the CSS variable names the same
const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Website',
    default: 'Website',
  },
  description: 'A professional website powered by Next.js and Sanity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}

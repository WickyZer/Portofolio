import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/space-grotesk';
import './globals.css';
import './premium.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmadfadhilnaufal.my.id'),
  title: { default: 'Ahmad Fadhil Naufal — Student. Developer. Creative.', template: '%s | Ahmad Fadhil Naufal' },
  description: 'Portofolio Ahmad Fadhil Naufal, mahasiswa Teknik Mesin, web developer, dan creative. Jelajahi proyek engineering, website, dan perjalanan belajar saya.',
  alternates: { canonical: '/' },
  twitter: { card: 'summary_large_image', title: 'Ahmad Fadhil Naufal', description: 'Teknik Mesin · Web Developer · Creative', images: ['/opengraph-image'] },
  openGraph: { title: 'Ahmad Fadhil Naufal', description: 'Learning, building, and creating meaningful digital experiences.', type: 'website', locale: 'id_ID', alternateLocale: ['en_US'], url: '/', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Ahmad Fadhil Naufal — Portfolio' }] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#0b0815', colorScheme: 'dark light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" suppressHydrationWarning><body>{children}</body></html>;
}

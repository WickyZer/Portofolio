import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/space-grotesk';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://portofolio-fadhil-livid.vercel.app'),
  title: { default: 'Ahmad Fadhil Naufal — Student. Developer. Creative.', template: '%s | Ahmad Fadhil Naufal' },
  description: 'Ruang digital Ahmad Fadhil Naufal. Jelajahi proyek website, eksplorasi kreatif, dan perjalanan belajar saya sebagai mahasiswa.',
  openGraph: { title: 'Ahmad Fadhil Naufal', description: 'Learning, building, and creating meaningful digital experiences.', type: 'website', locale: 'id_ID', images: [{ url: '/api/media/profile', width: 800, height: 1067, alt: 'Ahmad Fadhil Naufal' }] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#0b0815', colorScheme: 'dark light' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" suppressHydrationWarning><body>{children}</body></html>;
}

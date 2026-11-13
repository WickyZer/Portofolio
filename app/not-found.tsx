import Link from 'next/link';
export default function NotFound() { return <main className="not-found"><span className="eyebrow">404 / LOST IN SPACE</span><h1>Sepertinya kamu<br/>sedikit tersesat.</h1><p>Mari kembali ke ruang digital saya.</p><Link href="/" className="button primary">Kembali ke beranda ↗</Link></main>; }

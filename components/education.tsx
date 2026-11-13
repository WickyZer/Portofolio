'use client';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import type { Education } from '@/lib/data';
import { safeExternalUrl } from '@/lib/supabase';
import { RasterLogo } from './tool-logo';
export default function EducationSection({items}:{items:Education[]}){
 const visible=items.filter(e=>e.school.trim());
 return <section id="education" className="education-section shell section-space"><div className="section-kicker"><span className="section-dot"/> MY EDUCATION <span className="section-number">SD — SMK & BEYOND</span></div><div className="education-heading"><h2>My Education<span className="accent">.</span></h2><p>Setiap langkah belajar membentuk perjalanan saya.</p></div>{visible.length?<div className="education-grid">{visible.map((e,i)=><motion.article className="education-card glass" key={e.id} initial={{y:16}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.6,delay:i*.06}}><div className="education-logo"><RasterLogo src={safeExternalUrl(e.logo_url)||'/logos/education.png'} alt={'Logo '+e.school}/></div><div className="education-content"><span className="eyebrow">{e.level}{(e.startYear||e.endYear)&&' · '+[e.startYear,e.endYear].filter(Boolean).join(' — ')}</span><h3>{e.school}</h3>{e.major&&<span className="education-major">{e.major}</span>}{e.description&&<p>{e.description}</p>}</div></motion.article>)}</div>:<div className="education-empty glass"><div className="education-empty-icon"><GraduationCap size={34}/></div><div><h3>Belajar, bertumbuh, melangkah.</h3><p>Riwayat pendidikan akan ditampilkan di sini.</p></div><div className="education-levels"><span>SD</span><i/><span>SMP</span><i/><span>SMK</span></div></div>}</section>;
}

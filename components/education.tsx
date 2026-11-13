'use client';

import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import type { Education } from '@/lib/data';
import { safeExternalUrl } from '@/lib/supabase';
import { RasterLogo } from './tool-logo';

export default function EducationSection({items}:{items:Education[]}) {
  const visible=items.filter(e=>e.school.trim()||safeExternalUrl(e.logo_url));
  return <section id="education" className="education-section shell section-space">
    <div className="section-kicker"><span className="section-dot"/> MY EDUCATION <span className="section-number">SD — SMK & BEYOND</span></div>
    <div className="education-heading"><h2>Pendidikan<span className="accent">.</span></h2><p>Setiap langkah belajar membentuk perjalanan saya.</p></div>
    {visible.length?<div className="education-list glass">{visible.map((e,i)=>{
      const years=[e.startYear,e.endYear].filter(Boolean).join(' – ');
      return <motion.article className="education-entry" key={e.id} initial={{y:12}} whileInView={{y:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.05}}>
        <div className="education-entry-logo"><RasterLogo src={safeExternalUrl(e.logo_url)||'/logos/education.png'} alt={e.school?'Logo '+e.school:'Logo pendidikan '+e.level}/></div>
        <div className="education-entry-content">
          <h3>{e.school||'Pendidikan '+e.level}</h3>
          {years&&<p className="education-years">{years}</p>}
          {e.major&&<p>{e.major}</p>}
          {e.description&&<p className="education-description">{e.description}</p>}
        </div>
      </motion.article>;
    })}</div>:<div className="education-empty glass"><div className="education-empty-icon"><GraduationCap size={34}/></div><div><h3>Belajar, bertumbuh, melangkah.</h3><p>Riwayat pendidikan akan ditampilkan di sini.</p></div><div className="education-levels"><span>SD</span><i/><span>SMP</span><i/><span>SMK</span></div></div>}
  </section>;
}

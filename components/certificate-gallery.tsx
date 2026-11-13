'use client';

import {useRef,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,ExternalLink} from 'lucide-react';
import {useReducedMotion} from 'motion/react';
import type {Certificate} from '@/lib/data';
import {safeExternalUrl} from '@/lib/supabase';

export default function CertificateGallery({items,onSelect}:{items:Certificate[];onSelect:(item:Certificate)=>void}){
 const track=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const reduced=useReducedMotion();
 function go(index:number){const el=track.current;if(!el)return;const next=Math.max(0,Math.min(items.length-1,index));const first=el.children[0] as HTMLElement;const card=el.children[next] as HTMLElement;if(card)el.scrollTo({left:card.offsetLeft-first.offsetLeft,behavior:reduced||el.closest('.motion-paused')?'instant':'smooth'});}
 function sync(){const el=track.current;if(!el)return;const first=el.children[0] as HTMLElement;let nearest=0,distance=Infinity;Array.from(el.children).forEach((child,i)=>{const d=Math.abs((child as HTMLElement).offsetLeft-first.offsetLeft-el.scrollLeft);if(d<distance){distance=d;nearest=i;}});setActive(nearest);}
 return <div className="certificate-gallery" role="region" aria-label="Galeri sertifikat" aria-roledescription="carousel">
  <div className="certificate-grid" ref={track} onScroll={sync}>{items.map((c,i)=><button key={c.id} className="certificate-card glass" aria-label={'Lihat sertifikat '+c.title} onClick={()=>onSelect(c)}><div className="certificate-image"><img src={safeExternalUrl(c.image_url)||''} alt={'Sertifikat '+c.title} loading="lazy"/><span><ExternalLink size={18}/></span><b className="certificate-position">{String(i+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</b></div><div className="certificate-copy"><span className="eyebrow">{c.issuer}{c.issued_on?' · '+new Date(c.issued_on).toLocaleDateString('id-ID',{year:'numeric',month:'short'}):''}</span><h3>{c.title}</h3><p>{c.description}</p><span className="text-button">Lihat sertifikat <ArrowUpRight size={17}/></span></div></button>)}</div>
  {items.length>1&&<div className="certificate-navigation"><button type="button" className="icon-button" aria-label="Sertifikat sebelumnya" disabled={active===0} onClick={()=>go(active-1)}><ChevronLeft size={19}/></button><div className="certificate-pagination" aria-label="Pilih sertifikat">{items.map((c,i)=><button key={c.id} type="button" aria-label={'Tampilkan sertifikat '+(i+1)} aria-current={i===active?'true':undefined} className={i===active?'active':''} onClick={()=>go(i)}><span/></button>)}</div><button type="button" className="icon-button" aria-label="Sertifikat berikutnya" disabled={active===items.length-1} onClick={()=>go(active+1)}><ChevronRight size={19}/></button></div>}
  <span className="sr-only" aria-live="polite">Sertifikat {active+1} dari {items.length}</span>
 </div>;
}

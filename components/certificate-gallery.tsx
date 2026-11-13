'use client';

import {useRef,useState,type CSSProperties} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight} from 'lucide-react';
import type {Certificate} from '@/lib/data';
import {safeExternalUrl} from '@/lib/supabase';

export default function CertificateGallery({items,onSelect}:{items:Certificate[];onSelect:(item:Certificate)=>void}){
 const [active,setActive]=useState(0);
 const start=useRef<number|null>(null),swiped=useRef(false);
 const index=Math.min(active,items.length-1),current=items[index];
 if(!current)return null;
 function go(next:number){setActive((next+items.length)%items.length);}
 function offset(i:number){let d=i-index;if(d>items.length/2)d-=items.length;if(d< -items.length/2)d+=items.length;return d;}
 return <div className="certificate-gallery certificate-fan" role="region" aria-label="Galeri sertifikat" aria-roledescription="carousel" onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}}}>
  <div className="certificate-fan-stage" onPointerDown={e=>{start.current=e.clientX;swiped.current=false;}} onPointerUp={e=>{if(start.current!==null&&Math.abs(e.clientX-start.current)>40){swiped.current=true;go(index+(e.clientX<start.current?1:-1));}start.current=null;}} onPointerCancel={()=>{start.current=null;}} onClickCapture={e=>{if(swiped.current){e.preventDefault();e.stopPropagation();swiped.current=false;}}}>
   <div className="certificate-fan-aura" aria-hidden="true"/>
   {items.map((c,i)=>{const d=offset(i),visible=Math.abs(d)<=2;return <button type="button" key={c.id} className={'certificate-fan-card '+(i===index?'is-active':'')} style={{'--fan-offset':d,'--fan-depth':Math.abs(d),zIndex:10-Math.abs(d)} as CSSProperties} aria-hidden={!visible} tabIndex={visible?0:-1} aria-label={(i===index?'Buka sertifikat ':'Pilih sertifikat ')+c.title} aria-current={i===index?'true':undefined} onClick={()=>i===index?onSelect(c):go(i)}>
    <span className="fan-card-top"><span className="eyebrow">{c.issuer}</span><span className="fan-card-number">{String(i+1).padStart(2,'0')}</span></span>
    <h3>{c.title}</h3>
    <div className="fan-card-image"><img src={safeExternalUrl(c.image_url)||''} alt={'Sertifikat '+c.title} loading="lazy"/></div>
    <span className="fan-card-bottom">{i===index?'Lihat sertifikat':'Pilih sertifikat'}<ArrowUpRight size={16}/></span>
   </button>;})}
  </div>
  <div className="certificate-fan-detail"><span className="eyebrow">{current.issuer}{current.issued_on?' · '+new Date(current.issued_on).toLocaleDateString('id-ID',{year:'numeric',month:'short'}):''}</span><h3>{current.title}</h3>{current.description&&<p>{current.description}</p>}<button className="text-button" onClick={()=>onSelect(current)}>Lihat sertifikat <ArrowUpRight size={17}/></button></div>
  {items.length>1&&<div className="certificate-navigation"><button type="button" className="icon-button" aria-label="Sertifikat sebelumnya" onClick={()=>go(index-1)}><ChevronLeft size={19}/></button><div className="certificate-pagination" aria-label="Pilih sertifikat">{items.map((c,i)=><button key={c.id} type="button" aria-label={'Tampilkan sertifikat '+(i+1)} aria-current={i===index?'true':undefined} className={i===index?'active':''} onClick={()=>go(i)}><span/></button>)}</div><button type="button" className="icon-button" aria-label="Sertifikat berikutnya" onClick={()=>go(index+1)}><ChevronRight size={19}/></button></div>}
  <span className="sr-only" aria-live="polite">Sertifikat {index+1} dari {items.length}</span>
 </div>;
}

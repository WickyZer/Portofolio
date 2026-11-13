'use client';

import type { Settings } from '@/lib/data';
import { safeExternalUrl } from '@/lib/supabase';
import { RasterLogo } from './tool-logo';

export default function ContactLinks({settings}:{settings:Settings}) {
  const linkedIn=safeExternalUrl(settings.linkedin);
  const github=safeExternalUrl(settings.github);
  const email=settings.contactEmail.trim();
  const validEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const links=[
    {label:'LinkedIn',url:linkedIn,logo:'linkedin',external:true},
    {label:'Gmail',url:validEmail?'mailto:'+encodeURIComponent(email):null,logo:'gmail',external:false},
    {label:'GitHub',url:github,logo:'github',external:true},
  ];
  return <div className="contact-brand-links" aria-label="Media sosial dan email">{links.map(link=>link.url&&<a key={link.label} className={'contact-brand-link brand-'+link.logo} href={link.url} aria-label={link.label==='Gmail'?'Gmail: '+email:link.label} title={link.label} target={link.external?'_blank':undefined} rel={link.external?'noreferrer':undefined}><RasterLogo src={'/logos/'+link.logo+'.png'} alt=""/></a>)}</div>;
}

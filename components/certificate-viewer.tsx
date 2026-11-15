'use client';
import {useState} from 'react';
import {safeExternalUrl} from '@/lib/supabase';
import type {Certificate} from '@/lib/data';
import {useLanguage} from './language-context';
export default function CertificateViewer({item}:{item:Certificate}){const [zoom,setZoom]=useState(1);const {lang}=useLanguage();return <><div className="zoom-toolbar"><button onClick={()=>setZoom(z=>Math.max(1,z-.25))} disabled={zoom===1} aria-label="Zoom out">−</button><output>{Math.round(zoom*100)}%</output><button onClick={()=>setZoom(z=>Math.min(3,z+.25))} disabled={zoom===3} aria-label="Zoom in">+</button><button onClick={()=>setZoom(1)}>{lang==='id'?'Atur ulang':'Reset'}</button><a href={safeExternalUrl(item.image_url)||'#'} target="_blank" rel="noreferrer">{lang==='id'?'Buka gambar':'Open image'} ↗</a></div><div className="certificate-zoom"><img src={safeExternalUrl(item.image_url)||''} alt={item.title} style={{width:`${zoom*100}%`,maxWidth:'none'}}/></div></>}

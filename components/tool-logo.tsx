'use client';
import type { Skill } from '@/lib/data';
import { safeExternalUrl } from '@/lib/supabase';
export const logoPresets=[['Next.js','nextjs'],['React','react'],['TypeScript','typescript'],['Tailwind','tailwind'],['Supabase','supabase'],['Three.js','threejs'],['Motion','motion'],['GitHub','github'],['Vercel','vercel'],['Figma','figma'],['Python','python'],['Node.js','nodejs'],['Canva','canva'],['Git','git']] as const;
export function resolveLogo(tool:Pick<Skill,'name'|'logo_url'>){
 if(tool.logo_url?.startsWith('/logos/')&&/^\/logos\/[a-z0-9-]+\.png$/.test(tool.logo_url))return tool.logo_url;
 const remote=safeExternalUrl(tool.logo_url);if(remote&&!new URL(remote).pathname.toLowerCase().endsWith('.svg'))return remote;
 const match=logoPresets.find(([name])=>name.toLowerCase()===tool.name.toLowerCase());return '/logos/'+(match?.[1]||'tool-placeholder')+'.png';
}
export function RasterLogo({src,alt,className=''}:{src:string;alt:string;className?:string}){return <img src={src} alt={alt} width={64} height={64} className={className} loading="lazy" onError={e=>{if(!e.currentTarget.src.endsWith('/logos/tool-placeholder.png'))e.currentTarget.src='/logos/tool-placeholder.png';}}/>;}
export default function ToolLogo({tool}:{tool:Skill}){return <span className={'tool-logo '+(['Next.js','GitHub','Vercel','Three.js'].includes(tool.name)?'ink-logo':'')}><RasterLogo src={resolveLogo(tool)} alt={'Logo '+tool.name}/></span>;}

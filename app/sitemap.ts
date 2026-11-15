import type {MetadataRoute} from 'next';
import {publicContent} from '@/lib/public-content';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const projects=await publicContent<{id:string}[]>('portfolio_projects','select=id&published=eq.true');return [{url:'https://ahmadfadhilnaufal.my.id',changeFrequency:'monthly',priority:1},...(projects||[]).map(p=>({url:'https://ahmadfadhilnaufal.my.id/projects/'+p.id,changeFrequency:'monthly' as const,priority:.8}))];}

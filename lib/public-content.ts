import 'server-only';
import type {Project,Settings} from './data';
export async function publicContent<T>(table:string,query:string):Promise<T|null>{const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;if(!url||!key)return null;try{const r=await fetch(url+'/rest/v1/'+table+'?'+query,{headers:{apikey:key},next:{revalidate:60},signal:AbortSignal.timeout(10000)});if(!r.ok)return null;return await r.json() as T;}catch{return null;}}
export async function getPublishedProject(id:string){const rows=await publicContent<Project[]>('portfolio_projects','select=*&published=eq.true&id=eq.'+encodeURIComponent(id));return rows?.[0]||null;}
export async function getPublicSettings(){const rows=await publicContent<{config:Settings}[]>('portfolio_settings','select=config&id=eq.1');return rows?.[0]?.config||null;}

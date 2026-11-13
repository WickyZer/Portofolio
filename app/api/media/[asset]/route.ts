import { createClient } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
export const dynamic='force-dynamic';
// Public website media is served independently of the public source repository.
export async function GET(_request:NextRequest,{params}:{params:Promise<{asset:string}>}) {
  const {asset}=await params;
  if(!['hero','profile'].includes(asset))return new Response('Not found',{status:404});
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return new Response('Media unavailable',{status:503});
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await db.from('portfolio_media').select('data_base64,content_type').eq('id',asset).maybeSingle();
  if(error||!data)return new Response('Not found',{status:404});
  return new Response(Buffer.from(data.data_base64,'base64'),{headers:{'Content-Type':data.content_type,'Cache-Control':'public, max-age=3600, s-maxage=86400','X-Content-Type-Options':'nosniff'}});
}

import {draftMode} from 'next/headers';
import {getEntries} from '../../lib/content';
import {absoluteImage,siteUrl} from '../../lib/seo';
import {renderJournalRss} from '../../lib/journal-rss';

export const dynamic='force-dynamic';
export async function GET(){
 // Never expose a preview-token CMS response through a public feed.
 if(process.env.SITE_ENV!=='production'||(await draftMode()).isEnabled){
  return new Response('Not found',{status:404,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'}});
 }
 return new Response(renderJournalRss(await getEntries(),siteUrl,absoluteImage),{
  headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'no-store'},
 });
}

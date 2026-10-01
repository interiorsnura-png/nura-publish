import type {MetadataRoute} from 'next';
import {getEntries} from '../lib/content';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{if(process.env.SITE_ENV!=='production')return [];const site=process.env.NEXT_PUBLIC_SITE_URL;if(!site)throw Error('Canonical site URL missing');const paths=[...new Set(['/','/projects','/services','/journal','/inspiration',...(await getEntries()).map(x=>x.path)])];return paths.map(path=>({url:site.replace(/\/$/,'')+path}));}

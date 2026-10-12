import {load} from 'cheerio';

export const googleSite='https://www.nura-interiors.com/';
export const googleSitemap=googleSite+'sitemap.xml';

export function sitemapApiUrl(siteUrl=googleSite,sitemapUrl=googleSitemap){
 if(siteUrl!==googleSite||sitemapUrl!==googleSitemap)throw Error('Google notification target must be the canonical NURA property and sitemap');
 return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
}

export async function submitGoogleSitemap({accessToken,fetchImpl=fetch,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
 if(!accessToken)throw Error('Google API access token missing');
 const sitemapResponse=await fetchImpl(googleSitemap,{redirect:'manual',signal:AbortSignal.timeout(30000)});
 if(!sitemapResponse.ok)throw Error(`Production sitemap returned HTTP ${sitemapResponse.status}`);
 const $=load(await sitemapResponse.text(),{xmlMode:true});
 const urls=$('urlset > url > loc').map((_,el)=>$(el).text()).get();
 if(!urls.length||urls.length>10000)throw Error('Production sitemap contains no valid page inventory');
 for(const value of urls){
  const url=new URL(value);
  if(url.origin!==new URL(googleSite).origin||url.search||url.hash||url.username||url.password)throw Error('Production sitemap contains a noncanonical URL');
 }
 for(let attempt=0;attempt<3;attempt++){
  const response=await fetchImpl(sitemapApiUrl(),{method:'PUT',redirect:'error',headers:{Authorization:`Bearer ${accessToken}`},signal:AbortSignal.timeout(30000)});
  await response.body?.cancel();
  if([200,204].includes(response.status))return {engine:'google',method:'search-console-sitemap-api',status:'SUBMITTED',httpStatus:response.status,sitemapUrl:googleSitemap,property:googleSite,pageCount:urls.length,submittedAt:new Date().toISOString(),indexing:'UNVERIFIED'};
  if(attempt<2&&(response.status===429||response.status>=500)){await sleep(1000*(attempt+1));continue;}
  throw Error(`Google sitemap API rejected notification: HTTP ${response.status}`);
 }
}

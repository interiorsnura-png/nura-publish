import test from 'node:test';
import assert from 'node:assert/strict';
import {submitGoogleSitemap,sitemapApiUrl,googleSite,googleSitemap} from '../lib/google-sitemap.mjs';

const xml='<urlset><url><loc>https://www.nura-interiors.com/</loc></url><url><loc>https://www.nura-interiors.com/post/example</loc></url></urlset>';

test('Google sitemap notification uses the authorised sitemap endpoint, not the restricted Indexing API',async()=>{
 const calls=[];
 const fetchImpl=async(url,options)=>{calls.push({url,options});return calls.length===1?new Response(xml,{status:200}):new Response(null,{status:204});};
 const result=await submitGoogleSitemap({accessToken:'test-only-token',fetchImpl});
 assert.equal(calls[0].url,googleSitemap);
 assert.equal(calls[1].url,`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(googleSite)}/sitemaps/${encodeURIComponent(googleSitemap)}`);
 assert.equal(calls[1].options.method,'PUT');
 assert.equal(calls[1].options.body,undefined);
 assert.equal(calls[1].options.headers.Authorization,'Bearer test-only-token');
 assert.equal(result.status,'SUBMITTED');assert.equal(result.indexing,'UNVERIFIED');assert.equal(result.pageCount,2);
 assert.ok(!JSON.stringify(result).includes('test-only-token'));
 assert.throws(()=>sitemapApiUrl('https://other.test/'),/canonical NURA/);
});

test('Google notifications reject missing access, invalid sitemap and denied permission without claiming success',async()=>{
 let calls=0;
 const fetchImpl=async()=>{calls++;return new Response(xml,{status:200});};
 await assert.rejects(()=>submitGoogleSitemap({fetchImpl}),/token missing/);assert.equal(calls,0);
 await assert.rejects(()=>submitGoogleSitemap({accessToken:'test',fetchImpl:async()=>new Response('<html>Unavailable</html>')}),/inventory/);
 await assert.rejects(()=>submitGoogleSitemap({accessToken:'test',fetchImpl:async()=>new Response(xml.replaceAll('www.nura-interiors.com','other.test'))}),/noncanonical/);
 let attempt=0;
 await assert.rejects(()=>submitGoogleSitemap({accessToken:'test',fetchImpl:async()=>++attempt===1?new Response(xml):new Response(null,{status:403})}),/403/);
 assert.equal(attempt,2);
});

test('Google sitemap notification retries transient failures and stops after acceptance',async()=>{
 const statuses=[503,429,204];let calls=0;const delays=[];
 const result=await submitGoogleSitemap({accessToken:'test',sleep:async ms=>delays.push(ms),fetchImpl:async()=>++calls===1?new Response(xml):new Response(null,{status:statuses.shift()})});
 assert.equal(calls,4);assert.deepEqual(delays,[1000,2000]);assert.equal(result.httpStatus,204);
});

import {mkdir,writeFile,appendFile} from 'node:fs/promises';
import {submitGoogleSitemap,googleSite,googleSitemap} from '../lib/google-sitemap.mjs';

await mkdir('.indexnow',{recursive:true});
let report;
if(process.argv.includes('--check-config')){
 const ready=!!(process.env.GOOGLE_WIF_PROVIDER&&process.env.GOOGLE_SEARCH_SERVICE_ACCOUNT);
 report={engine:'google',status:ready?'CONFIGURED':'NOT_CONFIGURED',property:googleSite,sitemapUrl:googleSitemap,requestMade:false,indexing:'UNVERIFIED'};
 if(!ready)console.warn('::warning::Google sitemap API is NOT_CONFIGURED; no Google notification was made.');
 if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`ready=${ready}\n`);
}else{
 try{report=await submitGoogleSitemap({accessToken:process.env.GOOGLE_ACCESS_TOKEN});}
 catch(error){report={engine:'google',status:'FAILED',error:error.message,indexing:'UNVERIFIED'};process.exitCode=1;}
}
await writeFile('.indexnow/google-report.json',JSON.stringify(report,null,2)+'\n');
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,`## Google sitemap notification\n\nStatus: **${report.status}**. Sitemap submission is not an indexing request or proof of indexing.\n`);
console.log(JSON.stringify(report,null,2));

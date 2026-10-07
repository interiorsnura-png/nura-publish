import { readFileSync } from 'node:fs';
const redirects = JSON.parse(readFileSync(new URL('./migration/redirects-approved.json', import.meta.url), 'utf8'));
const siteEnv = process.env.SITE_ENV || (process.env.VERCEL_ENV === 'preview' ? 'staging' : 'production');
export default {
  poweredByHeader: false,
  env: {SITE_ENV: siteEnv, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nura-interiors.com'},
  async rewrites(){return {beforeFiles:[{source:'/projects/catalogue',destination:'/portfolio/index.html'}],afterFiles:[{source:'/_functions/enquiry',destination:'/api/enquiry'}],fallback:[]};},
  images: {remotePatterns:[{protocol:'https',hostname:'static.wixstatic.com',pathname:'/media/**'},{protocol:'https',hostname:'a.storyblok.com',pathname:'/f/**'}]},
  async redirects(){return [{source:"/index.html",destination:"/",permanent:true},...redirects];},
  async headers(){return [{source:'/:path*',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},...(siteEnv==='production'?[]:[{key:'X-Robots-Tag',value:'noindex, nofollow'}])]}];}
};

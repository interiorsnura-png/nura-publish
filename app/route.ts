import publishedHome from '../lib/published-home.json';
import {homeSchema} from '../lib/home-schema';
import {improveHomeSeo} from '../lib/home-seo';
export const dynamic='force-static';
export function GET(){
 const schema=JSON.stringify(homeSchema).replace(/</g,'\\u003c');
 let html=improveHomeSeo(publishedHome.html).replace('</head>',`<script type="application/ld+json">${schema}</script></head>`);
 html=html.replace('src="nura-home.js"','src="/nura-home-measured.js"');
 html=html.replace('</head>','<link rel="stylesheet" href="/nura-analytics.css"/></head>').replace('</body>','<script src="/nura-analytics.js" defer></script></body>');
 html=html.replace('</head>','<link rel="stylesheet" href="/nura-lead.css"/></head>').replace('</body>','<script src="/nura-lead.js" defer></script></body>');
 if(process.env.SITE_ENV!=='production')html=html.replace('index, follow, max-image-preview:large','noindex, nofollow');
 return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}});
}

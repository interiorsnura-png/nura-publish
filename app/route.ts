import publishedHome from '../lib/published-home.json';
export const dynamic='force-static';
export function GET(){return new Response(publishedHome.html,{headers:{'Content-Type':'text/html; charset=utf-8'}});}

import Script from 'next/script';
import type {Metadata} from 'next';
import {footerHtml} from '../lib/footer';
import SiteHeader from '../components/SiteHeader';
import JsonLd from '../components/JsonLd';
import {organization} from '../lib/seo';
import './globals.css';
import './inner.css';
import './fonts.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'Nura: Bespoke kitchens & joinery',template:'%s: Nura'},description:'Bespoke kitchens and joinery for considered homes.',openGraph:{siteName:'Nura Interiors',type:'website',locale:'en_GB',images:['/assets/selected/nura-hero-shot.jpeg']},twitter:{card:'summary_large_image'},robots:process.env.SITE_ENV==='production'?{index:true,follow:true}:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB"><head><link rel="stylesheet" href="/nura-footer.css"/><link rel="stylesheet" href="/nura-analytics.css"/><link rel="stylesheet" href="/nura-share.css"/><link rel="stylesheet" href="/nura-lead.css"/></head><body className="inner-page"><a className="skip-link" href="#main">Skip to content</a><JsonLd data={organization}/><SiteHeader/>{children}<div dangerouslySetInnerHTML={{__html:footerHtml}}/><Script src="/nura-analytics.js" strategy="afterInteractive"/><Script src="/favicon-glow.js" strategy="afterInteractive"/><Script src="/nura-share.js" strategy="afterInteractive"/><Script src="/nura-related.js" strategy="afterInteractive"/><Script src="/nura-lead.js" strategy="afterInteractive"/></body></html>;}

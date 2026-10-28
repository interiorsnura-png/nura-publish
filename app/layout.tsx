import Script from 'next/script';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {footerHtml} from '../lib/footer';
import {enhanceFooter} from '../lib/guarantee-preview.mjs';
import SiteHeader from '../components/SiteHeader';
import JsonLd from '../components/JsonLd';
import {organization} from '../lib/seo';
import './globals.css';
import './inner.css';
import './fonts.css';
import '../public/nura-footer.css';
import '../public/nura-analytics.css';
import '../public/nura-share.css';
import '../public/nura-lead.css';
import '../public/nura-header.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'Nura: Bespoke kitchens & joinery',template:'%s: Nura'},description:'Bespoke kitchens and joinery for considered homes.',openGraph:{siteName:'Nura Interiors',type:'website',locale:'en_GB',images:['/assets/selected/nura-hero-shot.jpeg']},twitter:{card:'summary_large_image'},alternates:process.env.SITE_ENV==='production'?{types:{'application/rss+xml':'https://www.nura-interiors.com/rss.xml'}}:undefined,robots:process.env.SITE_ENV==='production'?{index:true,follow:true}:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB"><head><link rel="preload" href="/assets/fonts/dm-web-1.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/assets/fonts/nura-lora-playfair-21.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/assets/fonts/nura-lora-playfair-17.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><Script src="/nura-enquiry.js" strategy="beforeInteractive"/></head><body className="inner-page"><a className="skip-link" href="#main">Skip to content</a><JsonLd data={organization}/><SiteHeader/>{children}<div dangerouslySetInnerHTML={{__html:enhanceFooter(footerHtml)}}/><Script src="/nura-analytics.js" strategy="afterInteractive"/><Script src="/nura-share.js" strategy="afterInteractive"/><Script src="/nura-related.js" strategy="afterInteractive"/><Script src="/nura-lead.js" strategy="afterInteractive"/><Script src="/nura-header.js" strategy="afterInteractive"/>{process.env.NURA_LOCAL_VERIFY !== '1' && <SpeedInsights/>}</body></html>;}

import type {Metadata} from 'next';
import Image from 'next/image';
import SiteHeader from '../components/SiteHeader';
import JsonLd from '../components/JsonLd';
import {organization} from '../lib/seo';
import './globals.css';
import './inner.css';
import './fonts.css';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000'),title:{default:'Nura — Bespoke kitchens & joinery',template:'%s — Nura'},description:'Bespoke kitchens and joinery for considered homes.',openGraph:{siteName:'Nura Interiors',type:'website',locale:'en_GB',images:['/assets/selected/nura-hero-shot.jpeg']},twitter:{card:'summary_large_image'},robots:process.env.SITE_ENV==='production'?{index:true,follow:true}:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body className="inner-page"><a className="skip-link" href="#main">Skip to content</a><JsonLd data={organization}/><SiteHeader/>{children}<footer className="site-footer"><div className="footer-top"><Image src="/assets/nura-wordmark.svg" alt="Nura" width={112} height={42} unoptimized/><p>Bespoke kitchens and joinery<br/>for considered homes.</p><a className="text-link text-link-light" href="/">Back to home <span>↗</span></a></div><div className="footer-bottom"><div><small>Studios</small><p><a href="/london">London</a> · <a href="/dubai">Dubai</a></p></div><div><small>Write to us</small><p><a href="mailto:studio@nura-interiors.com">studio@nura-interiors.com</a></p></div><div><small>For professionals</small><p><a href="/for-professionals">Trade enquiries</a></p></div><p className="copyright">© 2026 Nura Interiors</p></div><nav className="inner-footer-nav" aria-label="Further information"><a href="/about">Nura</a><a href="/journal">Journal</a><a href="/inspiration">Inspiration</a><a href="/consultation">Consultation</a></nav></footer></body></html>;}

import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getNura50Draft,getNura50Drafts} from '../../../../lib/nura-50-drafts';
import {Hero,Cta} from '../../../../components/Editorial';
import ArticleView from '../../../../components/ArticleView';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'NURA article review',robots:{index:false,follow:false}};
export default async function Nura50Article({params}:{params:Promise<{slug:string}>}){if(process.env.NODE_ENV==='production')notFound();const {slug}=await params;const entry=getNura50Draft(slug);if(!entry)notFound();const entries=getNura50Drafts();return <main id="main" className="article-page"><div className="local-review-banner">Local preview, needs review. Planned dates, author and image rights are not publication evidence.</div><Hero title={entry.content.title} kicker="Nura / Local article review" asset={entry.content.hero} summary={entry.content.seo_description}/><ArticleView content={entry.content} related={entries.filter(item=>item.path!==entry.path).slice(0,2)} path={entry.path} entries={entries}/><Cta/></main>}

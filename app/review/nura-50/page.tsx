import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getNura50Drafts} from '../../../lib/nura-50-drafts';
import {Hero} from '../../../components/Editorial';
import Nura50Cards from '../../../components/Nura50Cards';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'NURA 50 article review',robots:{index:false,follow:false}};
export default function Nura50Review(){if(process.env.NODE_ENV==='production')notFound();const entries=getNura50Drafts();return <main id="main"><Hero title="50 article drafts" kicker="Nura / Local review" summary="Review-only local preview. Planned dates, empty authors and image rights statuses remain unverified."/><section className="collection section-pad"><div className="section-mark">NURA article handoff · {entries.length} drafts</div><Nura50Cards entries={entries}/></section></main>}

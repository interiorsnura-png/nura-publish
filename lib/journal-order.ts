import type {Entry} from './content';

export function newestJournalFirst(entries:Entry[]):Entry[]{
  const timestamp=(entry:Entry)=>{
    if(['/post/single-or-double-kitchen-oven','/post/dining-bench-cushions','/post/ducted-vs-recirculating-cooker-hood'].includes(entry.path) && entry.content.publication_event_pending===true && entry.content.published_date===undefined && entry.content.modified_date===undefined)return Number.POSITIVE_INFINITY;
    const date=Date.parse(entry.content.published_date||'');
    return Number.isFinite(date)?date:Number.NEGATIVE_INFINITY;
  };
  return [...entries].sort((a,b)=>{
    const left=timestamp(a),right=timestamp(b);
    return left===right?0:right-left;
  });
}

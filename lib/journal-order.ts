import type {Entry} from './content';

export function newestJournalFirst(entries:Entry[]):Entry[]{
  const timestamp=(entry:Entry)=>{
    if(entry.path==='/post/single-or-double-kitchen-oven' && entry.content.publication_event_pending===true && !entry.content.published_date && !entry.content.modified_date)return Number.POSITIVE_INFINITY;
    const date=Date.parse(entry.content.published_date||'');
    return Number.isFinite(date)?date:Number.NEGATIVE_INFINITY;
  };
  return [...entries].sort((a,b)=>{
    const left=timestamp(a),right=timestamp(b);
    return left===right?0:right-left;
  });
}

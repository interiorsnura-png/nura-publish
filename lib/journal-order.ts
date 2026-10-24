import type {Entry} from './content';

export function newestJournalFirst(entries:Entry[]):Entry[]{
  const timestamp=(entry:Entry)=>{
    const date=Date.parse(entry.content.published_date||'');
    return Number.isFinite(date)?date:Number.NEGATIVE_INFINITY;
  };
  return [...entries].sort((a,b)=>{
    const left=timestamp(a),right=timestamp(b);
    return left===right?0:right-left;
  });
}

import type {Entry} from './content';

export type ProjectImageType='photography'|'rendering'|'unknown';

// Only projects with independently confirmed completed-project photography are listed here.
export const projectImageTypes:Record<string,ProjectImageType>={
 '/kitchens/elm-park-road':'photography',
 '/kitchens/tansley-farm':'photography',
 '/joinery/westover-road':'photography',
};

const rank=(entry:Entry):number=>{const type=projectImageTypes[entry.path]||'unknown';return type==='photography'?0:type==='rendering'?1:2;};
export function orderProjects(entries:Entry[]):Entry[]{
 return [...entries].sort((a,b)=>rank(a)-rank(b)||(b.content.source_rank||0)-(a.content.source_rank||0)||a.path.localeCompare(b.path));
}

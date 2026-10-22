import fs from 'node:fs/promises';
import path from 'node:path';
import type {Entry} from './content';
import type {ArticleNode} from '../components/RichArticle';

const text=(value:string):ArticleNode=>({type:'text',text:value});
const paragraph=(value:string):ArticleNode=>({type:'paragraph',children:[text(value)]});
const linkedParagraph=(before:string,label:string,link:string,after=''):ArticleNode=>({type:'paragraph',children:[text(before),{type:'text',text:label,link},text(after)]});
const heading=(value:string,level=2):ArticleNode=>({type:'heading',level,children:[text(value)]});

export const mediaWallPreviewPath='/post/bespoke-media-walls-london';

function markdownNodes(markdown:string):ArticleNode[]{
  return markdown.split(/\n\s*\n/).map(block=>{
    const trimmed=block.trim();
    if(!trimmed)return null;
    if(/^# /.test(trimmed))return null;
    if(/^#{2,3} /.test(trimmed))return heading(trimmed.replace(/^#{2,3} /,''),trimmed.startsWith('###')?3:2);
    if(trimmed.startsWith('|')){const rows=trimmed.split(/\n/).filter(line=>line.trim().startsWith('|')&&!/^\|\s*-/.test(line));if(rows.length<2)return null;const cells=rows.map(line=>line.split('|').slice(1,-1).map(cell=>cell.trim()));return {type:'table',caption:'Compare the scope before comparing proposals',children:[{type:'thead',children:[{type:'tr',children:cells[0].map(cell=>({type:'th',children:[text(cell)]}))}]},{type:'tbody',children:cells.slice(1).map(row=>({type:'tr',children:row.map(cell=>({type:'td',children:[text(cell)]}))}))}]};}
    if(trimmed.startsWith('- '))return {type:'ul',children:trimmed.split(/\n/).filter(line=>line.startsWith('- ')).map(line=>({type:'li',children:[text(line.slice(2))]}))};
    if(/^\*\*.*\*\*$/.test(trimmed))return null;
    const children:ArticleNode[]=[];let rest=trimmed;const link=/\[([^\]]+)\]\((\/[^)]+)\)/g;let match;let last=0;while((match=link.exec(rest))){if(match.index>last)children.push(text(rest.slice(last,match.index)));children.push({type:'text',text:match[1],link:match[2]});last=match.index+match[0].length;}if(last<rest.length)children.push(text(rest.slice(last)));return {type:'paragraph',children};
  }).filter(Boolean) as ArticleNode[];
}

export async function loadMediaWallPreview():Promise<Entry>{
  const file=path.join(process.cwd(),'seo-workflow-output','bespoke-media-walls-london-0102f2194946','article-final.md');
  const markdown=await fs.readFile(file,'utf8');
  return {...mediaWallPreview,content:{...mediaWallPreview.content,body_nodes:markdownNodes(markdown)}};
}

export const mediaWallPreview:Entry={
  path:mediaWallPreviewPath,
  source:{collection:'local-preview',id:mediaWallPreviewPath},
  content:{
    component:'article',
    title:'How to Plan a Bespoke Media Wall in London',
    seo_title:'Bespoke Media Walls London: Design and Planning | NURA Interiors',
    seo_description:'Plan a bespoke media wall in London with guidance on storage, lighting, materials, fireplaces and installation scope from NURA Interiors.',
    hero:{filename:'/assets/editorial/media-wall-preview.webp',alt:'Bespoke media wall with integrated television, illuminated shelving and electric fireplace in a London living room'},
    image_rights_status:'owned',
    author_name:'Joanne H',
    author_bio:'Joanne H writes for the Nura journal. Explore her professional profile on LinkedIn.',
    body_nodes:[
      paragraph('A bespoke media wall should make television, storage, equipment, lighting and the wider room feel considered together. The best starting point is a clear brief for how the room is used, what the wall needs to hold and which architectural details must be preserved.'),
      heading('What should a bespoke media wall achieve?'),
      paragraph('Begin with the room’s practical needs. Record the television size, equipment dimensions, preferred viewing position, storage requirements, sound system, lighting intentions, materials and features that must remain visible.'),
      heading('Plan the room before choosing the finish'),
      linkedParagraph('A media wall is part of a wider interior. Consider its relationship with the sofa, windows, doors, floor finish, lighting and adjacent furniture. For a wider brief, explore Nura’s ','living spaces service','/services/living-spaces','.'),
      heading('Cabinetry, shelving and concealed equipment'),
      paragraph('Give every visible and hidden element a purpose. Ask where equipment will sit, how an engineer will reach it, whether cables can be replaced and how ventilation will work.'),
      heading('Compare three common media wall directions'),
      {type:'table',caption:'Compare the scope before comparing proposals',children:[
        {type:'thead',children:[{type:'tr',children:[{type:'th',children:[text('Direction')]},{type:'th',children:[text('Decisions to resolve')]}]}]},
        {type:'tbody',children:[
          {type:'tr',children:[{type:'td',children:[text('Media wall with fireplace')]},{type:'td',children:[text('Product, clearances, ventilation and electrical supply')]}]},
          {type:'tr',children:[{type:'td',children:[text('Media wall with concealed storage')]},{type:'td',children:[text('Cabinet depth, access, ventilation and internal layout')]}]},
          {type:'tr',children:[{type:'td',children:[text('Minimal TV unit')]},{type:'td',children:[text('Screen position, cable route, storage and future access')]}]}
        ]}
      ]},
      heading('Audio, lighting and ventilation need early coordination'),
      paragraph('Confirm speaker locations, cable routes, power requirements and equipment access alongside the furniture. Check the actual equipment and manufacturer instructions for the project.'),
      heading('What should you ask a design and joinery studio?'),
      linkedParagraph('Ask how the brief, site information, design development, technical coordination, manufacture and installation fit together. ','Nura’s design process','/process',' provides the relevant route for understanding how the brief and detail are developed; the exact stages remain project-specific.'),
      linkedParagraph('Nura’s ','architectural joinery service','/services/architectural-joinery',' is a relevant route for discussing fitted furniture, storage and material relationships. '),
      linkedParagraph('The ','Westover Road joinery project','/joinery/westover-road',' records white washed oak veneer, recessed lighting and Calacatta Cremo marble. It is a joinery reference, not a media wall case study.'),
      heading('How much does a bespoke media wall cost?'),
      paragraph('There is no responsible single Nura price without a defined scope. Compare cabinetry and storage, technical installation, feature elements, and site and commercial scope. Ask whether the proposal includes VAT, surveys, delivery, installation, exclusions and variations.'),
      heading('A considered next step'),
      linkedParagraph('If you have photographs, a measured drawing or equipment details, ','share your brief with Nura','/consultation','. Include approximate wall dimensions, a room photograph, storage needs, television and sound-system details, and any fireplace or lighting ideas.')
    ] as ArticleNode[]
  }
};

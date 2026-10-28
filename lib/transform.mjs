export function wixImage(value) {
  if (!value) return '';
  const raw = typeof value === 'string' ? value : value.filename || value.src || value.url || value.image?.url || '';
  if (raw.startsWith('wix:image://v1/')) return 'https://static.wixstatic.com/media/' + raw.slice(15).split('/')[0].split('#')[0];
  if (/^https:\/\/(static\.wixstatic\.com|a\.storyblok\.com)\//.test(raw)) return raw;
  return '';
}
export function normalisePath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\?#]/.test(value)) return null;
  const path = value.replace(/\/+$/, '') || '/';
  if (path.split('/').some(x=>x==='..'||x==='.')) return null;
  return path;
}
export function text(value) {return typeof value === 'string' ? value.trim() : '';}
export function gallery(value) {
  return (Array.isArray(value)?value:[]).filter(x=>!x.type||x.type==='image').map(x=>({filename:wixImage(x),alt:text(x.alt),caption:text(x.description)})).filter(x=>x.filename);
}
export function toEntry(collection, item) {
  const d=item.data;
  const isProject=collection==='Projects', isJoinery=collection==='Import969', isArticle=collection==='Blog/Posts';
  const title=text(isJoinery?d.jointeryName:d.title);
  const path=normalisePath(isProject?d['link-projects-title']:isJoinery?d['link-jointery-data-1-jointeryName']:isArticle?d.postPageUrl:d['link-inspiration-1-title']);
  if(!path||!title) throw new Error('Missing title or original path: '+collection+':'+item.id);
  return {path,source:{collection,id:item.id},content:{component:isProject||isJoinery?'project':isArticle?'article':'inspiration',title,location:text(d.area),category:isProject?'Kitchens':isJoinery?'Architectural Joinery':isArticle?'Journal':'Inspiration',summary:text(isProject?d.shortProjectDescription:isJoinery?d.shortJointeryDescription:isArticle?d.excerpt:d.shortInfo),body:text(isProject?d.longProjectDescription:isJoinery?d.longJointeryDescription:isArticle?d.plainContent:d.longInfo),specifications:text(d.specifications),hero:{filename:wixImage(isProject?d.mainProjectImage:isJoinery?d.mainJointeryImage:isArticle?d.coverImage:d.main),alt:''},gallery:gallery(d.gallery),seo_title:title+' | NURA Interiors',seo_description:text(isProject?d.shortProjectDescription:isJoinery?d.shortJointeryDescription:isArticle?d.excerpt:d.shortInfo).slice(0,155),published_date:d.publishedDate?.$date||d._publishDate?.$date||'',image_rights_status:'review',source_publish_status:d._publishStatus||d.status||'unknown',source_rank:d.rank||0}};
}

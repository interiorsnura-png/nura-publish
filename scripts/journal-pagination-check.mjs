import assert from 'node:assert/strict';
export async function findJournalEntry(page,filter,path,origin){
 let next='/journal'+filter,found=0;const seen=new Set(),articles=new Set();
 while(next){
  assert.ok(!seen.has(next)&&seen.size<100,'Journal pagination must terminate');seen.add(next);
  const $=await page(next),nodes=$('script[type="application/ld+json"]').toArray().map(el=>JSON.parse($(el).text()));
  const list=nodes.flatMap(node=>node['@graph']||[]).find(node=>node['@type']==='ItemList');
  assert.ok(list);assert.equal(list.numberOfItems,list.itemListElement.length);assert.ok(list.numberOfItems<=12);
  assert.equal($('link[rel="canonical"]').attr('href'),origin+next);
  for(const item of list.itemListElement){assert.ok(!articles.has(item.url),'Distinct archive pages must not repeat articles');articles.add(item.url);assert.ok($(`#journal-articles a[href="${item.url.replace(origin,'')}"]`).length);if(item.url===origin+path)found++;}
  next=$('.journal-page-links a[rel="next"]').attr('href')?.split('#')[0];
 }
 assert.equal(found,1,'Article must occur once across the paginated collection');
 return {pages:seen.size,articles:articles.size};
}

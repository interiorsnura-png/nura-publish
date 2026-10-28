import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import{createHash}from'node:crypto';import ts from'typescript';import{renderToStaticMarkup}from'react-dom/server';import{jsx,jsxs}from'react/jsx-runtime';import{load}from'cheerio';
const root=new URL('../',import.meta.url),entry=JSON.parse(fs.readFileSync(new URL('migration/content-backup.json',root))).find(x=>x.path==='/inspiration/lighting');
function compile(file,imports={}){const js=ts.transpileModule(fs.readFileSync(new URL(file,root),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;const output={};new Function('exports','require',js)(output,name=>imports[name]||(()=>{throw Error('Unexpected import '+name)})());return output;}
const{lightingGroups}=compile('lib/lighting-gallery.ts');
test('lighting grouping retains every original reference exactly once without changing asset identity or historical publication fields',()=>{
 assert.deepEqual(lightingGroups.flatMap(g=>[...g.positions]).sort((a,b)=>a-b),Array.from({length:56},(_,i)=>i+1));assert.equal(entry.content.published_date,'');assert.equal(entry.content.image_rights_status,'owned');
 assert.equal(createHash('sha256').update(JSON.stringify(entry.content.gallery.map(x=>x.filename))).digest('hex'),'ae23df73572acaab987e01c906c23994cfc504113085b27ff79181141d228b55');
 assert.equal(entry.content.hero.filename,'https://static.wixstatic.com/media/22c124_07ddb27d98aa4f16b2fd0cea616a46a0~mv2.webp');
 assert.ok(entry.content.gallery.every(x=>x.alt&&x.alt.length>25));assert.doesNotMatch(JSON.stringify(entry.content),/REGOLO MAXI|right l\?|\u2014/);
});
test('lighting gallery renders accessible section links and56described references with the real group mapping',()=>{
 const{default:View}=compile('components/LightingInspiration.tsx',{'react/jsx-runtime':{jsx,jsxs},'./Editorial':{Hero:({title})=>jsx('h1',{children:title}),Photo:({asset})=>jsx('img',{src:asset.filename,alt:asset.alt})},'./RichArticle':{__esModule:true,default:()=>null},'../lib/lighting-gallery':{lightingGroups},'./LightingInspiration.module.css':{__esModule:true,default:{}}});
 const $=load(renderToStaticMarkup(jsx(View,{content:entry.content})));assert.equal($('h1').length,1);assert.equal($('figure').length,56);assert.equal($('img[alt=""]').length,0);assert.equal($('a[href="tel:+442071236949"]').length,1);for(const group of lightingGroups){assert.equal($('section#'+group.id).length,1);assert.equal($('nav a[href="#'+group.id+'"]').length,1);assert.equal($('section#'+group.id+' figure').length,group.positions.length);}
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {previewEnabled,guaranteeEnabled,enhanceHome,enhanceFooter} from '../lib/guarantee-preview.mjs';
const require=createRequire(import.meta.url),ts=require('typescript');
function load(file,env={}){const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;const exports={};new Function('require','exports','process',output)(name=>name==='next/navigation'?{notFound(){throw Error('HTTP404')}}:createRequire(path.resolve(file))(name),exports,{env});return exports;}
const footer=load('lib/footer.ts').footerHtml;
const faq=load('lib/home-faq.ts').homeFaqHtml;
const home=JSON.parse(fs.readFileSync('lib/published-home.json','utf8')).html;
test('explicitly disabled transformations preserve exact input; publication is enabled',()=>{
 for(const flag of ['', '0','true','yes']){assert.equal(previewEnabled(flag),false);assert.equal(enhanceHome(home,flag),home);assert.equal(enhanceFooter(footer,flag),footer);}
 assert.equal(previewEnabled('1'),true);assert.equal(guaranteeEnabled(),true);
});
test('local homepage adds one working hero, FAQ and footer link without duplicating on rerun',()=>{
 const input=home.replace('</body>',faq+footer+'</body>');const output=enhanceHome(input,'1');
 for(const marker of ['data-guarantee-hero','data-guarantee-faq','data-guarantee-footer'])assert.equal(output.split(marker).length-1,1,marker);
 assert.match(output,/10-Year Cabinetry Guarantee/);assert.match(output,/href="\/guarantee"/);assert.match(output,/proposed guarantee/);
 assert.equal(enhanceHome(output,'1'),output);
 const heroEnd=output.indexOf('data-guarantee-hero');assert.ok(heroEnd>output.indexOf('button button-light'));
});
test('published guarantee proposal is public but remains noindex and outside sitemap',()=>{
 const published=load('app/guarantee/page.tsx');assert.ok(published.default());
 const on=load('app/guarantee/page.tsx',{NURA_GUARANTEE_PREVIEW:'1'});const html=require('react-dom/server').renderToStaticMarkup(on.default());
 assert.match(html,/Proposed guarantee for review/);assert.match(html,/Installation cover and its duration will be agreed separately/);assert.match(html,/still need confirmation/);
 assert.equal(on.metadata.robots.index,false);assert.equal(on.metadata.robots.follow,false);
 assert.doesNotMatch(fs.readFileSync('app/sitemap.ts','utf8'),/\/guarantee/);
});

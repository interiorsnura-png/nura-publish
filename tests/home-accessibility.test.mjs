import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {load} from 'cheerio';
const root=new URL('../',import.meta.url);
function luminance(hex){
 const channels=hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
}
test('homepage journal label uses an opaque color with at least 7:1 paper contrast',()=>{
 const css=fs.readFileSync(new URL('public/nura-home-planning.css',root),'utf8');
 const rule=css.match(/#home-planning \.section-mark\{([^}]+)\}/)?.[1];
 assert.ok(rule,'explicit planning-label override');
 const foreground=rule.match(/color:(#[a-f\d]{6})/i)?.[1];
 assert.match(rule,/opacity:1/);
 const variables=fs.readFileSync(new URL('public/nura-home.css',root),'utf8');
 const paper=variables.match(/--paper:(#[a-f\d]{6})/i)[1];
 const ratio=(luminance(paper)+.05)/(luminance(foreground)+.05);
 assert.ok(ratio>=7,`contrast ${ratio.toFixed(2)}:1`);
 console.log(`Journal label source-color contrast: ${ratio.toFixed(2)}:1`);
});
test('footer social icons are decorative while links retain meaningful accessible names',()=>{
 const source=fs.readFileSync(new URL('lib/footer.ts',root),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports={};new Function('exports',compiled)(exports);
 const $=load(exports.footerHtml);
 for(const [asset,name] of [['linkedin.svg','LinkedIn'],['instagram.svg','Instagram']]){
  const icon=$(`img[src="/assets/${asset}"]`),link=icon.parent('a');
  assert.equal(icon.length,1);assert.equal(icon.attr('alt'),'');
  assert.ok(link.attr('aria-label').includes(name));
  assert.ok(link.text().includes(name));
  assert.match(link.attr('href'),/^https:\/\//);
 }
});

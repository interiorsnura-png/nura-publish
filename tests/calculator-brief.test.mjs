import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../public/nura-lead.js',import.meta.url),'utf8');
const body=source.match(/const openDialog=\(\)=>\{([\s\S]*?)\n \};/)?.[1];
function setup(field={value:''}){assert.ok(body);const context={calculatorBriefField:field,lastGeneratedBrief:'',briefInitialised:false,returnFocus:null,document:{activeElement:{},querySelector:()=>({textContent:'Current kitchen choices'})},dialog:{showModal(){}}};vm.createContext(context);context.open=()=>vm.runInContext(body,context);return context;}
test('consultation summary initialises and preserves edited or deliberately empty text',()=>{const c=setup();c.open();assert.equal(c.calculatorBriefField.value,'Current kitchen choices');c.calculatorBriefField.value='My edited brief';c.open();assert.equal(c.calculatorBriefField.value,'My edited brief');c.calculatorBriefField.value='';c.open();assert.equal(c.calculatorBriefField.value,'');});
test('unchanged auto-summary refreshes while unrelated pages need no calculator field',()=>{const c=setup();c.open();c.document.querySelector=()=>({textContent:'New kitchen choices'});c.open();assert.equal(c.calculatorBriefField.value,'New kitchen choices');assert.doesNotThrow(()=>setup(null).open());});

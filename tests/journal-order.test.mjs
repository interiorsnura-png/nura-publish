import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../lib/journal-order.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};new Function('exports',compiled)(mod.exports);
const {newestJournalFirst}=mod.exports;
const entry=(path,date)=>({path,content:{component:'article',title:path,published_date:date}});
test('journal sorts by first publication, keeps ties stable and invalid dates last without mutation',()=>{
 const entries=[entry('old','2024-12-20'),entry('missing'),entry('new','2026-10-24T04:16:24.347Z'),entry('tie','2024-12-20'),entry('invalid','unknown')];
 const before=JSON.stringify(entries);
 assert.deepEqual(newestJournalFirst(entries).map(e=>e.path),['new','old','tie','missing','invalid']);
 assert.equal(JSON.stringify(entries),before);
});

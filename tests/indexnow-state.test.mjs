import test from 'node:test';
import assert from 'node:assert/strict';
import {findStateRun,validateSnapshot} from '../lib/indexnow-state.mjs';

test('IndexNow restores the last successful main state and never uses another branch or current run',async()=>{
 const calls=[];const runs=[
  {id:9,conclusion:'success',head_branch:'main',event:'deployment_status'},
  {id:8,conclusion:'success',head_branch:'untrusted',event:'workflow_dispatch'},
  {id:7,conclusion:'success',head_branch:'main',event:'deployment_status'},
  {id:6,conclusion:'success',head_branch:'main',event:'deployment_status'}
 ];
 const fetchImpl=async url=>{
  calls.push(url);
  if(url.includes('workflow'))return Response.json({workflow_runs:runs});
  return Response.json({artifacts:url.includes('/7/')?[]:[{name:'indexnow-state',expired:false}]});
 };
 assert.deepEqual(await findStateRun({token:'test',currentRunId:9,fetchImpl}),{source:'workflow-artifact',runId:6});
 assert.ok(!calls.some(url=>url.includes('/8/')||url.includes('/9/')));
});

test('IndexNow distinguishes first setup from a failed baseline lookup',async()=>{
 assert.deepEqual(await findStateRun({token:'test',currentRunId:1,fetchImpl:async()=>Response.json({workflow_runs:[]})}),{source:'repository-baseline',runId:null});
 await assert.rejects(()=>findStateRun({token:'test',fetchImpl:async()=>new Response(null,{status:403})}),/403/);
 await assert.rejects(()=>findStateRun({fetchImpl:async()=>{throw Error('should not fetch');}}),/token missing/);
});

test('IndexNow rejects malformed or foreign persisted state',()=>{
 const origin='https://www.nura-interiors.com';const hash='a'.repeat(64);
 assert.deepEqual(validateSnapshot({[origin+'/']:hash},origin),{[origin+'/']:hash});
 assert.throws(()=>validateSnapshot({'https://other.test/':hash},origin),/invalid URL/);
 assert.throws(()=>validateSnapshot({[origin+'/']:'not-a-hash'},origin),/fingerprint/);
 assert.throws(()=>validateSnapshot([],origin),/Invalid IndexNow state/);
});

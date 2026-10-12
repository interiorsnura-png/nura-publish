const repository='interiorsnura-png/nura-publish';

export function validateSnapshot(snapshot,origin){
 if(!snapshot||Array.isArray(snapshot)||typeof snapshot!=='object')throw Error('Invalid IndexNow state');
 for(const [value,hash] of Object.entries(snapshot)){
  const url=new URL(value);
  if(url.origin!==origin||url.username||url.password||url.search||url.hash||!/^[a-f0-9]{64}$/.test(hash))throw Error('IndexNow state contains an invalid URL or fingerprint');
 }
 return snapshot;
}

export async function findStateRun({token,currentRunId,fetchImpl=fetch}={}){
 if(!token)throw Error('GitHub Actions read token missing');
 const get=async path=>{
  const response=await fetchImpl(`https://api.github.com/repos/${repository}/${path}`,{headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},redirect:'error',signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error(`IndexNow state lookup failed: HTTP ${response.status}`);
  return response.json();
 };
 const {workflow_runs=[]}=await get('actions/workflows/indexnow.yml/runs?status=success&per_page=30');
 for(const run of workflow_runs){
  if(String(run.id)===String(currentRunId)||run.conclusion!=='success'||run.head_branch!=='main'||!['deployment_status','workflow_dispatch'].includes(run.event))continue;
  const {artifacts=[]}=await get(`actions/runs/${run.id}/artifacts`);
  if(artifacts.some(a=>a.name==='indexnow-state'&&!a.expired))return {source:'workflow-artifact',runId:run.id};
 }
 return {source:'repository-baseline',runId:null};
}

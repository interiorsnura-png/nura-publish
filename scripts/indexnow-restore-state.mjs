import {appendFile,mkdir,writeFile} from 'node:fs/promises';
import {findStateRun} from '../lib/indexnow-state.mjs';

if(process.env.GITHUB_REPOSITORY!=='interiorsnura-png/nura-publish')throw Error('Unexpected IndexNow repository');
const state=await findStateRun({token:process.env.GITHUB_TOKEN,currentRunId:process.env.GITHUB_RUN_ID});
await mkdir('.indexnow',{recursive:true});
await writeFile('.indexnow/restore-report.json',JSON.stringify(state,null,2)+'\n');
if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`previous_run_id=${state.runId||''}\n`);
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,`IndexNow baseline: **${state.source}**${state.runId?` from run ${state.runId}`:''}.\n\n`);
console.log(JSON.stringify(state));

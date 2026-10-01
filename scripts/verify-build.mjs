import {spawn} from 'node:child_process';
const port='3137';const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port',port],{stdio:['ignore','pipe','pipe']});let serverLog='';server.stdout.on('data',chunk=>{serverLog=(serverLog+chunk).slice(-3000)});server.stderr.on('data',chunk=>{serverLog=(serverLog+chunk).slice(-3000)});
try{
 let ready=false;for(let attempt=0;attempt<30;attempt++){try{const r=await fetch('http://localhost:'+port,{signal:AbortSignal.timeout(2000)});if(r.ok){ready=true;await r.body?.cancel();break}}catch{}await new Promise(resolve=>setTimeout(resolve,1000));}
 if(!ready)throw Error('Built server did not become ready: '+serverLog);
 const check=spawn(process.execPath,['scripts/seo-check.mjs'],{stdio:'inherit',env:{...process.env,SEO_BASE_URL:'http://localhost:'+port,SEO_EXPECT_INDEX:process.env.SITE_ENV==='staging'||(!process.env.SITE_ENV&&process.env.VERCEL_ENV==='preview')?'false':'true'}});
 const code=await new Promise(resolve=>check.once('exit',resolve));if(code!==0)process.exitCode=1;
}catch(error){console.error(error.message);process.exitCode=1;}finally{server.kill();}

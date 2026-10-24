import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { startOwnedBuildServer } from './owned-build-server.mjs';

const require = createRequire(import.meta.url);
let server;
try {
  server = await startOwnedBuildServer(process.execPath, [
    require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', '0'
  ]);
  console.log('Checking this build on owned server PID ' + server.pid + ' at ' + server.url);
  let ready = false;
  for (let attempt = 0; attempt < 30; attempt++) {
    server.assertRunning();
    try {
      const response = await fetch(server.url, { signal: AbortSignal.timeout(2000) });
      const ok = response.ok;
      await response.body?.cancel();
      if (ok) { ready = true; break; }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  server.assertRunning();
  if (!ready) throw new Error('Owned build server did not become healthy');
  const env = {
    ...process.env, SEO_BASE_URL: server.url,
    SEO_EXPECT_INDEX: process.env.SITE_ENV === 'staging' || (!process.env.SITE_ENV && process.env.VERCEL_ENV === 'preview') ? 'false' : 'true'
  };
  for (const script of ['verify-nura-traces.mjs', 'seo-check.mjs', 'image-license-check.mjs', 'verify-fulham.mjs', 'verify-kitchen-quotes.mjs', 'verify-journal-discovery.mjs']) {
    server.assertRunning();
    const code = await new Promise((resolve, reject) => {
      const check = spawn(process.execPath, ['scripts/' + script], { stdio: 'inherit', windowsHide: true, env });
      check.once('error', reject);
      check.once('exit', (status) => resolve(status));
    });
    server.assertRunning();
    if (code !== 0) throw new Error(script + ' failed with exit status ' + code);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await server?.stop();
}

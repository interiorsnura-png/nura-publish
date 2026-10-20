import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { startOwnedBuildServer } from '../scripts/owned-build-server.mjs';

test('server binds its own random loopback port and cleanup stops only its child', async () => {
  const oldServer = http.createServer((_req, res) => res.end('old server'));
  await new Promise((resolve) => oldServer.listen(0, '127.0.0.1', resolve));
  const oldUrl = 'http://127.0.0.1:' + oldServer.address().port;
  let owned;
  try {
    const code = "const http=require('node:http'); const s=http.createServer((q,r)=>r.end('new build'));s.listen(0,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+s.address().port+'\\nReady in 1ms'));";
    owned = await startOwnedBuildServer(process.execPath, ['-e', code]);
    assert.notEqual(owned.url, oldUrl);
    owned.assertRunning();
    assert.equal(await (await fetch(owned.url)).text(), 'new build');
    await owned.stop();
    await owned.stop();
    assert.throws(() => owned.assertRunning());
    assert.equal(await (await fetch(oldUrl)).text(), 'old server');
  } finally {
    await owned?.stop();
    await new Promise((resolve) => oldServer.close(resolve));
  }
});

test('an unrelated healthy server cannot mask a child bind failure', async () => {
  const oldServer = http.createServer((_req, res) => res.end('old server'));
  await new Promise((resolve) => oldServer.listen(0, '127.0.0.1', resolve));
  const port = oldServer.address().port;
  try {
    const code = "const s=require('node:http').createServer();s.on('error',e=>{console.error(e.code);process.exit(1)});s.listen(" + port + ",'127.0.0.1');";
    await assert.rejects(startOwnedBuildServer(process.execPath, ['-e', code]), /EADDRINUSE/);
    assert.equal(await (await fetch('http://127.0.0.1:' + port)).text(), 'old server');
  } finally {
    await new Promise((resolve) => oldServer.close(resolve));
  }
});

test('timeout and missing executable are failures, never readiness', async () => {
  await assert.rejects(startOwnedBuildServer(process.execPath, ['-e', 'setInterval(()=>{},1000)'], { timeout: 150 }), /timed out/);
  await assert.rejects(startOwnedBuildServer('nura-nonexistent-executable-08595e', []), /ENOENT/);
});

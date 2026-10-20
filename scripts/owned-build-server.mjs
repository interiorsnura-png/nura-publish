import { spawn } from 'node:child_process';

// Readiness belongs to this child, never to a previously running HTTP server.
export function startOwnedBuildServer(command, args, { cwd, timeout = 30000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let log = '', closed = false, settled = false, stopping, failure;
    const stop = () => {
      if (stopping) return stopping;
      stopping = new Promise((done) => {
        if (closed) return done();
        const timer = setTimeout(() => { if (!closed) child.kill('SIGKILL'); }, 2000);
        timer.unref();
        child.once('close', () => { clearTimeout(timer); done(); });
        child.kill();
      });
      return stopping;
    };
    const fail = async (error) => {
      failure = error;
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      await stop();
      reject(error);
    };
    const timer = setTimeout(() => {
      void fail(new Error('Owned build server startup timed out: ' + log));
    }, timeout);
    const inspect = (chunk) => {
      log = (log + chunk.toString()).slice(-12000).replace(/\x1b\[[0-9;]*m/g, '');
      const address = log.match(/Local:\s+(http:\/\/127\.0\.0\.1:(\d+))/);
      if (!settled && !closed && address && Number(address[2]) > 0 && Number(address[2]) < 65536 && /Ready in\b/.test(log)) {
        settled = true;
        clearTimeout(timer);
        resolve({
          url: address[1], pid: child.pid, stop,
          assertRunning() { if (closed || failure) throw failure ?? new Error('Owned build server exited: ' + log); }
        });
      }
    };
    child.stdout.on('data', inspect);
    child.stderr.on('data', inspect);
    child.once('error', (error) => { void fail(error); });
    child.once('close', (code, signal) => {
      closed = true;
      void fail(new Error('Owned build server exited (' + (code ?? signal) + '): ' + log));
    });
  });
}

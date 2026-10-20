import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const SHA = /^[0-9a-f]{40}$/i;
const require = createRequire(import.meta.url);
const RECEIPT_NAME = path.join('.next', 'nura-release', 'receipt.json');

export function validateDeploymentIdentity(record, { expectedSha, expectedDomain }) {
  const aliases = Array.isArray(record?.alias) ? record.alias : [];
  const meta = record?.meta ?? {};
  const valid = Boolean(record && SHA.test(expectedSha ?? '') && record.source === 'git' &&
    record.target === 'production' && (record.readyState ?? record.status) === 'READY' &&
    meta.githubCommitSha === expectedSha && meta.githubCommitRef === 'main' &&
    ![1, true, '1', 'true'].includes(meta.gitDirty) && aliases.includes(expectedDomain));
  return { valid, reason: valid ? null : 'deployment identity does not match expected production evidence' };
}

function executable(name) {
  if (process.platform !== 'win32') return name;
  try { return require('node:child_process').execFileSync('where.exe', [name], { encoding: 'utf8', windowsHide: true }).split(/\r?\n/)[0].trim(); } catch {}
  const candidates = [
    process.env.ProgramFiles && path.join(process.env.ProgramFiles, 'Git', 'bin', 'git.exe'),
    process.env['ProgramW6432'] && path.join(process.env['ProgramW6432'], 'Git', 'bin', 'git.exe'),
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Programs', 'Git', 'cmd', 'git.exe')
  ].filter(Boolean);
  return candidates.find((candidate) => fsSync.existsSync(candidate)) ?? 'git.exe';
}

function runFile(file, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { ...options, windowsHide: true });
    let stdout = '', stderr = '';
    if (child.stdout) child.stdout.on('data', (data) => { stdout += data; if (stdout.length > 1024 * 1024) child.kill(); });
    if (child.stderr) child.stderr.on('data', (data) => { stderr += data; if (stderr.length > 1024 * 1024) child.kill(); });
    const timer = setTimeout(() => child.kill(), options.timeout ?? 5000);
    child.once('error', (error) => { clearTimeout(timer); reject(error); });
    child.once('close', (code, signal) => { clearTimeout(timer); if (code === 0) resolve({ stdout: stdout.trim(), stderr: stderr.trim() }); else reject(new Error(`${file} failed (${code ?? signal}): ${stderr.trim()}`)); });
  });
}

async function git(root, args, timeout = 5000) { return (await runFile(executable('git'), args, { cwd: root, timeout })).stdout; }

export async function inspectSource(cwd = process.cwd(), deps = {}) {
  const run = deps.git ?? git;
  const root = await run(cwd, ['rev-parse', '--show-toplevel']);
  const [sha, branch, tree, origin, changes] = await Promise.all([
    run(root, ['rev-parse', 'HEAD']), run(root, ['symbolic-ref', '--quiet', '--short', 'HEAD']).catch(() => 'DETACHED'),
    run(root, ['rev-parse', 'HEAD^{tree}']), run(root, ['remote', 'get-url', 'origin']), run(root, ['status', '--porcelain=v1', '--untracked-files=all'])
  ]);
  return { root: path.resolve(root), sha, branch: branch || 'DETACHED', tree, origin, changes: changes ? changes.split(/\r?\n/) : [], dirty: Boolean(changes) };
}

export async function loadReceipt(root, current, deps = {}) {
  try {
    const receipt = JSON.parse(await fs.readFile(path.join(root, RECEIPT_NAME), 'utf8'));
    const valid = receipt.success === true && receipt.root === current.root && receipt.sha === current.sha && receipt.tree === current.tree &&
      receipt.remoteSha === current.sha && receipt.origin === current.origin && !current.dirty &&
      typeof receipt.verifiedAt === 'string' && Number.isFinite(Date.parse(receipt.verifiedAt)) &&
      Date.parse(receipt.verifiedAt) <= Date.now() && Date.now() - Date.parse(receipt.verifiedAt) < 24 * 60 * 60 * 1000;
    return { valid, receipt };
  } catch { return { valid: false, receipt: null }; }
}

export async function checkRelease({ cwd = process.cwd(), expectedSha, deps = {}, remoteSha } = {}) {
  const source = await inspectSource(cwd, deps); const failures = [];
  if (!SHA.test(expectedSha ?? '')) failures.push('expected SHA must be a full 40-character SHA');
  if (source.sha !== expectedSha) failures.push('HEAD does not match expected SHA');
  if (source.dirty) failures.push('source has working-tree changes or untracked files');
  let remote = remoteSha;
  if (remote === undefined && failures.length === 0) { try { remote = await (deps.lsRemote ?? ((root) => git(root, ['ls-remote', 'origin', 'refs/heads/main'])))(source.root); } catch { failures.push('origin main is unavailable'); } }
  const parsedRemote = typeof remote === 'string' ? remote.split(/\s+/)[0] : remote;
  if (remote !== undefined && parsedRemote !== expectedSha) failures.push('origin main does not match expected SHA');
  const preflightPass = failures.length === 0;
  const verificationReceipt = await loadReceipt(source.root, source, deps);
  const verified = preflightPass && verificationReceipt.valid;
  if (preflightPass && !verified) failures.push('no current verification receipt; run release:verify for this exact commit');
  return { pass: verified, verified, preflightPass, verificationReceiptValid: verified, stage: verified ? 'verified' : 'preflight', source, remoteSha: parsedRemote ?? null, failures };
}

async function invalidateReceipt(root) { try { await fs.rm(path.join(root, RECEIPT_NAME), { force: true }); } catch (error) { return `could not invalidate receipt: ${error.message}`; } }
function npmCli() {
  const candidates = [
    process.env.npm_execpath,
    path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js')
  ].filter(Boolean);
  try { candidates.push(require.resolve('npm/bin/npm-cli.js')); } catch {}
  const found = candidates.find((file) => fsSync.existsSync(file));
  if (!found) throw new Error('npm-cli.js not found; invoke through npm run release:verify');
  return found;
}

export async function verifyRelease(options = {}) {
  const first = await checkRelease(options); const receiptPath = path.join(first.source.root, RECEIPT_NAME);
  const invalidationError = await invalidateReceipt(first.source.root);
  if (invalidationError) return { ...first, pass: false, verified: false, failures: [...first.failures, invalidationError] };
  if (!first.preflightPass) return { ...first, pass: false, verified: false };
  try {
    if (options.deps?.build) await options.deps.build(first.source.root);
    else await runFile(process.execPath, [npmCli(), 'run', 'build:verified'], { cwd: first.source.root, stdio: 'inherit', timeout: 600000 });
    const after = await checkRelease({ ...options, remoteSha: undefined });
    if (!after.preflightPass || after.source.sha !== first.source.sha || after.source.tree !== first.source.tree || after.source.root !== first.source.root) {
      const error = await invalidateReceipt(first.source.root); return { ...after, pass: false, verified: false, failures: [...after.failures, 'source identity changed during verification', ...(error ? [error] : [])] };
    }
    await (options.deps?.checkIgnored ?? ((root) => git(root, ['check-ignore', '--quiet', '--', '.next/nura-release/receipt.json'])))(after.source.root);
    await fs.mkdir(path.dirname(receiptPath), { recursive: true });
    await fs.writeFile(receiptPath, JSON.stringify({ root: after.source.root, sha: after.source.sha, tree: after.source.tree, origin: after.source.origin, remoteSha: after.remoteSha, verifiedAt: new Date().toISOString(), success: true }, null, 2) + '\n');
    return { ...after, stage: 'verified', verified: true, verificationReceiptValid: true, pass: true, failures: [], receiptPath };
  } catch (error) { const invalidation = await invalidateReceipt(first.source.root); return { ...first, verified: false, pass: false, failures: [...first.failures, `build failed: ${error.message}`, ...(invalidation ? [invalidation] : [])] }; }
}

function parseArgs(argv) {
  const allowed = new Set(['--expected-sha', '--deployment-json']); const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!allowed.has(arg)) throw new Error(`unknown flag: ${arg}`);
    const key = arg === '--expected-sha' ? 'expectedSha' : 'deploymentjson';
    if (Object.hasOwn(out, key)) throw new Error(`duplicate flag: ${arg}`);
    if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`missing value for ${arg}`);
    out[key] = argv[++i];
  }
  return out;
}

async function main(argv) {
  const command = argv[0] ?? 'status'; if (!['status', 'check', 'verify', 'inspect'].includes(command)) throw new Error(`unknown command: ${command}`);
  const parsed = parseArgs(argv.slice(1));
  if (command === 'inspect' && !parsed.deploymentjson) throw new Error('inspect requires --deployment-json <file>');
  if (command !== 'inspect' && parsed.deploymentjson) throw new Error('--deployment-json is only valid with inspect');
  if (command !== 'status' && !SHA.test(parsed.expectedSha ?? '')) throw new Error('expected SHA must be a full 40-character SHA');
  let result;
  if (command === 'status') result = await inspectSource();
  else if (command === 'check') result = await checkRelease(parsed);
  else if (command === 'verify') result = await verifyRelease(parsed);
  else {
    let record;
    try { record = JSON.parse(await fs.readFile(path.resolve(parsed.deploymentjson), 'utf8')); }
    catch (error) { throw new Error(`invalid deployment JSON: ${error.message}`); }
    const source = await inspectSource();
    const assertion = validateDeploymentIdentity(record, { expectedSha: parsed.expectedSha, expectedDomain: 'www.nura-interiors.com' });
    result = { ...assertion, valid: assertion.valid && source.sha === parsed.expectedSha,
      reason: source.sha !== parsed.expectedSha ? 'local HEAD does not match expected deployment SHA' : assertion.reason,
      OFFLINE_ASSERTION: true, liveVerified: false, source };
  }
  console.log(JSON.stringify(result, null, 2));
  if ((command === 'verify' && !result.verified) || (command !== 'status' && !result.pass && !result.valid)) process.exitCode = 1;
}

const invoked = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (invoked) { try { await main(process.argv.slice(2)); } catch (error) { console.log(JSON.stringify({ pass: false, error: error.message })); process.exitCode = 1; } }

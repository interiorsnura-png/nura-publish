import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateDeploymentIdentity, checkRelease, verifyRelease, loadReceipt } from '../scripts/release-guard.mjs';

const sha = 'a'.repeat(40); const tree = 'b'.repeat(40); const origin = 'https://example.invalid/repo';
const fixtures = [];
async function fixture() { const root = await fs.mkdtemp(path.join(os.tmpdir(), 'nura-release-')); fixtures.push(root); return root; }
function deps(root, overrides = {}) { const values = { root, sha, tree, origin, changes: '' }; return { git: async (_cwd, args) => { if (args[0] === 'rev-parse' && args[1] === '--show-toplevel') return values.root; if (args[0] === 'status') return values.changes; if (args[0] === 'symbolic-ref') return 'main'; if (args[0] === 'remote') return values.origin; if (args[1] === 'HEAD^{tree}') return values.tree; return values.sha; }, lsRemote: async () => values.sha, checkIgnored: async () => {}, ...overrides }; }
test.after(async () => { for (const root of fixtures) await fs.rm(root, { recursive: true, force: true }); });

test('clean matching source passes preflight but remains unverified without receipt', async () => { const root = await fixture(); const result = await checkRelease({ cwd: root, expectedSha: sha, deps: deps(root), remoteSha: sha }); assert.equal(result.preflightPass, true); assert.equal(result.verificationReceiptValid, false); assert.equal(result.pass, false); });
test('full-length HEAD mismatch, dirty source, and unavailable remote fail', async () => { const root = await fixture(); assert.equal((await checkRelease({ cwd: root, expectedSha: sha, deps: deps(root, { git: async (cwd, args) => args[0] === 'rev-parse' && args[1] === 'HEAD' ? 'c'.repeat(40) : deps(root).git(cwd, args) }), remoteSha: sha })).pass, false); assert.equal((await checkRelease({ cwd: root, expectedSha: sha, deps: deps(root, { git: async (cwd, args) => args[0] === 'status' ? ' M source' : deps(root).git(cwd, args) }), remoteSha: sha })).pass, false); assert.equal((await checkRelease({ cwd: root, expectedSha: sha, deps: { ...deps(root), lsRemote: async () => { throw new Error('offline'); } } })).pass, false); });
test('verify writes a positive receipt and rejects changed source or build failure', async () => { const root = await fixture(); const good = await verifyRelease({ cwd: root, expectedSha: sha, deps: deps(root, { build: async () => {} }), remoteSha: sha }); assert.equal(good.verified, true); assert.equal((await loadReceipt(root, good.source)).valid, true); let changedDuringBuild = false; const changed = await verifyRelease({ cwd: root, expectedSha: sha, deps: deps(root, { build: async () => { changedDuringBuild = true; }, git: async (cwd, args) => args[0] === 'rev-parse' && args[1] === 'HEAD^{tree}' && changedDuringBuild ? 'c'.repeat(40) : deps(root).git(cwd, args) }), remoteSha: sha }); assert.equal(changed.verified, false); const failed = await verifyRelease({ cwd: root, expectedSha: sha, deps: deps(root, { build: async () => { throw new Error('failed'); } }), remoteSha: sha }); assert.equal(failed.pass, false); assert.equal((await fs.stat(path.join(root, '.next', 'nura-release', 'receipt.json')).catch(() => null)), null); });
test('receipt rejects wrong root, stale, malformed, and changed source', async () => { const root = await fixture(); const current = { root, sha, tree, origin, dirty: false }; const receiptPath = path.join(root, '.next', 'nura-release', 'receipt.json'); await fs.mkdir(path.dirname(receiptPath), { recursive: true }); const base = { root, sha, tree, origin, remoteSha: sha, verifiedAt: new Date().toISOString(), success: true }; await fs.writeFile(receiptPath, JSON.stringify(base)); assert.equal((await loadReceipt(root, current)).valid, true); await fs.writeFile(receiptPath, JSON.stringify({ ...base, root: `${root}-other` })); assert.equal((await loadReceipt(root, current)).valid, false); await fs.writeFile(receiptPath, '{bad'); assert.equal((await loadReceipt(root, current)).valid, false); });
test('deployment validator requires actual Vercel git production READY record', () => { const good = { source: 'git', target: 'production', readyState: 'READY', meta: { githubCommitSha: sha, githubCommitRef: 'main' }, alias: ['www.nura-interiors.com'] }; assert.equal(validateDeploymentIdentity(good, { expectedSha: sha, expectedDomain: 'www.nura-interiors.com' }).valid, true); for (const bad of [{ source: 'cli' }, { ...good, readyState: 'BUILDING' }, { ...good, alias: ['other.example'] }, { ...good, meta: { ...good.meta, githubCommitSha: 'c'.repeat(40) } }, { ...good, meta: { ...good.meta, gitDirty: true } }]) assert.equal(validateDeploymentIdentity(bad, { expectedSha: sha, expectedDomain: 'www.nura-interiors.com' }).valid, false); });
test('CLI launched from a path containing spaces prints JSON and fails properly', async () => { const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'nura cli ')); fixtures.push(dir); const copy = path.join(dir, 'release guard.mjs'); await fs.copyFile(path.join(process.cwd(), 'scripts', 'release-guard.mjs'), copy); const result = await new Promise((resolve) => { const child = spawn(process.execPath, [copy, 'inspect'], { cwd: process.cwd() }); let out = ''; child.stdout.on('data', (d) => { out += d; }); child.on('close', (code) => resolve({ code, out })); }); assert.equal(result.code, 1); assert.equal(JSON.parse(result.out).pass, false); });

test('receipt rejects a remote hash from another commit, old date, future date and changed source', async () => {
  const root = await fixture();
  const current = { root, sha, tree, origin, dirty: false };
  const file = path.join(root, '.next', 'nura-release', 'receipt.json');
  await fs.mkdir(path.dirname(file), { recursive: true });
  const base = { root, sha, tree, origin, remoteSha: sha, verifiedAt: new Date().toISOString(), success: true };
  for (const change of [
    { remoteSha: 'd'.repeat(40) },
    { verifiedAt: '2000-01-01T00:00:00Z' },
    { verifiedAt: '2099-01-01T00:00:00Z' },
    { sha: 'd'.repeat(40) },
    { tree: 'd'.repeat(40) }
  ]) {
    await fs.writeFile(file, JSON.stringify({ ...base, ...change }));
    assert.equal((await loadReceipt(root, current)).valid, false);
  }
  await fs.writeFile(file, JSON.stringify(base));
  assert.equal((await loadReceipt(root, { ...current, dirty: true })).valid, false);
});

test('moving remote after build and dirty source during build invalidate receipts', async () => {
  for (const scenario of ['remote', 'dirty']) {
    const root = await fixture(); let built = false;
    const original = deps(root);
    const d = deps(root, {
      build: async () => { built = true; },
      lsRemote: async () => built && scenario === 'remote' ? 'd'.repeat(40) : sha,
      git: async (cwd, args) => built && scenario === 'dirty' && args[0] === 'status' ? '?? new-source.js' : original.git(cwd, args)
    });
    const result = await verifyRelease({ cwd: root, expectedSha: sha, deps: d });
    assert.equal(result.verified, false);
    assert.equal(result.pass, false);
    assert.equal(await fs.stat(path.join(root, '.next', 'nura-release', 'receipt.json')).catch(() => null), null);
  }
});

test('failed preflight and failed build remove an existing success receipt', async () => {
  for (const scenario of ['preflight', 'build']) {
    const root = await fixture();
    const d = deps(root, { build: async () => {} });
    assert.equal((await verifyRelease({ cwd: root, expectedSha: sha, deps: d })).verified, true);
    const failed = await verifyRelease({
      cwd: root, expectedSha: scenario === 'preflight' ? 'd'.repeat(40) : sha,
      deps: deps(root, { build: async () => { throw new Error('build stopped'); } })
    });
    assert.equal(failed.verified, false);
    assert.equal(failed.pass, false);
    assert.equal(await fs.stat(path.join(root, '.next', 'nura-release', 'receipt.json')).catch(() => null), null);
  }
});

test('a receipt cannot verify when fresh remote is unavailable or differs', async () => {
  const root = await fixture();
  assert.equal((await verifyRelease({ cwd: root, expectedSha: sha, deps: deps(root, { build: async () => {} }) })).verified, true);
  for (const lsRemote of [async () => 'd'.repeat(40), async () => { throw new Error('offline'); }]) {
    const result = await checkRelease({ cwd: root, expectedSha: sha, deps: deps(root, { lsRemote }) });
    assert.equal(result.pass, false);
    assert.equal(result.verificationReceiptValid, false);
  }
});

test('string dirty flags and missing source cannot validate a Vercel record', () => {
  const record = { source: 'git', target: 'production', readyState: 'READY', meta: { githubCommitSha: sha, githubCommitRef: 'main' }, alias: ['www.nura-interiors.com'] };
  for (const flag of ['1', 'true', 1, true]) {
    assert.equal(validateDeploymentIdentity({ ...record, meta: { ...record.meta, gitDirty: flag } }, { expectedSha: sha, expectedDomain: 'www.nura-interiors.com' }).valid, false);
  }
  assert.equal(validateDeploymentIdentity({ ...record, source: undefined }, { expectedSha: sha, expectedDomain: 'www.nura-interiors.com' }).valid, false);
});

function runChild(file, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { cwd, windowsHide: true });
    let out = '', err = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, out, err }));
  });
}

test('real Git checkout CLI reports dirty state and parses expected SHA correctly', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'nura repo ')); fixtures.push(root);
  for (const args of [['init'], ['-c', 'user.name=Release Test', '-c', 'user.email=test@example.invalid', 'commit', '--allow-empty', '-m', 'fixture'], ['remote', 'add', 'origin', 'https://example.invalid/offline']]) {
    const r = await runChild('git', args, root);
    assert.equal(r.code, 0, r.err);
  }
  const script = fileURLToPath(new URL('../scripts/release-guard.mjs', import.meta.url));
  const status = await runChild(process.execPath, [script, 'status'], root);
  assert.equal(status.code, 0, status.err);
  const state = JSON.parse(status.out);
  assert.equal(state.dirty, false);
  await fs.writeFile(path.join(root, 'untracked-source.txt'), 'keep');
  const blocked = await runChild(process.execPath, [script, 'check', '--expected-sha', state.sha], root);
  assert.equal(blocked.code, 1);
  const result = JSON.parse(blocked.out);
  assert.equal(result.source.sha, state.sha);
  assert.equal(result.preflightPass, false);
  assert.ok(result.failures.some((f) => f.includes('untracked')));
  assert.ok(!result.failures.some((f) => f.includes('full 40-character')));
});

test('real Windows-compatible build command creates a receipt only for the exact clean commit', async () => {
  const root = await fixture();
  const guard = fileURLToPath(new URL('../scripts/release-guard.mjs', import.meta.url));
  await fs.copyFile(guard, path.join(root, 'guard.mjs'));
  await fs.writeFile(path.join(root, '.gitignore'), '.next/\n');
  await fs.writeFile(path.join(root, 'package.json'), JSON.stringify({ scripts: { 'build:verified': 'node build.cjs' } }));
  await fs.writeFile(path.join(root, 'build.cjs'), "require('fs').mkdirSync('.next',{recursive:true}); console.log('FIXTURE_BUILD_PASS');");
  for (const args of [
    ['init', '-b', 'main'], ['add', '.'],
    ['-c', 'user.name=Release Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'fixture'],
    ['remote', 'add', 'origin', root]
  ]) {
    const r = await runChild('git', args, root);
    assert.equal(r.code, 0, r.err);
  }
  const head = (await runChild('git', ['rev-parse', 'HEAD'], root)).out.trim();
  const built = await runChild(process.execPath, ['guard.mjs', 'verify', '--expected-sha', head], root);
  assert.equal(built.code, 0, built.out + built.err);
  assert.match(built.out, /FIXTURE_BUILD_PASS/);
  const checked = await runChild(process.execPath, ['guard.mjs', 'check', '--expected-sha', head], root);
  assert.equal(checked.code, 0, checked.out + checked.err);
  assert.equal(JSON.parse(checked.out).verificationReceiptValid, true);
  await fs.appendFile(path.join(root, 'build.cjs'), '\n// changed source\n');
  const blocked = await runChild(process.execPath, ['guard.mjs', 'verify', '--expected-sha', head], root);
  assert.equal(blocked.code, 1);
  assert.equal(JSON.parse(blocked.out).verified, false);
  assert.equal(await fs.stat(path.join(root, '.next', 'nura-release', 'receipt.json')).catch(() => null), null);
});

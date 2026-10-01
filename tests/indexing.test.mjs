import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
for (const [environment, expectedNoindex] of [['production', false], ['preview', true]]) {
  test(`${environment} indexing policy applies consistently to HTML and assets`, () => {
    const env = {...process.env, VERCEL_ENV: environment};
    delete env.SITE_ENV;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', "import config from './next.config.mjs'; console.log(JSON.stringify({env:config.env.SITE_ENV,headers:await config.headers()}));"], {env, encoding:'utf8'});
    assert.equal(result.status, 0, result.stderr);
    const policy = JSON.parse(result.stdout);
    const noindex = policy.headers.some(rule => rule.headers.some(h => h.key==='X-Robots-Tag' && h.value.includes('noindex')));
    assert.equal(noindex, expectedNoindex);
    assert.equal(policy.env, expectedNoindex ? 'staging' : 'production');
  });
}

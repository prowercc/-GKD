import assert from 'node:assert/strict';
import { mkdtemp, rmdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import type { RawRuleProps, RawSubscription } from '@gkd-kit/api';
import { loadApps, sortApps } from '../src/loadApps';
import { validateSubscription } from '../scripts/validateSubscription';

const sample = (rule: RawRuleProps, global = false): RawSubscription => ({
  id: 1,
  name: 'test',
  version: 0,
  ...(global
    ? { globalGroups: [{ key: 0, name: 'test', rules: [rule] }] }
    : {
        apps: [
          {
            id: 'example.test',
            groups: [{ key: 0, name: 'test', rules: [rule] }],
          },
        ],
      }),
});

for (const field of [
  'matches',
  'anyMatches',
  'excludeMatches',
  'excludeAllMatches',
] as const) {
  for (const global of [false, true]) {
    test(`rejects malformed ${field} in ${global ? 'global' : 'app'} rules`, () => {
      assert.throws(() =>
        validateSubscription(
          sample({ matches: '[text="跳过"]', [field]: '[' }, global),
        ),
      );
    });
  }
}

test('accepts valid alternative and exclusion selectors', () => {
  validateSubscription(
    sample({
      anyMatches: ['[vid="skip"]', '[text="跳过"]'],
      excludeAllMatches: ['[text="登录"]', '[text="注册"]'],
    }),
  );
});

test('sorts identical app names by package id regardless of input order', () => {
  const a = { id: 'com.MobileTicket', name: '铁路12306', groups: [] };
  const b = {
    id: 'com.chinarailway.globalticketing',
    name: '铁路12306',
    groups: [],
  };
  assert.deepEqual(sortApps([a, b]), sortApps([b, a]));
});

test('loads an empty subscription when the apps directory is absent', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'gkd-loader-'));
  try {
    assert.deepEqual(await loadApps(path.join(directory, 'absent')), []);
  } finally {
    await rmdir(directory);
  }
});

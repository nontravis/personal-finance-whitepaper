import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildPlugin } from './build-plugin.mjs';

const SRC = fileURLToPath(new URL('../skill/', import.meta.url));
const DEST = fileURLToPath(new URL('../plugins/three-pillar-finance/skills/three-pillar-finance/', import.meta.url));

function files(root) {
  return readdirSync(root, { recursive: true })
    .map((p) => p.toString())
    .filter((p) => {
      try { return statSync(root + p).isFile(); } catch { return false; }
    })
    .sort();
}

test('plugin skill copy matches skill/ file set', () => {
  buildPlugin();
  assert.deepEqual(files(DEST), files(SRC));
});

test('every plugin skill file is byte-identical to skill/', () => {
  buildPlugin();
  for (const f of files(SRC)) {
    assert.deepEqual(readFileSync(DEST + f), readFileSync(SRC + f), `mismatch: ${f}`);
  }
});

test('build is idempotent', () => {
  buildPlugin();
  const a = files(DEST);
  buildPlugin();
  assert.deepEqual(files(DEST), a);
});

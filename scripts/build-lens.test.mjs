import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLens } from './build-lens.mjs';

test('flat lens includes content from every source file', () => {
  const out = buildLens();
  // marker from SKILL.md behavioral contract
  assert.match(out, /Income − Expenses = Freedom Fund/);
  // marker from each pillar
  assert.match(out, /Pillar 1 — Cashflow Management/);
  assert.match(out, /Pillar 2 — Investment/);
  assert.match(out, /Pillar 3 — Savings/);
  // marker from decision rules and pitfalls
  assert.match(out, /Decision rules/);
  assert.match(out, /anti-patterns to catch/);
});

test('flat lens strips SKILL.md YAML frontmatter', () => {
  const out = buildLens();
  assert.doesNotMatch(out, /name: three-pillar-finance/);
});

test('build is deterministic (idempotent)', () => {
  assert.equal(buildLens(), buildLens());
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const source = resolve(dirname(fileURLToPath(import.meta.url)), '..');

test('catalog generation is repeatable and retains release metadata', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'nexus-registry-test-'));
  try {
    mkdirSync(join(fixture, 'scripts'));
    mkdirSync(join(fixture, 'personas'));
    cpSync(join(source, 'scripts/build-registry.js'), join(fixture, 'scripts/build-registry.js'));
    // Node 20 supports ESM .js through package type, without syntax detection.
    writeFileSync(join(fixture, 'package.json'), '{"type":"module"}');
    const metadata = { version: '1.0.0', updatedAt: '2026-01-01T00:00:00.000Z' };
    writeFileSync(join(fixture, 'registry-meta.json'), JSON.stringify(metadata));
    writeFileSync(join(fixture, 'personas/z-example.md'), '---\nname: Example\ndescription: First version\n---\n');
    const build = () => {
      execFileSync(process.execPath, ['scripts/build-registry.js'], { cwd: fixture, stdio: 'pipe' });
      return readFileSync(join(fixture, 'registry.json'), 'utf8');
    };
    const first = build();
    assert.equal(build(), first);
    writeFileSync(join(fixture, 'personas/a-example.md'), '---\nname: Another\ndescription: New persona\n---\n');
    const changed = JSON.parse(build());
    assert.equal(changed.updatedAt, metadata.updatedAt);
    assert.equal(changed.count, 2);
    assert.deepEqual(changed.personas.map(p => p.id), ['a-example', 'z-example']);
    assert.notEqual(JSON.stringify(changed), JSON.stringify(JSON.parse(first)));
    writeFileSync(join(fixture, 'registry-meta.json'), '{"version":"1","updatedAt":"invalid"}');
    const previous = readFileSync(join(fixture, 'registry.json'), 'utf8');
    assert.throws(build);
    assert.equal(readFileSync(join(fixture, 'registry.json'), 'utf8'), previous);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

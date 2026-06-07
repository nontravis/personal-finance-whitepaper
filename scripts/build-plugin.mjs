import { rmSync, cpSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../skills/three-pillar-finance/', import.meta.url));
const DEST = fileURLToPath(new URL('../plugins/three-pillar-finance/skills/three-pillar-finance/', import.meta.url));

export function buildPlugin() {
  rmSync(DEST, { recursive: true, force: true });
  cpSync(SRC, DEST, { recursive: true });
}

function main() {
  buildPlugin();
  console.log('built plugin skill copy from skills/three-pillar-finance/');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

editions=(th en es id zh ja)

for lang in "${editions[@]}"; do
  tectonic "whitepaper-${lang}.tex" --outdir ..
done

echo "Built ${#editions[@]} editions: ${editions[*]}"

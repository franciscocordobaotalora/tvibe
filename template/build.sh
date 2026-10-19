#!/usr/bin/env bash
# Pack the app into an UNSIGNED .wgt, only to inspect it. A TV needs the signed package from sign.sh.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/build"; NAME="TvibeDash"
rm -rf "$OUT"; mkdir -p "$OUT"
( cd "$ROOT/app" && zip -r -q "$OUT/$NAME.wgt" . -x '.*' -x '*.wgt' )
echo "Built (unsigned): $OUT/$NAME.wgt"

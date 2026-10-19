#!/usr/bin/env bash
# Build and sign the TV package with your Samsung certificate profile.
# Usage: TIZEN_CLI=/path/to/tizen-studio/tools/ide/bin/tizen ./sign.sh <profile-name>
set -euo pipefail
[[ $# -eq 1 && -n "$1" ]] || { echo "Usage: ./sign.sh <Samsung-certificate-profile-name>" >&2; exit 2; }
ROOT="$(cd "$(dirname "$0")" && pwd)"
TIZEN="${TIZEN_CLI:-$(command -v tizen || true)}"
[[ -n "$TIZEN" && -x "$TIZEN" ]] || { echo "Tizen CLI not found. Set TIZEN_CLI." >&2; exit 1; }
STAGE="$ROOT/build/stage"; SIGNED="$ROOT/build/signed"; FINAL="$ROOT/build/TvibeDash.signed.wgt"
rm -rf -- "$STAGE" "$SIGNED" "$FINAL"; mkdir -p -- "$STAGE" "$SIGNED"
"$TIZEN" build-web -out "$STAGE" -- "$ROOT/app"
"$TIZEN" package -t wgt -s "$1" -o "$SIGNED" -- "$STAGE"
COUNT=$(find "$SIGNED" -maxdepth 1 -type f -name '*.wgt' | wc -l | tr -d ' ')
[[ "$COUNT" -eq 1 ]] || { echo "Expected one signed WGT, found $COUNT" >&2; exit 1; }
PKG=$(find "$SIGNED" -maxdepth 1 -type f -name '*.wgt')
LISTING=$(unzip -Z1 "$PKG")
for sig in author-signature.xml signature1.xml; do
  grep -Fx "$sig" <<<"$LISTING" >/dev/null || { echo "Missing $sig: this package is NOT signed" >&2; exit 1; }
done
cp -- "$PKG" "$FINAL"; echo "Signed package: $FINAL"

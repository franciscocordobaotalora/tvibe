#!/usr/bin/env bash
# Build and sign the TV package with your Samsung certificate profile.
# Usage: TIZEN_CLI=/path/to/tizen-studio/tools/ide/bin/tizen ./sign.sh <profile-name>
set -euo pipefail
[[ $# -eq 1 && -n "$1" ]] || { echo "Usage: ./sign.sh <Samsung-certificate-profile-name>" >&2; exit 2; }
ROOT="$(cd "$(dirname "$0")" && pwd)"
TIZEN="${TIZEN_CLI:-$(command -v tizen || true)}"
[[ -n "$TIZEN" && -x "$TIZEN" ]] || { echo "Tizen CLI not found. Set TIZEN_CLI." >&2; exit 1; }
STAGE="$ROOT/build/stage"; SIGNED="$ROOT/build/signed"; FINAL="$ROOT/build/TvibeDash.signed.wgt"
rm -rf -- "$STAGE" "$SIGNED"; mkdir -p -- "$STAGE" "$SIGNED"
"$TIZEN" build-web -out "$STAGE" -- "$ROOT/app"
"$TIZEN" package -t wgt -s "$1" -o "$SIGNED" -- "$STAGE"
mapfile -d '' pkgs < <(find "$SIGNED" -maxdepth 1 -type f -name '*.wgt' -print0)
[[ ${#pkgs[@]} -eq 1 ]] || { echo "Expected one signed WGT, found ${#pkgs[@]}" >&2; exit 1; }
for sig in author-signature.xml signature1.xml; do
  unzip -Z1 "${pkgs[0]}" | grep -Fxq "$sig" || { echo "Missing $sig: this package is NOT signed" >&2; exit 1; }
done
cp -- "${pkgs[0]}" "$FINAL"; echo "Signed package: $FINAL"

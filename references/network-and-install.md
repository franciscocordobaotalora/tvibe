# Same WiFi, then push the app to the TV

The LLM builds the app on your computer, so your computer must reach the TV. **Put the laptop on the same WiFi or network as the TV.**

1. Find the TV's IP: **Settings, Connection, Network** (network status). Example: 192.168.0.50.
2. Connect with the SDK's debug bridge (`sdb`, included in Tizen Studio). The default port is **26101**:

```
sdb connect <TV_IP>:26101
sdb devices
```

3. Sign, install and launch with the full Tizen CLI. If you drive the TV through remote shell sessions, the sdb server can end with the session, so run connect, install and launch in the same command sequence:

```
./sign.sh <profile-name>
tizen install -s <TV_IP>:26101 --name TvibeDash.signed.wgt -- build
tizen run -s <TV_IP>:26101 -p TVIBEDASH1.TvibeDash
```

Syntax shown here worked with the Tizen CLI from Tizen Studio 6.1 (Windows) and Tizen SDK 10.0 (Linux). Other versions may differ. Check `tizen help` if a flag is rejected.

## Do not trust "transferred"

A plain `sdb install` can copy the file and install nothing. Success needs **both** lines in the output:

- `install completed`
- `successfully launched pid`

Then look at the TV.

## Read the real app IDs from your TV

```
sdb shell 0 applist
```

Put the IDs you find in `template/app/config.js`. Our first version used placeholder IDs, looked perfect, and every card said "Cannot open". IDs differ by model, region and app version. Never guess them.

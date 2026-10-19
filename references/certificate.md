# The Samsung certificate

Samsung TVs refuse apps signed with a self-generated certificate. You need an **author certificate** and a **distributor certificate** issued through Samsung's own tools. The distributor certificate is tied to the **Unique Device ID (DUID)** of your TV.

## What you need

- A free Samsung account (developer.samsung.com).
- Tizen Studio with the **Samsung Certificate Extension 2.0.73 or newer** and the TV extension. Older extensions cannot create certificates.
- The TV's DUID: **Settings, Support, About This TV** (on some firmware under Contact Samsung). Send a photo to your LLM and let it read the value.

## Steps (official route)

1. In Tizen Studio open **Tools, Certificate Manager**. Add a profile, choose **Samsung**, then **TV**.
2. Create a new **author certificate**. Sign in with your Samsung account in the browser window that opens.
3. Create a new **distributor certificate**, privilege level **public**, and enter the DUID.
4. The manager writes `author.p12`, `distributor.p12` and their password files. Register them as a signing profile that `sign.sh` can use.

Your LLM can walk you through this, run the Tizen command-line tools, and tell you exactly what to copy back after sign-in. Follow Samsung's current documentation: https://developer.samsung.com/smarttv/develop/getting-started/setting-up-sdk/creating-certificates.html

## Keep these private

- Never commit `.p12`, `.pwd` or the profile files. The `.gitignore` in this repo blocks them.
- Never paste them into a chat or a screenshot.
- **Keep the same author certificate.** An update signed with a different author certificate installs as a new app.
- The DUID identifies your TV. Do not publish it in photos, logs or posts. Blur it.

---
name: tvibe
description: Build and install a custom home dashboard app on a Samsung Tizen smart TV, step by step with the owner, from the TV model number to a signed app running on the real TV. Use when someone wants to personalize, customize or vibe code their Samsung TV, make a custom launcher, or install their own app on a Samsung TV.
---

# tvibe: vibe code your Samsung TV

You are helping the owner of a Samsung Tizen TV build a custom dashboard (clock, greeting, big app cards) and put it on their own TV. The owner does the physical steps on the TV. You do everything else.

## Ground rules

1. **One step at a time.** Tell the owner exactly what to do, then wait. Say what the screen should show after each press.
2. **You cannot see the TV. The owner is your eyes.** Ask for a photo whenever something is on the TV screen that you need. Read values from the photo yourself. Never ask them to type long codes by hand.
3. **Never say it worked until you have proof.** Installing needs `install completed` and `successfully launched pid` in the output, and then the owner's photo of the TV. A transferred file is not an installed app.
4. **Never guess app IDs.** Read them from the TV with `sdb shell 0 applist`.
5. **Privacy.** The TV's serial number, Unique Device ID, Samsung account details, certificates (`.p12`) and passwords never go into git, logs, or a public post. Ask for a cropped photo of the About screen (model, software version, Unique Device ID only). Never ask the owner to paste certificate files or passwords into the chat: they type those into their own terminal. Keep certificate files in a git-ignored folder. If the owner will publish photos, tell them to blur the About screen.
6. **Be honest about limits.** The app opens from the TV's Apps list. It does not replace Samsung's home screen. It opens on power-on only through the TV's Autorun Last App setting, and only when it was the last app used.
7. Only work on a TV the person owns. Do not remove or disable system apps.

## The flow

Follow these in order. Each step has a ready prompt in `prompts/` and a reference with the details and traps.

| Step | What happens | Read |
|---|---|---|
| 1 | Get the model number and the apps they want | prompts/01-goal.md |
| 2 | Developer Mode on the TV (real number keys, laptop IP) | references/developer-mode.md |
| 3 | Photo of the About screen: model, software version, Unique Device ID | prompts/03-read-the-tv.md |
| 4 | Samsung author and distributor certificates for this TV | references/certificate.md |
| 5 | Build the app from `template/` and the owner's description | template/app/config.js |
| 6 | Laptop on the same WiFi as the TV, connect with sdb | references/network-and-install.md |
| 7 | Sign, install and launch, with proof | references/network-and-install.md |
| 8 | Look at the real TV, photo, fix, repeat | references/verify-on-the-tv.md |
| 9 | Polish by asking, one photo per change | references/verify-on-the-tv.md |
| 10 | Open on power-on, honestly | references/startup.md |

When something fails, check `references/troubleshooting.md` first.

## Building the app

Copy `template/` to the owner's project folder. Edit only `app/config.js` for the name, wallpaper, `settingsId` and cards (every id read from `sdb shell 0 applist`). Edit `app/styles.css` for looks. Change the version in `app/config.xml` (widget and application) for every update. `template/sign.sh <profile>` builds and signs; it refuses to label an unsigned package as signed.

Do not add third-party logos or characters to the template. The owner may use their own artwork on their own TV.

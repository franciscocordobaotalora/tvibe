# tvibe

**Vibe code your TV.** Tell an AI your TV's model number. It builds a custom home dashboard, gets the Samsung certificate, and installs it on your TV. You write no code.

Built in one afternoon on a real Samsung TV. Samsung first. Android TV and LG next.

> Made by **Francisco Cordoba Otalora** ([@fcordobaot](https://x.com/fcordobaot)).

## What you get

- A clean, full-screen dashboard for your TV: clock, greeting, wallpaper, and big cards for the apps you use.
- A **step-by-step skill** any LLM coding agent can follow: ten steps, each with the exact prompt to give it.
- The traps already solved: the Developer Mode keypad, the Samsung certificate, "transferred" installs that install nothing, wrong app IDs.

## How it works

You do the physical steps on the TV. The LLM does everything else. At every step you show it what you see, with a photo.

| # | Step | Prompt |
|---|---|---|
| 1 | Tell it the goal | [prompts/01-goal.md](prompts/01-goal.md) |
| 2 | Developer Mode | [prompts/02-developer-mode.md](prompts/02-developer-mode.md) |
| 3 | Read the TV details | [prompts/03-read-the-tv.md](prompts/03-read-the-tv.md) |
| 4 | The certificate | [prompts/04-certificate.md](prompts/04-certificate.md) |
| 5 | Describe the app | [prompts/05-describe-the-app.md](prompts/05-describe-the-app.md) |
| 6 | Same WiFi as the TV | [prompts/06-same-wifi.md](prompts/06-same-wifi.md) |
| 7 | Push it to the TV | [prompts/07-push-to-the-tv.md](prompts/07-push-to-the-tv.md) |
| 8 | Test on the real TV | [prompts/08-test-on-the-real-tv.md](prompts/08-test-on-the-real-tv.md) |
| 9 | Polish by asking | [prompts/09-polish.md](prompts/09-polish.md) |
| 10 | Open on power on | [prompts/10-open-on-power-on.md](prompts/10-open-on-power-on.md) |

## Quick start

You need: a Samsung smart TV that runs Tizen, a computer on the same WiFi, a free Samsung developer account, and an LLM coding agent that can run commands.

1. Clone this repo.
2. Give your agent [`SKILL.md`](SKILL.md). If it supports skills, put the folder in its skills directory. Otherwise paste the file in.
3. Say: "Use tvibe. My TV is a Samsung <model>."
4. Follow along. It will ask you for photos and button presses.

## Tested on

| TV | Result |
|---|---|
| Samsung UE43CU7172 (2023 Crystal UHD) | Full flow works, including power-on resume |

Tried it on another model? Open a pull request and add a row.

## What it can't do

- It does not replace Samsung's home screen. It opens from your Apps list.
- It cannot force itself to start at boot. Samsung does not allow that for normal apps. The TV's **Autorun Last App** setting opens it after power-on when it was the last app you used.
- App IDs differ between models and regions, so the agent reads them from your TV.

## Safety and legal

- Use it only on a TV you own. Developer Mode and certificates are Samsung's official routes.
- Keep your certificates (`.p12`), passwords and your TV's Unique Device ID private. The `.gitignore` here blocks the certificate files.
- This project is not affiliated with or endorsed by Samsung. Samsung and Tizen are trademarks of their owners. The template ships no third-party logos or artwork.
- Provided as is, without warranty. You are responsible for what you install on your TV.

## License

MIT. See [LICENSE](LICENSE).

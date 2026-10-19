# Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Developer Mode panel never appears | Used the 123 button, or the wrong screen | Apps, App Settings, and send real number keys from a phone remote app |
| `sdb connect` fails | Laptop not on the TV's network, or the IP typed in Developer Mode is wrong | Same WiFi. Re-enter your laptop IP, then restart the TV |
| File transferred, app not on the TV | Used plain `sdb install` | Use `tizen install` and wait for `install completed` |
| Install rejected | Self-signed certificate, or the distributor certificate has another TV's DUID | Create Samsung certificates for this TV's DUID |
| `Cannot open <app>` on a card | Placeholder or wrong app ID | Run `sdb shell 0 applist` and copy the real IDs into config.js |
| Labels or gradients in the wrong place | Missing `position: relative` on the card | Add it, rebuild, reinstall |
| Old launcher icon after an update | The TV cached the tile | Uninstall the app, install again |
| Invalid password while signing | Wrong profile or password pair | Check the profile. Do not recreate the author certificate casually |
| TV opens Samsung Home after power-on | Autorun Last App is off, or another app was last | See references/startup.md |

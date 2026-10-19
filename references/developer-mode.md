# Developer Mode

Tested on a 2023 Samsung Crystal UHD (UE43CU7172). Menus can differ on other models and firmware.

1. On the TV open **Apps**, then **App Settings**.
2. Send the number keys **1 2 3 4 5**, one per second. A panel called Developer Mode appears.
3. Switch it **On**. In **Host PC IP**, type the **local IP address of your laptop** (for example 192.168.0.20). Not a server in the cloud, not the TV's own address.
4. Press OK, then turn the TV fully off and on (hold the power button for 2 seconds) so the setting takes effect.

## The trap that cost four attempts

The **123** button on the Samsung remote does not type digits on this firmware. It only opens a virtual keypad, and pressing it five times just toggles that keypad. The panel appears only when real number key events arrive. Use the SmartThings phone app's remote number pad (or a USB keyboard, or a remote with physical digits).

The panel did not appear on the About This TV screen. It must be **Apps, App Settings**.

## Find your laptop's IP

- macOS: `ipconfig getifaddr en0`
- Linux: `hostname -I`
- Windows: `ipconfig` and read the IPv4 address

It must be on the same WiFi or network as the TV.

# Open on power on

Samsung's documentation says ordinary TV apps cannot force themselves to start at boot: the Seller Office registration rules reject `on-boot` and `auto-restart` ([registering applications](https://developer.samsung.com/tv-seller-office/guides/applications/registering-application.html)), and prelaunch is not supported on 2019 and newer TVs ([prelaunch guide](https://developer.samsung.com/smarttv/develop/guides/fundamentals/prelaunching-applications.html)). Check those pages for your model. What worked on the 2023 TV we tested:

1. **Settings, All Settings, General & Privacy, Start Screen Options**.
2. Turn **Start with Smart Hub Home** off.
3. Turn **Autorun Last App** on.
4. Open your dashboard and switch the TV off while it is on screen.

The TV now opens your dashboard after power-on. It resumes the **last app**, so after you watch something else, that app may open instead. Leave the dashboard open when you turn the TV off.

Samsung's guides: https://www.samsung.com/ae/support/tv-audio-video/use-autorun-start-screen-options-on-your-samsung-tv/

# Verify on the real TV

A successful install proves delivery, not looks. After every change:

1. Take a photo of the TV screen.
2. Send it to your LLM.
3. Press OK on every card and check that each app opens.

Rules that came from real mistakes:

- When a child element uses `position: absolute`, give its parent `position: relative`. Without it our labels floated under the dock, and the install still said success.
- If the launcher icon does not change after an update, **uninstall the app and install it again**. The TV keeps the old tile.
- Change the version in `config.xml` (both the widget and the application) for every update.
- Show the problem with a photo. Words like "it looks off" give the LLM nothing to fix.

// The one file you edit. Your LLM edits it for you.
var CONFIG = {
  // Shown after the greeting, for example "GOOD EVENING ANA".
  name: "YOUR NAME",

  // Local image paths inside the package. One image is fine.
  wallpapers: ["assets/sample-wallpaper.png"],

  // Application ID of the TV's own Settings app, read from your TV with: sdb shell 0 applist
  // Leave empty to disable the Settings button.
  settingsId: "",

  // One card per app, in order. Any number from 3 to 6 fits.
  // id: the application ID READ FROM YOUR OWN TV (sdb shell 0 applist). These are examples
  //     and differ between models, regions and app versions. Never guess them.
  // color: card background.
  apps: [
    { id: "EXAMPLE.YouTube",  name: "YouTube",     color: "#c4302b" },
    { id: "EXAMPLE.Netflix",  name: "Netflix",     color: "#1c1c1c" },
    { id: "EXAMPLE.Prime",    name: "Prime Video", color: "#00a8e1" },
    { id: "EXAMPLE.Media",    name: "Media",       color: "#6b4fd8" },
    { id: "EXAMPLE.Browser",  name: "Internet",    color: "#1f4e8c" }
  ]
};

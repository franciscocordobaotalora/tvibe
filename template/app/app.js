// Dashboard controller: clock, greeting, network badge, navigation, launch. Cards are built from config.js.
(function () {
  "use strict";

  var tizen = window.tizen || null;
  var current = 0;

  // ---- Clock / greeting -------------------------------------------------
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function greetingFor(hour) {
    var who = (window.CONFIG && CONFIG.name) ? " " + String(CONFIG.name).toUpperCase() : "";
    if (hour < 12) return "GOOD MORNING" + who;
    if (hour < 17) return "GOOD AFTERNOON" + who;
    return "GOOD EVENING" + who;
  }

  function tick() {
    var now = new Date();
    var h = now.getHours();
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    document.getElementById("time").textContent = h12 + ":" + pad(now.getMinutes());
    document.getElementById("ampm").textContent = h < 12 ? "AM" : "PM";
    var days = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
    var months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
    document.getElementById("date").textContent = days[now.getDay()] + " " + now.getDate() + " " + months[now.getMonth()];
    document.getElementById("greeting").textContent = greetingFor(h);
  }
  tick();
  setInterval(tick, 1000 * 15);

  // ---- Wallpaper rotation ----------------------------------------------
  var WALLPAPERS = (window.CONFIG && CONFIG.wallpapers && CONFIG.wallpapers.length)
    ? CONFIG.wallpapers
    : ["assets/wallpaper-1.png"];

  function setWallpaper() {
    if (WALLPAPERS.length === 0) return;
    var now = new Date();
    var idx = now.getMinutes() % WALLPAPERS.length;
    var img = document.getElementById("background");
    img.style.backgroundImage = "url('" + WALLPAPERS[idx] + "')";
    img.style.opacity = 1;
  }
  setWallpaper();
  setInterval(setWallpaper, 1000 * 60 * 5); // rotate every 5 minutes

  // ---- WiFi badge (Samsung TV webapis.network) --------------------------
  function updateWifi() {
    var text = document.getElementById("wifi-text");
    var icon = document.getElementById("wifi-icon");
    var webapis = window.webapis;
    if (webapis && webapis.network) {
      try {
        var type = webapis.network.getActiveConnectionType();
        text.textContent = type === 1 ? "WiFi" : type === 3 ? "Ethernet" : type === 2 ? "Cellular" : "Offline";
        icon.style.color = type === 0 ? "#ff8585" : "#65ecb4";
      } catch (e) {
        text.textContent = navigator.onLine ? "Connected" : "Offline";
      }
    } else {
      text.textContent = navigator.onLine ? "Connected" : "Offline";
    }
  }
  updateWifi();
  setInterval(updateWifi, 1000 * 15);

  // ---- Build the cards from config.js ------------------------------------
  var dock = document.getElementById("app-dock");
  (CONFIG.apps || []).forEach(function (app) {
    var el = document.createElement("div");
    el.className = "app-card";
    el.tabIndex = 0;
    el.dataset.appId = app.id;
    el.dataset.appName = app.name;
    if (app.color) el.style.background = app.color;
    var label = document.createElement("span");
    label.className = "app-name";
    label.textContent = app.name;
    el.appendChild(label);
    dock.appendChild(el);
  });

  // ---- Focus / hero title ----------------------------------------------
  var cards = Array.prototype.slice.call(document.querySelectorAll(".app-card"));
  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      focusCard(i);
      launchApp();
    });
  });

  function focusCard(i) {
    if (cards.length === 0) return;
    current = (i + cards.length) % cards.length;
    cards.forEach(function (c, idx) {
      if (idx === current) {
        c.classList.add("selected");
        c.focus();
      } else {
        c.classList.remove("selected");
        c.blur();
      }
    });
    document.getElementById("hero-title").textContent = cards[current].dataset.appName;
    document.getElementById("hero-hint").textContent = "Press OK to open";
  }
  focusCard(0);

  // ---- Navigation -------------------------------------------------------
  // Samsung TV remote keycodes:
  //   LEFT=37, UP=38, RIGHT=39, DOWN=40, ENTER=13, BACK=10009
  function onKey(e) {
    var code = e.keyCode;
    var key = e.key;
    var handled = false;

    if (code === 37 || key === "ArrowLeft") {
      focusCard(current + cards.length - 1);
      handled = true;
    } else if (code === 39 || key === "ArrowRight") {
      focusCard(current + 1);
      handled = true;
    } else if (code === 13 || key === "Enter") {
      if (document.activeElement && document.activeElement.id === "settings-button") {
        openSettings();
      } else {
        launchApp();
      }
      handled = true;
    } else if (code === 10009 || key === "Escape") {
      onBack();
      handled = true;
    } else if (code === 38 || key === "ArrowUp") {
      // Move to Settings badge
      document.getElementById("settings-button").focus();
      handled = true;
    } else if (code === 40 || key === "ArrowDown") {
      // Move back to cards
      focusCard(current);
      handled = true;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  document.addEventListener("keydown", onKey, true);

  // ---- Launch -----------------------------------------------------------
  function launchApp() {
    var card = cards[current];
    var appId = card ? card.dataset.appId : null;
    if (!appId) return;

    document.getElementById("hero-hint").textContent = "Opening " + card.dataset.appName + "…";

    if (tizen && tizen.application) {
      tizen.application.launch(appId,
        function () {
          // launched successfully
        },
        function (err) {
          document.getElementById("hero-hint").textContent = "Could not open " + card.dataset.appName + (err && err.name ? " (" + err.name + ")" : "");
        }
      );
    } else {
      document.getElementById("hero-hint").textContent = "TV app launcher unavailable";
    }
  }

  // ---- Settings -> native TV settings ----------------------------------
  function openSettings() {
    var SETTINGS_ID = "com.samsung.tv.coba.setting";
    if (tizen && tizen.application) {
      tizen.application.launch(SETTINGS_ID,
        function () { /* opened settings */ },
        function () { /* could not open settings */ }
      );
    }
  }
  document.getElementById("settings-button").addEventListener("click", openSettings);

  // ---- Back / exit -------------------------------------------------------
  function onBack() {
    if (tizen && tizen.application) {
      try {
        var app = tizen.application.getCurrentApplication();
        if (app) { app.exit(); return; }
      } catch (e) { /* fall through */ }
    }
    // Fallback for browser/dev preview
    try { window.close(); } catch (e) { /* ignore */ }
  }
})();

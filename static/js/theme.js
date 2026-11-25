(function () {
  var STORAGE_KEY = 'wimpys-world-theme';
  var colorSchemeMQ = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: light)')
    : { matches: false };

  function resolveTheme(mode) {
    if (mode === 'light') {
      return 'latte';
    }
    if (mode === 'dark') {
      return 'mocha';
    }
    return colorSchemeMQ.matches ? 'latte' : 'mocha';
  }

  function giscusThemeFor(theme) {
    return theme === 'latte' ? 'catppuccin_latte' : 'catppuccin_mocha';
  }

  var syncedGiscusTheme = giscusThemeFor(
    document.documentElement.dataset.theme === 'latte' ? 'latte' : 'mocha'
  );

  function syncGiscusTheme(theme) {
    var resolved = theme === 'latte' || theme === 'mocha'
      ? theme
      : (document.documentElement.dataset.theme === 'latte' ? 'latte' : 'mocha');
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) {
      return;
    }
    var targetTheme = giscusThemeFor(resolved);
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: targetTheme } } },
      'https://giscus.app'
    );
    syncedGiscusTheme = targetTheme;
  }

  window.syncBlogGiscusTheme = syncGiscusTheme;

  function syncButtons(mode) {
    var buttons = document.querySelectorAll('.theme-opt[data-theme-mode]');
    for (var i = 0; i < buttons.length; i += 1) {
      var btn = buttons[i];
      btn.setAttribute('aria-pressed', String(btn.dataset.themeMode === mode));
    }
  }

  function applyMode(mode) {
    if (mode !== 'system' && mode !== 'light' && mode !== 'dark') {
      mode = 'system';
    }
    var resolved = resolveTheme(mode);
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.theme = resolved;

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (_) {
      // Ignore storage quota or private-browsing errors.
    }

    syncButtons(mode);
    syncGiscusTheme(resolved);

    try {
      window.dispatchEvent(
        new CustomEvent('wimpys-theme-change', {
          detail: { theme: resolved, mode: mode },
        })
      );
    } catch (_) {
      // Ignore CustomEvent issues in legacy browsers.
    }
  }

  function init() {
    var initialMode = document.documentElement.dataset.themeMode || 'system';
    syncButtons(initialMode);

    var buttons = document.querySelectorAll('.theme-opt[data-theme-mode]');
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', function (event) {
        var nextMode = event.currentTarget.dataset.themeMode;
        applyMode(nextMode);
      });
    }

    if (colorSchemeMQ && typeof colorSchemeMQ.addEventListener === 'function') {
      colorSchemeMQ.addEventListener('change', function () {
        if ((document.documentElement.dataset.themeMode || 'system') === 'system') {
          applyMode('system');
        }
      });
    }

    window.addEventListener('wimpys-giscus-mounted', function () {
      syncedGiscusTheme = '';
      syncGiscusTheme();
    });

    window.addEventListener('message', function (event) {
      if (event.origin !== 'https://giscus.app') {
        return;
      }
      if (event.data && event.data.giscus) {
        var currentTheme = document.documentElement.dataset.theme === 'latte' ? 'latte' : 'mocha';
        if (giscusThemeFor(currentTheme) !== syncedGiscusTheme) {
          syncGiscusTheme(currentTheme);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

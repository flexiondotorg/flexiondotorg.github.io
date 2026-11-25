(function () {
  var ACTIVE_URL_KEY = 'wimpys-active-card-url';
  var LAUNCH_MS = 155;
  var MAX_TILT_X = 7;
  var MAX_TILT_Y = 8;

  var reducedMQ = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };
  var hoverMQ = window.matchMedia
    ? window.matchMedia('(hover: hover) and (pointer: fine)')
    : { matches: true };

  var pendingTimer = 0;

  function normalizePath(href) {
    try {
      return new URL(href, window.location.href).pathname.replace(/\/+$/, '') || '/';
    } catch (_) {
      return String(href || '').replace(/\/+$/, '') || '/';
    }
  }

  function clearTransitionNames() {
    var cards = document.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      cards[i].style.viewTransitionName = '';
    }
  }

  function resetLaunchState() {
    if (pendingTimer) {
      window.clearTimeout(pendingTimer);
      pendingTimer = 0;
    }
    var grids = document.querySelectorAll('.has-launching-card');
    for (var g = 0; g < grids.length; g += 1) {
      grids[g].classList.remove('has-launching-card');
    }
    var cards = document.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      var card = cards[i];
      card.classList.remove('is-launching', 'is-tilting');
      card.style.removeProperty('--tilt-rx');
      card.style.removeProperty('--tilt-ry');
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
      card.style.viewTransitionName = '';
    }
  }

  function bindCard(card) {
    if (!card || card.dataset.cardBound === '1') {
      return;
    }
    card.dataset.cardBound = '1';

    function resetTilt() {
      card.classList.remove('is-tilting');
      card.style.setProperty('--tilt-rx', '0deg');
      card.style.setProperty('--tilt-ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    }

    card.addEventListener('pointermove', function (event) {
      if (reducedMQ.matches || !hoverMQ.matches || card.classList.contains('is-launching')) {
        return;
      }
      var rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      var nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      var ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      nx = Math.max(-1, Math.min(1, nx));
      ny = Math.max(-1, Math.min(1, ny));

      var rx = (-ny * MAX_TILT_X).toFixed(2) + 'deg';
      var ry = (nx * MAX_TILT_Y).toFixed(2) + 'deg';
      var mx = ((nx + 1) * 50).toFixed(2) + '%';
      var my = ((ny + 1) * 50).toFixed(2) + '%';

      card.classList.add('is-tilting');
      card.style.setProperty('--tilt-rx', rx);
      card.style.setProperty('--tilt-ry', ry);
      card.style.setProperty('--mx', mx);
      card.style.setProperty('--my', my);
    }, { passive: true });

    card.addEventListener('pointerleave', resetTilt);
    card.addEventListener('pointercancel', resetTilt);

    card.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      var clickedLink = event.target && event.target.closest ? event.target.closest('a') : null;
      if (clickedLink && !clickedLink.classList.contains('post-card-link')) {
        return;
      }
      var tagPill = event.target && event.target.closest ? event.target.closest('.tag-pill') : null;
      if (tagPill) {
        return;
      }

      var primaryLink = card.querySelector('.post-card-link');
      var href = (primaryLink && primaryLink.getAttribute('href')) || card.dataset.postUrl;
      if (!href) {
        return;
      }

      var targetPath = normalizePath(href);
      try {
        sessionStorage.setItem(ACTIVE_URL_KEY, targetPath);
      } catch (_) {
        // Ignore storage restrictions.
      }

      if (reducedMQ.matches) {
        return;
      }

      event.preventDefault();
      if (card.classList.contains('is-launching')) {
        return;
      }

      clearTransitionNames();
      card.classList.remove('is-tilting');
      card.style.viewTransitionName = 'active-post-card';
      card.classList.add('is-launching');

      var grid = card.closest('.post-grid, .related-grid');
      if (grid) {
        grid.classList.add('has-launching-card');
      }

      pendingTimer = window.setTimeout(function () {
        pendingTimer = 0;
        window.location.href = href;
      }, LAUNCH_MS);
    });
  }

  function initPlayingCards(root) {
    var scope = root && typeof root.querySelectorAll === 'function' ? root : document;
    var cards = scope.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      bindCard(cards[i]);
    }
  }

  window.initPlayingCards = initPlayingCards;

  window.addEventListener('pageshow', function () {
    resetLaunchState();
  });

  window.addEventListener('pagereveal', function (event) {
    resetLaunchState();
    if (!event || !event.viewTransition) {
      return;
    }
    var savedPath = '';
    try {
      savedPath = sessionStorage.getItem(ACTIVE_URL_KEY) || '';
    } catch (_) {
      savedPath = '';
    }
    if (!savedPath) {
      return;
    }
    var cards = document.querySelectorAll('[data-card][data-post-url]');
    var matched = null;
    for (var i = 0; i < cards.length; i += 1) {
      if (normalizePath(cards[i].dataset.postUrl) === savedPath) {
        matched = cards[i];
        break;
      }
    }
    if (matched) {
      matched.style.viewTransitionName = 'active-post-card';
      if (event.viewTransition.finished && typeof event.viewTransition.finished.finally === 'function') {
        event.viewTransition.finished.finally(function () {
          matched.style.viewTransitionName = '';
        });
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initPlayingCards(document);
    });
  } else {
    initPlayingCards(document);
  }
})();

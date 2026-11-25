(function () {
  var PREFETCH_CACHE_MAX = 24;
  var PREFETCH_DEBOUNCE_MS = 45;
  var PLAY_OUT_MS = 195;
  var FOLD_OUT_MS = 170;
  var DEAL_STAGGER_MS = 35;
  var DEAL_MAX_STAGGER_CARDS = 10;
  var TRANSITION_TIMEOUT_MS = 4500;
  var MAX_TILT_X = 3.5;
  var MAX_TILT_Y = 3;

  var GISCUS_ATTRS = [
    'data-repo',
    'data-repo-id',
    'data-category',
    'data-category-id',
    'data-mapping',
    'data-strict',
    'data-reactions-enabled',
    'data-emit-metadata',
    'data-input-position',
    'data-lang'
  ];

  var SPARKLE_OFFSETS = [
    { rx: 0.04, ry: 0.08, dx: -34, dy: -26, size: 7, diamond: true, colour: 'var(--card-accent)' },
    { rx: 0.96, ry: 0.08, dx: 34, dy: -26, size: 6, diamond: false, colour: 'var(--teal)' },
    { rx: 0.04, ry: 0.92, dx: -32, dy: 28, size: 6, diamond: false, colour: 'var(--lavender)' },
    { rx: 0.96, ry: 0.92, dx: 32, dy: 28, size: 8, diamond: true, colour: 'var(--card-accent)' },
    { rx: 0.50, ry: 0.00, dx: -8, dy: -34, size: 6, diamond: true, colour: 'var(--teal)' },
    { rx: 0.50, ry: 1.00, dx: 10, dy: 34, size: 5, diamond: false, colour: 'var(--card-accent)' },
    { rx: 0.00, ry: 0.50, dx: -38, dy: 4, size: 6, diamond: true, colour: 'var(--lavender)' },
    { rx: 1.00, ry: 0.50, dx: 38, dy: -4, size: 7, diamond: false, colour: 'var(--card-accent)' }
  ];

  var reducedMQ = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };
  var hoverMQ = window.matchMedia
    ? window.matchMedia('(hover: hover) and (pointer: fine)')
    : { matches: true };

  var prefetchCache = new Map();
  var isTransitioning = false;
  var activeBlastStage = null;
  var activeBlastTimer = 0;
  var lastLocationKey = (window.location.pathname || '') + (window.location.search || '');

  function isReducedMotion() {
    return Boolean(reducedMQ && reducedMQ.matches);
  }

  function supportsPjax() {
    return (
      typeof window.fetch === 'function' &&
      typeof window.DOMParser === 'function' &&
      typeof window.URL === 'function' &&
      Boolean(window.history && typeof window.history.pushState === 'function')
    );
  }

  function toUrl(href) {
    try {
      return new URL(href, window.location.href);
    } catch (_) {
      return null;
    }
  }

  function isSameOrigin(url) {
    return Boolean(url && url.origin === window.location.origin);
  }

  function isSearchUrl(url) {
    return Boolean(url && /(?:^|\/)search\/?$/i.test(url.pathname));
  }

  function isPostUrl(url) {
    if (!url || !isSameOrigin(url)) {
      return false;
    }
    var path = url.pathname || '';
    if (!/(?:^|\/)posts\/.+/i.test(path)) {
      return false;
    }
    if (/\.xml$/i.test(path) || /(?:^|\/)posts\/page\/\d+\/?$/i.test(path)) {
      return false;
    }
    return true;
  }

  function cacheKeyFor(url) {
    return url.origin + url.pathname + url.search;
  }

  function prefetchUrl(href) {
    if (!supportsPjax()) {
      return null;
    }
    var url = typeof href === 'string' ? toUrl(href) : href;
    if (!url || !isSameOrigin(url) || isSearchUrl(url) || /\.xml$/i.test(url.pathname)) {
      return null;
    }
    var key = cacheKeyFor(url);
    if (prefetchCache.has(key)) {
      var existing = prefetchCache.get(key);
      prefetchCache.delete(key);
      prefetchCache.set(key, existing);
      return existing;
    }

    var promise = window.fetch(url.href, {
      credentials: 'same-origin',
      headers: { 'X-Requested-With': 'wimpys-pjax' }
    }).then(function (resp) {
      if (!resp || !resp.ok) {
        throw new Error('PJAX HTTP ' + (resp ? resp.status : 'error'));
      }
      var ct = resp.headers && typeof resp.headers.get === 'function'
        ? String(resp.headers.get('content-type') || '')
        : '';
      if (ct && ct.indexOf('text/html') === -1 && ct.indexOf('application/xhtml') === -1) {
        throw new Error('PJAX non-HTML content type');
      }
      return resp.text();
    }).catch(function (err) {
      prefetchCache.delete(key);
      throw err;
    });

    if (prefetchCache.size >= PREFETCH_CACHE_MAX) {
      var oldestKey = prefetchCache.keys().next().value;
      if (oldestKey !== undefined) {
        prefetchCache.delete(oldestKey);
      }
    }
    prefetchCache.set(key, promise);
    return promise;
  }

  function raceWithTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = window.setTimeout(function () {
        if (!settled) {
          settled = true;
          reject(new Error('PJAX transition timeout'));
        }
      }, ms);

      Promise.resolve(promise).then(function (val) {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          resolve(val);
        }
      }, function (err) {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          reject(err);
        }
      });
    });
  }

  function delay(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function parseHtmlDocument(htmlText) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlText, 'text/html');
    var nextMain = doc ? (doc.querySelector('main#main') || doc.getElementById('main')) : null;
    if (!nextMain) {
      throw new Error('PJAX target #main missing');
    }
    return {
      doc: doc,
      main: nextMain,
      title: doc.title || ''
    };
  }

  function syncHeadMeta(parsed) {
    if (parsed.title) {
      document.title = parsed.title;
    }
    if (!parsed.doc || !document.head) {
      return;
    }
    var nextCanonical = parsed.doc.querySelector('link[rel="canonical"]');
    var curCanonical = document.head.querySelector('link[rel="canonical"]');
    if (nextCanonical && curCanonical) {
      curCanonical.setAttribute('href', nextCanonical.getAttribute('href') || '');
    }
    var nextDesc = parsed.doc.querySelector('meta[name="description"]');
    var curDesc = document.head.querySelector('meta[name="description"]');
    if (nextDesc && curDesc) {
      curDesc.setAttribute('content', nextDesc.getAttribute('content') || '');
    }
  }

  function scrollInstantTo(y) {
    var targetY = typeof y === 'number' && isFinite(y) ? Math.max(0, y) : 0;
    try {
      window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
    } catch (_) {
      window.scrollTo(0, targetY);
    }
  }

  function saveCurrentScrollState() {
    try {
      var prev = window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {};
      var next = {};
      for (var k in prev) {
        if (Object.prototype.hasOwnProperty.call(prev, k)) {
          next[k] = prev[k];
        }
      }
      next.wimpysPjax = true;
      next.wimpysScrollY = window.scrollY || 0;
      window.history.replaceState(next, '', window.location.href);
    } catch (_) {
      // Ignore history state restrictions.
    }
  }

  function cleanupBlastStage() {
    if (activeBlastTimer) {
      window.clearTimeout(activeBlastTimer);
      activeBlastTimer = 0;
    }
    if (activeBlastStage && activeBlastStage.parentNode) {
      activeBlastStage.parentNode.removeChild(activeBlastStage);
    }
    activeBlastStage = null;
  }

  function resetTabletopState() {
    cleanupBlastStage();
    isTransitioning = false;
    var cards = document.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      var card = cards[i];
      card.classList.remove('is-tilting', 'card-deal-in');
      card.style.removeProperty('--tilt-rx');
      card.style.removeProperty('--tilt-ry');
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
      card.style.removeProperty('--deal-delay');
    }
  }

  function runWaapi(el, keyframes, options) {
    if (!el || typeof el.animate !== 'function') {
      return Promise.resolve();
    }
    try {
      var anim = el.animate(keyframes, options);
      if (anim && anim.finished && typeof anim.finished.then === 'function') {
        return anim.finished.catch(function () {});
      }
      return new Promise(function (resolve) {
        if (anim) {
          anim.onfinish = resolve;
          anim.oncancel = resolve;
        } else {
          resolve();
        }
      });
    } catch (_) {
      return Promise.resolve();
    }
  }

  function spawnSparkles(rect, accent) {
    if (isReducedMotion() || !rect || !document.body) {
      return;
    }
    for (var i = 0; i < SPARKLE_OFFSETS.length; i += 1) {
      var cfg = SPARKLE_OFFSETS[i];
      var mote = document.createElement('span');
      mote.className = 'card-sparkle' + (cfg.diamond ? ' is-diamond' : '');
      mote.setAttribute('aria-hidden', 'true');
      mote.setAttribute('data-accent', accent || 'mauve');

      var startX = rect.left + rect.width * cfg.rx - cfg.size / 2;
      var startY = rect.top + rect.height * cfg.ry - cfg.size / 2;
      mote.style.left = startX.toFixed(1) + 'px';
      mote.style.top = startY.toFixed(1) + 'px';
      mote.style.width = cfg.size + 'px';
      mote.style.height = cfg.size + 'px';
      mote.style.background = cfg.colour;

      document.body.appendChild(mote);

      var rotEnd = cfg.diamond ? (cfg.dx < 0 ? -135 : 135) : 0;
      (function (node, dx, dy, rot) {
        var removed = false;
        function removeNode() {
          if (removed) {
            return;
          }
          removed = true;
          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }
        runWaapi(node, [
          {
            transform: 'translate3d(0px, 0px, 0px) scale(0.45) rotate(0deg)',
            opacity: 0.95
          },
          {
            transform: 'translate3d(' + (dx * 0.65).toFixed(1) + 'px, ' + (dy * 0.65).toFixed(1) + 'px, 0px) scale(1.1) rotate(' + (rot * 0.6).toFixed(0) + 'deg)',
            opacity: 0.9,
            offset: 0.45
          },
          {
            transform: 'translate3d(' + dx + 'px, ' + dy + 'px, 0px) scale(0.15) rotate(' + rot + 'deg)',
            opacity: 0
          }
        ], {
          duration: 360,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }).then(removeNode);
        window.setTimeout(removeNode, 440);
      })(mote, cfg.dx, cfg.dy, rotEnd);
    }
  }

  function snapshotVisibleCards(clickedCard) {
    var main = document.getElementById('main');
    var scope = (clickedCard && clickedCard.closest && clickedCard.closest('.post-grid, .related-grid')) || main || document;
    var cards = scope.querySelectorAll('[data-card]');
    var viewportH = window.innerHeight || 900;
    var snapshots = [];

    for (var i = 0; i < cards.length; i += 1) {
      var el = cards[i];
      if (typeof el.getBoundingClientRect !== 'function') {
        continue;
      }
      var rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        continue;
      }
      if (rect.bottom < -40 || rect.top > viewportH + 40) {
        continue;
      }
      var w = el.offsetWidth || rect.width;
      var h = el.offsetHeight || rect.height;
      snapshots.push({
        el: el,
        rect: {
          left: rect.left + (rect.width - w) / 2,
          top: rect.top + (rect.height - h) / 2,
          width: w,
          height: h
        },
        isClicked: el === clickedCard
      });
    }
    return snapshots;
  }

  // Clean upward ripple-and-fade inverse of card-deal-in (zero rotation, zero skew)
  // running on the behind-post layer while the incoming article sheet rises over top.
  function launchCardRippleOut(snapshots) {
    cleanupBlastStage();
    if (isReducedMotion() || !snapshots.length || !document.body) {
      return;
    }

    var stage = document.createElement('div');
    stage.className = 'card-blast-stage';
    stage.setAttribute('aria-hidden', 'true');
    document.body.appendChild(stage);
    activeBlastStage = stage;

    var maxDelayMs = 0;
    for (var i = 0; i < snapshots.length; i += 1) {
      var snap = snapshots[i];
      var r = snap.rect;
      var delayMs = Math.min(i * 30, 240);
      if (delayMs > maxDelayMs) {
        maxDelayMs = delayMs;
      }

      var clone = snap.el.cloneNode(true);
      clone.classList.remove('is-tilting', 'card-deal-in');
      clone.classList.add('card-blast-clone');
      clone.removeAttribute('data-card');
      clone.style.left = r.left.toFixed(2) + 'px';
      clone.style.top = r.top.toFixed(2) + 'px';
      clone.style.width = r.width.toFixed(2) + 'px';
      clone.style.height = r.height.toFixed(2) + 'px';
      clone.style.transformStyle = 'flat';
      clone.style.removeProperty('--tilt-rx');
      clone.style.removeProperty('--tilt-ry');
      clone.style.setProperty('--ripple-delay', delayMs + 'ms');
      stage.appendChild(clone);
    }

    activeBlastTimer = window.setTimeout(function () {
      activeBlastTimer = 0;
      if (activeBlastStage === stage) {
        cleanupBlastStage();
      } else if (stage.parentNode) {
        stage.parentNode.removeChild(stage);
      }
    }, maxDelayMs + 380);
  }

  function mountGiscus(root) {
    var scope = root && typeof root.querySelector === 'function' ? root : document;
    var container = scope.querySelector('#giscus-container');
    if (!container || container.dataset.giscusMounted === '1') {
      return false;
    }
    var theme = document.documentElement.dataset.theme === 'latte'
      ? 'catppuccin_latte'
      : 'catppuccin_mocha';
    var script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    for (var i = 0; i < GISCUS_ATTRS.length; i += 1) {
      var attr = GISCUS_ATTRS[i];
      var val = container.getAttribute(attr);
      if (val !== null) {
        script.setAttribute(attr, val);
      }
    }
    script.setAttribute('data-theme', theme);
    container.dataset.giscusMounted = '1';
    container.appendChild(script);

    try {
      window.dispatchEvent(new CustomEvent('wimpys-giscus-mounted', {
        detail: { theme: theme }
      }));
    } catch (_) {
      // Ignore CustomEvent issues in legacy browsers.
    }
    if (typeof window.syncBlogGiscusTheme === 'function') {
      window.syncBlogGiscusTheme(document.documentElement.dataset.theme);
    }
    return true;
  }

  function runPostSwapHooks(main) {
    initPlayingCards(main);
    if (typeof window.initCodeCopy === 'function') {
      window.initCodeCopy(main);
    }
    if (typeof window.mountGiscus === 'function') {
      window.mountGiscus(main);
    }
  }

  function dealCardsIn(root) {
    if (isReducedMotion() || !root) {
      return;
    }
    var cards = root.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      var card = cards[i];
      var delayMs = Math.min(i, DEAL_MAX_STAGGER_CARDS - 1) * DEAL_STAGGER_MS;
      card.style.setProperty('--deal-delay', delayMs + 'ms');
      card.classList.add('card-deal-in');

      (function (el, ms) {
        var cleaned = false;
        function done() {
          if (cleaned) {
            return;
          }
          cleaned = true;
          el.classList.remove('card-deal-in');
          el.style.removeProperty('--deal-delay');
        }
        el.addEventListener('animationend', done, { once: true });
        window.setTimeout(done, ms + 420);
      })(card, delayMs);
    }
  }

  function navigateFromCard(card, targetUrl, isKeyboard) {
    if (isTransitioning) {
      return;
    }
    var main = document.getElementById('main');
    if (!main || !supportsPjax()) {
      window.location.href = targetUrl.href;
      return;
    }

    isTransitioning = true;
    saveCurrentScrollState();

    var startRect = card.getBoundingClientRect();
    var accent = card.getAttribute('data-accent') || 'mauve';
    var visibleSnapshots = snapshotVisibleCards(card);

    // Fetch target HTML (0ms if already warm from hover prefetch).
    var fetchPromise = prefetchUrl(targetUrl);
    if (!fetchPromise) {
      isTransitioning = false;
      window.location.href = targetUrl.href;
      return;
    }

    card.classList.remove('is-tilting');
    spawnSparkles(startRect, accent);

    raceWithTimeout(fetchPromise, TRANSITION_TIMEOUT_MS).then(function (htmlText) {
      var parsed = parseHtmlDocument(htmlText);

      // Ripple visible cards smoothly upward and fade them out behind the rising post.
      launchCardRippleOut(visibleSnapshots);

      // CRITICAL: Update URL via pushState BEFORE swapping <main> so relative
      // post images (faff.gif, ./stadia-controller.webp) resolve to /posts/<slug>/.
      window.history.pushState(
        { wimpysPjax: true, fromCard: true, wimpysScrollY: 0 },
        '',
        targetUrl.href
      );
      lastLocationKey = (targetUrl.pathname || '') + (targetUrl.search || '');
      syncHeadMeta(parsed);

      main.innerHTML = parsed.main.innerHTML;
      scrollInstantTo(0);

      var postSheet = main.querySelector('.post-sheet');
      var tocSidebar = main.querySelector('.toc-sidebar');

      if (postSheet) {
        postSheet.classList.add('is-sheet-entering');
        (function (sheetEl) {
          var done = false;
          function clearSheet() {
            if (done) {
              return;
            }
            done = true;
            sheetEl.classList.remove('is-sheet-entering');
          }
          sheetEl.addEventListener('animationend', clearSheet, { once: true });
          window.setTimeout(clearSheet, 650);
        })(postSheet);
      }

      if (tocSidebar) {
        tocSidebar.classList.add('toc-deal-in');
        (function (tocEl) {
          var done = false;
          function clearToc() {
            if (done) {
              return;
            }
            done = true;
            tocEl.classList.remove('toc-deal-in');
          }
          tocEl.addEventListener('animationend', clearToc, { once: true });
          window.setTimeout(clearToc, 650);
        })(tocSidebar);
      }

      runPostSwapHooks(main);

      if (isKeyboard && typeof main.focus === 'function') {
        try {
          main.focus({ preventScroll: true });
        } catch (_) {
          main.focus();
        }
      }
      isTransitioning = false;
    }).catch(function () {
      resetTabletopState();
      window.location.href = targetUrl.href;
    });
  }

  function navigateReturn(targetUrl, options) {
    var opts = options || {};
    var main = document.getElementById('main');

    function fallback() {
      resetTabletopState();
      if (opts.isPopstate) {
        window.location.reload();
      } else {
        window.location.href = targetUrl.href;
      }
    }

    if (isTransitioning || !main || !supportsPjax() || isSearchUrl(targetUrl)) {
      fallback();
      return;
    }

    var fetchPromise = prefetchUrl(targetUrl);
    if (!fetchPromise) {
      fallback();
      return;
    }

    isTransitioning = true;

    var postSheet = main.querySelector('.post-sheet');
    var tocSidebar = main.querySelector('.toc-sidebar');
    if (postSheet) {
      postSheet.classList.add('sheet-fold-out');
    }
    if (tocSidebar) {
      tocSidebar.classList.add('sheet-fold-out');
    }
    if (!postSheet && main.firstElementChild) {
      main.firstElementChild.classList.add('sheet-fold-out');
    }

    Promise.all([
      raceWithTimeout(fetchPromise, TRANSITION_TIMEOUT_MS),
      delay(FOLD_OUT_MS)
    ]).then(function (results) {
      var htmlText = results[0];
      var parsed = parseHtmlDocument(htmlText);

      if (opts.pushState) {
        window.history.pushState(
          { wimpysPjax: true, wimpysScrollY: 0 },
          '',
          targetUrl.href
        );
      }
      lastLocationKey = (targetUrl.pathname || '') + (targetUrl.search || '');
      syncHeadMeta(parsed);

      main.innerHTML = parsed.main.innerHTML;
      scrollInstantTo(opts.restoreScrollY || 0);

      runPostSwapHooks(main);
      dealCardsIn(main);

      isTransitioning = false;
    }).catch(function () {
      fallback();
    });
  }

  function bindCard(card) {
    if (!card || card.dataset.cardBound === '1') {
      return;
    }
    card.dataset.cardBound = '1';

    var hoverPrefetchTimer = 0;

    function getCardHref() {
      var primaryLink = card.querySelector('.post-card-link');
      return (primaryLink && primaryLink.getAttribute('href')) || card.dataset.postUrl || '';
    }

    function cancelHoverPrefetch() {
      if (hoverPrefetchTimer) {
        window.clearTimeout(hoverPrefetchTimer);
        hoverPrefetchTimer = 0;
      }
    }

    function resetTilt() {
      cancelHoverPrefetch();
      card.classList.remove('is-tilting');
      card.style.setProperty('--tilt-rx', '0deg');
      card.style.setProperty('--tilt-ry', '0deg');
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    }

    card.addEventListener('pointerenter', function () {
      var href = getCardHref();
      if (!href) {
        return;
      }
      cancelHoverPrefetch();
      hoverPrefetchTimer = window.setTimeout(function () {
        hoverPrefetchTimer = 0;
        prefetchUrl(href);
      }, PREFETCH_DEBOUNCE_MS);
    });

    card.addEventListener('focusin', function () {
      var href = getCardHref();
      if (href) {
        prefetchUrl(href);
      }
    });

    card.addEventListener('pointermove', function (event) {
      if (isReducedMotion() || !hoverMQ.matches || isTransitioning || card.classList.contains('card-play-out')) {
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

      var href = getCardHref();
      var targetUrl = toUrl(href);
      if (!targetUrl || !isPostUrl(targetUrl)) {
        return;
      }

      // Bypass PJAX choreography when reduced motion is requested.
      if (isReducedMotion() || !supportsPjax()) {
        return;
      }

      event.preventDefault();
      var isKeyboard = event.detail === 0;
      navigateFromCard(card, targetUrl, isKeyboard);
    });
  }

  function initPlayingCards(root) {
    var scope = root && typeof root.querySelectorAll === 'function' ? root : document;
    var cards = scope.querySelectorAll('[data-card]');
    for (var i = 0; i < cards.length; i += 1) {
      bindCard(cards[i]);
    }
  }

  function bindHeaderReturnNav() {
    var header = document.querySelector('.site-header');
    if (!header || header.dataset.pjaxBound === '1') {
      return;
    }
    header.dataset.pjaxBound = '1';

    header.addEventListener('pointerenter', function (event) {
      if (!document.querySelector('#main .post-sheet')) {
        return;
      }
      var link = event.target && event.target.closest ? event.target.closest('a.brand-block, .site-nav a') : null;
      if (!link) {
        return;
      }
      var targetUrl = toUrl(link.getAttribute('href'));
      if (targetUrl && isSameOrigin(targetUrl) && !isSearchUrl(targetUrl)) {
        prefetchUrl(targetUrl);
      }
    }, true);

    header.addEventListener('click', function (event) {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (isReducedMotion() || !supportsPjax()) {
        return;
      }
      if (!document.querySelector('#main .post-sheet')) {
        return;
      }
      var link = event.target && event.target.closest ? event.target.closest('a.brand-block, .site-nav a') : null;
      if (!link) {
        return;
      }
      var targetUrl = toUrl(link.getAttribute('href'));
      if (!targetUrl || !isSameOrigin(targetUrl) || isSearchUrl(targetUrl)) {
        return;
      }
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        return;
      }
      event.preventDefault();
      saveCurrentScrollState();
      navigateReturn(targetUrl, { pushState: true, restoreScrollY: 0 });
    });
  }

  window.addEventListener('popstate', function (event) {
    var targetUrl = toUrl(window.location.href);
    if (!targetUrl) {
      window.location.reload();
      return;
    }
    var nextKey = (targetUrl.pathname || '') + (targetUrl.search || '');
    if (nextKey === lastLocationKey) {
      return;
    }
    if (isSearchUrl(targetUrl) || isReducedMotion() || !supportsPjax()) {
      window.location.reload();
      return;
    }
    var state = event && event.state;
    var scrollY = state && typeof state.wimpysScrollY === 'number' ? state.wimpysScrollY : 0;
    navigateReturn(targetUrl, {
      pushState: false,
      isPopstate: true,
      restoreScrollY: scrollY
    });
  });

  window.addEventListener('pageshow', function () {
    resetTabletopState();
  });

  window.initPlayingCards = initPlayingCards;
  window.mountGiscus = mountGiscus;

  function boot() {
    if (window.history && typeof window.history.replaceState === 'function' && !window.history.state) {
      saveCurrentScrollState();
    }
    initPlayingCards(document);
    bindHeaderReturnNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

(function () {
  var input = document.getElementById('search-input');
  var resultsEl = document.getElementById('search-results');
  var statusEl = document.getElementById('search-status');
  var fallbackEl = document.getElementById('search-fallback');
  if (!input || !resultsEl || !statusEl) {
    return;
  }

  var VALID_ACCENTS = {
    mauve: true,
    blue: true,
    peach: true,
    green: true,
    teal: true,
    pink: true,
    yellow: true,
    lavender: true,
    sapphire: true,
  };

  var fuse = null;
  var posts = [];

  function safeHref(url) {
    var str = String(url || '');
    return str.charAt(0) === '/' && str.charAt(1) !== '/' ? str : '#';
  }

  function safeAccent(accent) {
    var key = String(accent || '').toLowerCase().trim();
    return VALID_ACCENTS[key] ? key : 'mauve';
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function highlightMatches(text, indices) {
    var raw = String(text || '');
    if (!indices || !indices.length) {
      return escapeHTML(raw);
    }
    var merged = [];
    var sorted = indices.slice().sort(function (a, b) {
      return a[0] - b[0];
    });
    for (var i = 0; i < sorted.length; i += 1) {
      var cur = sorted[i];
      if (!merged.length || cur[0] > merged[merged.length - 1][1] + 1) {
        merged.push([cur[0], cur[1]]);
      } else if (cur[1] > merged[merged.length - 1][1]) {
        merged[merged.length - 1][1] = cur[1];
      }
    }

    var out = '';
    var cursor = 0;
    for (var j = 0; j < merged.length; j += 1) {
      var start = merged[j][0];
      var end = merged[j][1] + 1;
      if (start > cursor) {
        out += escapeHTML(raw.slice(cursor, start));
      }
      out += '<mark>' + escapeHTML(raw.slice(start, end)) + '</mark>';
      cursor = end;
    }
    if (cursor < raw.length) {
      out += escapeHTML(raw.slice(cursor));
    }
    return out;
  }

  function findMatchIndices(matches, key) {
    if (!matches) {
      return null;
    }
    for (var i = 0; i < matches.length; i += 1) {
      if (matches[i].key === key) {
        return matches[i].indices;
      }
    }
    return null;
  }

  function renderResults(query) {
    var trimmed = String(query || '').trim();
    var url = new URL(window.location.href);
    if (trimmed) {
      url.searchParams.set('q', trimmed);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState(null, '', url.toString());

    if (!trimmed) {
      resultsEl.innerHTML = '';
      statusEl.textContent = 'Type to search across ' + posts.length + ' posts.';
      if (fallbackEl) {
        fallbackEl.hidden = false;
      }
      return;
    }

    if (fallbackEl) {
      fallbackEl.hidden = true;
    }

    if (!fuse) {
      statusEl.textContent = 'Loading search index...';
      return;
    }

    var hits = fuse.search(trimmed, { limit: 36 });
    if (!hits.length) {
      resultsEl.innerHTML = '';
      statusEl.textContent = 'No posts matched "' + trimmed + '".';
      if (fallbackEl) {
        fallbackEl.hidden = false;
      }
      return;
    }

    statusEl.textContent = hits.length + (hits.length === 1 ? ' matching post' : ' matching posts') + ' for "' + trimmed + '".';

    var html = [];
    for (var i = 0; i < hits.length; i += 1) {
      var item = hits[i].item;
      var matches = hits[i].matches || [];
      var titleHTML = highlightMatches(item.title, findMatchIndices(matches, 'title'));
      var summaryHTML = highlightMatches(item.summary, findMatchIndices(matches, 'summary'));
      var accent = safeAccent(item.accent);
      var suit = item.suit || '♦';
      var label = item.label || ((item.categories && item.categories.length) ? item.categories[0] : 'Post');
      var dateStr = String(item.date || '');
      var yearStr = dateStr.slice(0, 4);
      var readStr = item.readingTime ? String(item.readingTime) + 'm' : '';
      var cornerIndex = yearStr && readStr ? yearStr + ' · ' + readStr : (yearStr || readStr);
      var href = safeHref(item.permalink);
      var delay = ((i % 12) * 0.55).toFixed(2);
      var tags = (item.tags || []).slice(0, 3);

      var pills = [];
      for (var t = 0; t < tags.length; t += 1) {
        var slug = encodeURIComponent(String(tags[t]).toLowerCase().replace(/\s+/g, '-'));
        pills.push('<a class="tag-pill" href="/tags/' + slug + '/">' + escapeHTML(tags[t]) + '</a>');
      }

      html.push(
        '<article class="post-card" data-card data-accent="' + escapeHTML(accent) + '" data-post-url="' + escapeHTML(href) + '" style="--float-index: ' + i + '; --float-delay: -' + delay + 's;">' +
          '<div class="post-card-frame" aria-hidden="true"></div>' +
          '<div class="post-card-head">' +
            '<div class="post-card-badge">' +
              '<span class="card-suit" aria-hidden="true">' + escapeHTML(suit) + '</span>' +
              '<span class="card-label-pill">' + escapeHTML(label) + '</span>' +
            '</div>' +
            '<span class="post-card-index">' + escapeHTML(cornerIndex) + '</span>' +
          '</div>' +
          '<h2 class="post-card-title"><a class="post-card-link" href="' + escapeHTML(href) + '">' + titleHTML + '</a></h2>' +
          '<p class="post-card-summary">' + summaryHTML + '</p>' +
          '<div class="post-card-foot">' +
            '<div class="post-card-tags">' + pills.join('') + '</div>' +
            '<div class="post-card-corner">' +
              (dateStr ? '<time class="post-card-date" datetime="' + escapeHTML(dateStr) + '">' + escapeHTML(dateStr) + '</time>' : '') +
              '<span class="card-suit card-suit-mirror" aria-hidden="true">' + escapeHTML(suit) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    resultsEl.innerHTML = html.join('');
    if (typeof window.initPlayingCards === 'function') {
      window.initPlayingCards(resultsEl);
    }
  }

  function loadIndex() {
    var indexUrl = input.dataset.indexUrl || '/index.json';
    fetch(indexUrl)
      .then(function (resp) {
        if (!resp.ok) {
          throw new Error('Failed to load index.json');
        }
        return resp.json();
      })
      .then(function (data) {
        posts = Array.isArray(data) ? data : [];
        if (typeof window.Fuse === 'function') {
          fuse = new window.Fuse(posts, {
            includeMatches: true,
            shouldSort: true,
            threshold: 0.35,
            ignoreLocation: true,
            minMatchCharLength: 2,
            keys: [
              { name: 'title', weight: 0.45 },
              { name: 'tags', weight: 0.25 },
              { name: 'categories', weight: 0.1 },
              { name: 'summary', weight: 0.12 },
              { name: 'contents', weight: 0.08 }
            ]
          });
        }
        var initialQuery = new URLSearchParams(window.location.search).get('q') || '';
        if (initialQuery) {
          input.value = initialQuery;
        }
        renderResults(input.value);
      })
      .catch(function () {
        statusEl.textContent = 'Search index could not be loaded.';
      });
  }

  var debounceTimer = 0;
  input.addEventListener('input', function () {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(function () {
      renderResults(input.value);
    }, 80);
  });

  loadIndex();
})();

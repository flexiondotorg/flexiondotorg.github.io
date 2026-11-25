(function () {
  function detectLanguage(codeEl) {
    if (!codeEl) {
      return 'text';
    }
    var dataLang = codeEl.getAttribute('data-lang');
    if (dataLang) {
      return dataLang;
    }
    var match = String(codeEl.className || '').match(/\blanguage-([a-z0-9_+-]+)\b/i);
    if (match && match[1]) {
      return match[1];
    }
    return 'text';
  }

  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-9999px';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  function enhanceBlock(container, codeEl) {
    if (container.querySelector('.code-header')) {
      return;
    }
    var lang = detectLanguage(codeEl);
    var header = document.createElement('div');
    header.className = 'code-header';

    var badge = document.createElement('span');
    badge.className = 'code-lang';
    badge.textContent = lang;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Copy ' + lang + ' code to clipboard');
    btn.textContent = 'Copy';

    var resetTimer = 0;
    btn.addEventListener('click', function () {
      var raw = codeEl ? codeEl.textContent : container.textContent;
      copyText(raw || '').then(function () {
        btn.textContent = 'Copied';
        btn.dataset.copied = 'true';
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          btn.textContent = 'Copy';
          delete btn.dataset.copied;
        }, 1800);
      }).catch(function () {
        btn.textContent = 'Failed';
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          btn.textContent = 'Copy';
        }, 1800);
      });
    });

    header.appendChild(badge);
    header.appendChild(btn);
    container.insertBefore(header, container.firstChild);
  }

  function init() {
    var highlights = document.querySelectorAll('.prose .highlight');
    for (var i = 0; i < highlights.length; i += 1) {
      var block = highlights[i];
      var codeEl = block.querySelector('pre code') || block.querySelector('code');
      enhanceBlock(block, codeEl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

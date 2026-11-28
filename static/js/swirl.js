(function () {
  var SWIRL_PERIOD_SEC = 200 * Math.PI;
  var SWIRL_STATIC_PHASE = 42.0;

  var SWIRL_PALETTES = {
    mocha: {
      a: '#101114',
      b: '#17191e',
      c: '#20232a',
      accent: '#2a2e37',
    },
    latte: {
      a: '#e4e6ea',
      b: '#dadde3',
      c: '#cfd3db',
      accent: '#c5cad4',
    },
  };

  var VERT_SRC = [
    'attribute vec2 aPos;',
    'void main(void) {',
    '  gl_Position = vec4(aPos, 0.0, 1.0);',
    '}',
  ].join('\n');

  // Exact Balatro Catppuccin swirling background math ported from wimpys.world (app.js).
  var FRAG_SRC = [
    'precision highp float;',
    'uniform float uTime;',
    'uniform vec2 uResolution;',
    'uniform vec3 uColorA;',
    'uniform vec3 uColorB;',
    'uniform vec3 uColorC;',
    'uniform vec3 uAccent;',
    '',
    'void main(void) {',
    '  vec2 res = max(uResolution, vec2(1.0));',
    '  vec2 fragPx = vec2(gl_FragCoord.x, res.y - gl_FragCoord.y);',
    '  vec2 uv = (fragPx - 0.5 * res) / min(res.x, res.y);',
    '  float dist = length(uv);',
    '  float angle = atan(uv.y, uv.x);',
    '  float twist = angle + 0.95 / (dist + 0.55) + uTime * 0.12;',
    '  vec2 p = vec2(cos(twist), sin(twist)) * dist * 1.45;',
    '',
    '  for (int i = 0; i < 4; i++) {',
    '    float fi = float(i) * 0.65;',
    '    p += 0.28 * sin(p.yx * 2.15 + vec2(uTime * 0.35 + fi, -uTime * 0.28 + fi));',
    '  }',
    '',
    '  float band1 = 0.5 + 0.5 * sin(p.x * 2.6 + p.y * 1.8 + uTime * 0.18);',
    '  float band2 = 0.5 + 0.5 * cos(p.y * 3.1 - p.x * 1.4 - uTime * 0.14);',
    '  float ribbon = smoothstep(0.68, 0.98, band1 * band2);',
    '',
    '  vec3 col = mix(uColorA, uColorB, smoothstep(0.15, 0.85, band1));',
    '  col = mix(col, uColorC, smoothstep(0.25, 0.92, band2) * 0.62);',
    '  col = mix(col, uAccent, ribbon * 0.45);',
    '',
    '  float vignette = smoothstep(1.38, 0.22, dist);',
    '  col = mix(uColorA, col, 0.52 + 0.48 * vignette);',
    '  gl_FragColor = vec4(col, 1.0);',
    '}',
  ].join('\n');

  function hexToRgb01(hex) {
    var clean = String(hex || '#101114').replace('#', '');
    var n = parseInt(clean, 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }

  function sharedSwirlPhase(reduced) {
    if (reduced) {
      return SWIRL_STATIC_PHASE;
    }
    return (Date.now() / 1000) % SWIRL_PERIOD_SEC;
  }

  function compileShader(gl, type, src) {
    var shader = gl.createShader(type);
    if (!shader) {
      return null;
    }
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vertSrc, fragSrc) {
    var vs = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
    var fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) {
      return null;
    }
    var prog = gl.createProgram();
    if (!prog) {
      return null;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteProgram(prog);
      return null;
    }
    return prog;
  }

  function currentThemeKey() {
    return document.documentElement.dataset.theme === 'latte' ? 'latte' : 'mocha';
  }

  function init() {
    var canvas = document.getElementById('bg-swirl');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'bg-swirl';
      canvas.className = 'bg-swirl';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    var opts = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    };
    var gl =
      canvas.getContext('webgl2', opts) ||
      canvas.getContext('webgl', opts) ||
      canvas.getContext('experimental-webgl', opts);
    if (!gl) {
      canvas.hidden = true;
      return;
    }

    var program = createProgram(gl, VERT_SRC, FRAG_SRC);
    if (!program) {
      canvas.hidden = true;
      return;
    }

    gl.useProgram(program);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    var posLoc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    var uTime = gl.getUniformLocation(program, 'uTime');
    var uResolution = gl.getUniformLocation(program, 'uResolution');
    var uColorA = gl.getUniformLocation(program, 'uColorA');
    var uColorB = gl.getUniformLocation(program, 'uColorB');
    var uColorC = gl.getUniformLocation(program, 'uColorC');
    var uAccent = gl.getUniformLocation(program, 'uAccent');

    var reducedMQ = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: false };
    var rafId = 0;
    var contextLost = false;
    var currentW = 0;
    var currentH = 0;

    function applyPalette() {
      if (contextLost) {
        return;
      }
      var p = SWIRL_PALETTES[currentThemeKey()] || SWIRL_PALETTES.mocha;
      var a = hexToRgb01(p.a);
      var b = hexToRgb01(p.b);
      var c = hexToRgb01(p.c);
      var acc = hexToRgb01(p.accent);
      gl.uniform3f(uColorA, a[0], a[1], a[2]);
      gl.uniform3f(uColorB, b[0], b[1], b[2]);
      gl.uniform3f(uColorC, c[0], c[1], c[2]);
      gl.uniform3f(uAccent, acc[0], acc[1], acc[2]);
    }

    function resize() {
      if (contextLost) {
        return;
      }
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      var w = Math.max(1, Math.round(window.innerWidth * dpr));
      var h = Math.max(1, Math.round(window.innerHeight * dpr));
      if (w === currentW && h === currentH) {
        return;
      }
      currentW = w;
      currentH = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uResolution, w, h);
    }

    function drawFrame(timeSec) {
      if (contextLost) {
        return;
      }
      gl.uniform1f(uTime, timeSec);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function currentPhase() {
      return sharedSwirlPhase(Boolean(reducedMQ && reducedMQ.matches));
    }

    function stopLoop() {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function tick() {
      rafId = 0;
      if (contextLost || reducedMQ.matches || document.hidden) {
        return;
      }
      drawFrame(currentPhase());
      rafId = window.requestAnimationFrame(tick);
    }

    function syncLoop() {
      if (contextLost) {
        stopLoop();
        return;
      }
      if (reducedMQ.matches) {
        stopLoop();
        drawFrame(currentPhase());
        return;
      }
      if (document.hidden) {
        stopLoop();
        return;
      }
      if (!rafId) {
        drawFrame(currentPhase());
        rafId = window.requestAnimationFrame(tick);
      }
    }

    function onThemeUpdate() {
      applyPalette();
      drawFrame(currentPhase());
    }

    applyPalette();
    resize();
    syncLoop();

    window.addEventListener('resize', function () {
      resize();
      drawFrame(currentPhase());
    }, { passive: true });

    window.addEventListener('wimpys-theme-change', onThemeUpdate);

    if (typeof MutationObserver === 'function') {
      var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; i += 1) {
          if (mutations[i].attributeName === 'data-theme') {
            onThemeUpdate();
            break;
          }
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    document.addEventListener('visibilitychange', syncLoop);

    if (reducedMQ && typeof reducedMQ.addEventListener === 'function') {
      reducedMQ.addEventListener('change', syncLoop);
    }

    canvas.addEventListener('webglcontextlost', function (event) {
      event.preventDefault();
      contextLost = true;
      stopLoop();
      canvas.hidden = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* kryptikós: rutas, juego, puntuación, rachas y archivo. */
(function () {
  'use strict';

  const I18N = window.KRYPTIKOS_I18N;
  const PUZZLES = window.KRYPTIKOS_PUZZLES || {};
  const TUT = window.KRYPTIKOS_TUTORIAL || {};
  const W = window.KryptikosWidgets;
  const { ROLES, esc, md, norm, lettersOf, enumStr, clueHTML } = W;

  const LANGS = ['es', 'ca'];
  // Penalizaciones: cámbialas aquí y se actualiza también la página «Cómo se juega»
  const PEN = { definicion: 20, indicador: 15, material: 15, letra: 8, fallo: 5 };
  const BASE = 100, MIN_SCORE = 10;
  const KEY = 'kryptikos:v1';

  const $ = s => document.querySelector(s);

  /* ---------------- Guardado (localStorage) ---------------- */
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && typeof s === 'object') return { lang: s.lang || null, progress: s.progress || {} };
    } catch (e) { /* sin almacenamiento: seguimos en memoria */ }
    return { lang: null, progress: {} };
  }
  const store = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignorar */ } }
  function prog(id) {
    if (!store.progress[id]) {
      store.progress[id] = { hints: { definicion: false, indicador: false, material: false }, revealed: [], wrong: 0, solved: false, gaveUp: false, entry: [], score: null, solvedOn: null };
    }
    return store.progress[id];
  }

  /* ---------------- Fechas ---------------- */
  const pad = n => String(n).padStart(2, '0');
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const todayISO = () => iso(new Date());
  const toDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (s, n) => { const d = toDate(s); d.setDate(d.getDate() + n); return iso(d); };
  const fmtLong = (s, lang) => toDate(s).toLocaleDateString(I18N[lang].locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const fmtShort = (s, lang) => toDate(s).toLocaleDateString(I18N[lang].locale, { weekday: 'short', day: 'numeric', month: 'short' });

  /* ---------------- Crípticos ---------------- */
  const list = lang => (PUZZLES[lang] || []).slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
  // Modo pruebas (?pruebas en la dirección): el archivo muestra también los crípticos futuros
  const TEST_MODE = /(?:^|[?&])pruebas(?:=|&|$)/.test(location.search);
  const published = lang => { const t = todayISO(); return list(lang).filter(p => TEST_MODE || p.fecha <= t); };
  const testURL = on => location.pathname + (on ? '?pruebas' : '') + location.hash;
  const levelTag = (p, T) => p.dificultad
    ? `<span class="level level-${esc(p.dificultad)}">${esc((T.levels && T.levels[p.dificultad]) || p.dificultad)}</span>` : '';
  function daily(lang) {
    const t = todayISO(), pub = published(lang).filter(p => p.fecha <= t);
    const exact = pub.find(p => p.fecha === t);
    return exact ? { p: exact, fresh: true } : { p: pub[pub.length - 1] || null, fresh: false };
  }

  function possible(pr) {
    let s = BASE;
    ROLES.forEach(r => { if (pr.hints[r]) s -= PEN[r]; });
    s -= PEN.letra * pr.revealed.length + PEN.fallo * pr.wrong;
    return Math.max(MIN_SCORE, s);
  }

  // Orden pseudoaleatorio (pero fijo para cada críptico) en que se revelan las letras
  function revealOrder(id, n) {
    let h = 2166136261;
    for (const c of id) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    let seed = h >>> 0;
    const rnd = () => {
      seed = (seed + 0x6D2B79F5) >>> 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const a = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  function stats(lang) {
    const all = published(lang);
    let solved = 0, total = 0;
    const days = new Set();
    all.forEach(p => {
      const pr = store.progress[p.id];
      if (pr && pr.solved) {
        solved++; total += pr.score || 0;
        if (pr.solvedOn === p.fecha) days.add(p.fecha);
      }
    });
    const t = todayISO();
    let d = days.has(t) ? t : addDays(t, -1), cur = 0;
    while (days.has(d)) { cur++; d = addDays(d, -1); }
    let best = 0, run = 0, prev = null;
    [...days].sort().forEach(x => { run = prev && addDays(prev, 1) === x ? run + 1 : 1; best = Math.max(best, run); prev = x; });
    return { solved, count: all.length, total, cur, best };
  }

  function status(pr) {
    if (!pr) return 'new';
    if (pr.solved) return 'solved';
    if (pr.gaveUp) return 'gaveup';
    const started = pr.wrong || pr.revealed.length || ROLES.some(r => pr.hints[r]) || (pr.entry || []).some(Boolean);
    return started ? 'progress' : 'new';
  }

  /* ---------------- Rutas (#/es/, #/ca/arxiu…) ---------------- */
  function href(lang, view, id) {
    const T = I18N[lang];
    if (view === 'archive') return `#/${lang}/${T.slugs.archive}`;
    if (view === 'howto') return `#/${lang}/${T.slugs.howto}`;
    if (view === 'puzzle') return `#/${lang}/p/${encodeURIComponent(id)}`;
    return `#/${lang}/`;
  }
  function parse() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    const lang = parts[0];
    if (!LANGS.includes(lang)) return { redirect: true };
    const T = I18N[lang], seg = parts[1];
    if (seg === T.slugs.archive) return { lang, view: 'archive' };
    if (seg === T.slugs.howto) return { lang, view: 'howto' };
    if (seg === 'p' && parts[2]) return { lang, view: 'puzzle', id: decodeURIComponent(parts[2]) };
    return { lang, view: 'today' };
  }
  function defaultLang() {
    if (LANGS.includes(store.lang)) return store.lang;
    return (navigator.language || '').toLowerCase().startsWith('ca') ? 'ca' : 'es';
  }

  let currentCheck = null; // función «Comprobar» del críptico en pantalla, si lo hay

  function route(keepScroll) {
    currentCheck = null;
    const r = parse();
    if (r.redirect) { location.replace(href(defaultLang(), 'today')); return; }
    store.lang = r.lang; save();
    document.documentElement.lang = r.lang;
    renderChrome(r);
    const app = $('#app');
    app.dataset.view = r.view;
    if (r.view === 'archive') viewArchive(app, r.lang);
    else if (r.view === 'howto') viewHowto(app, r.lang);
    else if (r.view === 'puzzle') viewPuzzle(app, r.lang, r.id);
    else viewToday(app, r.lang);
    if (!keepScroll) window.scrollTo(0, 0);
  }

  function renderChrome(r) {
    const T = I18N[r.lang];
    $('#nav').innerHTML = ['today', 'archive', 'howto'].map(v => {
      const active = r.view === v || (v === 'archive' && r.view === 'puzzle');
      return `<a href="${href(r.lang, v)}" class="${active ? 'active' : ''}"${active ? ' aria-current="page"' : ''}>${esc(T.nav[v])}</a>`;
    }).join('');
    $('#logo').setAttribute('href', href(r.lang, 'today'));
    document.querySelectorAll('.lang-switch button').forEach(b => {
      const on = b.dataset.lang === r.lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $('#footer').textContent = T.footer;
    $('#dateline').textContent = toDate(todayISO()).toLocaleDateString(T.locale, { weekday: 'long', day: 'numeric', month: 'long' });
    $('#tagline').textContent = T.tagline;
    themeLabel();
    document.title = `${T.titles[r.view]} · kryptikós`;
  }

  document.querySelectorAll('.lang-switch button').forEach(b => b.addEventListener('click', () => {
    const r = parse();
    const view = r.redirect || r.view === 'puzzle' ? 'today' : r.view; // los crípticos son distintos en cada idioma
    location.hash = href(b.dataset.lang, view);
  }));

  /* ---------------- Tema claro / oscuro ---------------- */
  // Por defecto sigue al sistema; el botón fija uno u otro y lo recuerda
  const THEME_KEY = 'kryptikos:theme';
  const darkMQ = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === 'dark' : !!(darkMQ && darkMQ.matches);
  };
  function themeLabel() {
    const T = I18N[store.lang] || I18N.es, btn = $('#theme-btn');
    const label = isDark() ? T.theme.toLight : T.theme.toDark;
    btn.setAttribute('aria-label', label);
    btn.title = label;
    const meta = document.querySelectorAll('meta[name="theme-color"]');
    meta.forEach(m => { m.setAttribute('content', isDark() ? '#141413' : '#FAF8F3'); m.removeAttribute('media'); });
  }
  $('#theme-btn').addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignorar */ }
    themeLabel();
  });
  if (darkMQ && darkMQ.addEventListener) darkMQ.addEventListener('change', themeLabel);

  /* ---------------- Vistas ---------------- */
  // Número del críptico dentro de su idioma (por orden de fecha)
  const numOf = (p, lang) => list(lang).findIndex(x => x.id === p.id) + 1;
  const kicker = (label, p, lang) =>
    `<div class="kicker-row"><p class="kicker"><span class="num">${esc(I18N[lang].num)} ${numOf(p, lang)}</span> ${esc(label)}</p>${p.fecha === todayISO() ? '' : `<p class="kicker-date">${esc(fmtLong(p.fecha, lang))}</p>`}</div>`;
  function statsLine(lang) {
    const T = I18N[lang], s = stats(lang);
    return `<p class="stats-line"><b>${s.cur}</b> ${esc(T.stats.streak.toLowerCase())} · <b>${s.best}</b> ${esc(T.stats.best.toLowerCase())} · <b>${s.total}</b> ${esc(T.pointsShort)}</p>`;
  }
  function statsGrid(lang) {
    const T = I18N[lang], s = stats(lang);
    const cell = (v, l) => `<div class="stat"><div class="stat-v">${v}</div><div class="stat-l">${esc(l)}</div></div>`;
    return `<div class="stats-grid">${cell(s.cur, T.stats.streak)}${cell(s.best, T.stats.best)}${cell(`${s.solved}/${s.count}`, T.stats.solved)}${cell(s.total, T.stats.total)}</div>`;
  }

  function viewToday(app, lang) {
    const T = I18N[lang], { p, fresh } = daily(lang);
    if (!p) { app.innerHTML = `<h1>${esc(T.dailyTitle)}</h1><p>${esc(T.noPuzzles)}</p>`; return; }
    const head = `
      ${kicker(T.dailyTitle, p, lang)}
      ${statsLine(lang)}
      ${fresh ? '' : `<p class="note">${esc(T.noNewToday)}</p>`}`;
    renderPuzzle(app, lang, p, head);
  }

  function viewPuzzle(app, lang, id) {
    const T = I18N[lang];
    const p = published(lang).find(x => x.id === id);
    if (!p) { app.innerHTML = `<a class="back" href="${href(lang, 'archive')}">${esc(T.back)}</a><p>${esc(T.notFound)}</p>`; return; }
    const isToday = p.fecha === todayISO();
    const head = `
      <a class="back" href="${href(lang, 'archive')}">${esc(T.back)}</a>
      ${kicker(isToday ? T.dailyTitle : T.titles.puzzle, p, lang)}
      ${isToday ? '' : `<p class="note">${esc(T.archiveNote)}</p>`}`;
    renderPuzzle(app, lang, p, head);
  }

  function viewArchive(app, lang) {
    const T = I18N[lang], t = todayISO();
    const items = published(lang).reverse();
    app.innerHTML = `
      <h1>${esc(T.nav.archive)}</h1>
      <p class="lede">${esc(T.archiveIntro)}</p>
      ${TEST_MODE ? `
      <section class="note test-banner" aria-label="${esc(T.tools.title)}">
        <p>${esc(T.tools.testBanner)}</p>
        <div class="tools-row">
          <a class="btn ghost sm" href="${esc(testURL(false))}">${esc(T.tools.testOff)}</a>
          <button type="button" class="btn ghost sm danger" id="reset">${esc(T.tools.reset)}</button>
        </div>
        <p class="msg" id="tools-msg" aria-live="polite"></p>
      </section>` : ''}
      ${statsGrid(lang)}
      <ol class="archive-list">
        ${items.map(p => {
          const pr = store.progress[p.id], st = status(pr);
          const label = st === 'solved' ? T.status.solved(pr.score) : T.status[st];
          const badge = p.fecha === t ? `<span class="badge">${esc(T.todayBadge)}</span>`
            : p.fecha > t ? `<span class="badge badge-future">${esc(T.tools.upcoming)}</span>` : '';
          return `<li><a class="arch-item st-${st}" href="${href(lang, 'puzzle', p.id)}">
            <span class="arch-date">${esc(fmtShort(p.fecha, lang))}${badge}</span>
            <span class="arch-clue">${esc(p.pista)} <span class="enum">(${enumStr(p.respuesta)})</span> ${levelTag(p, T)}</span>
            <span class="arch-status">${esc(label)}</span>
          </a></li>`;
        }).join('')}
      </ol>`;

    // «Borrar mi progreso» solo existe dentro del modo pruebas
    if (TEST_MODE) $('#reset').addEventListener('click', () => {
      if (!window.confirm(T.tools.resetConfirm)) return;
      store.progress = {};
      save();
      route(true);
      const m = $('#tools-msg');
      if (m) { m.textContent = T.tools.resetDone; m.className = 'msg ok'; }
    });
  }

  function scoringHTML(T) {
    const S = T.scoring;
    const rows = ['definicion', 'indicador', 'material', 'letra', 'fallo']
      .map(k => `<tr><td>${esc(S.rows[k])}</td><td>−${PEN[k]}</td></tr>`).join('');
    return `<p>${S.intro}</p><table class="score-table"><tbody>${rows}</tbody></table>
      <p>${S.min}</p><p>${S.letters}</p><p>${S.streak}</p><p>${S.save}</p>`;
  }
  function viewHowto(app, lang) {
    const T = I18N[lang];
    W.renderTutorial(app, TUT[lang], T, scoringHTML(T));
  }

  /* ---------------- El críptico ---------------- */
  function renderPuzzle(app, lang, p, headHTML) {
    const T = I18N[lang];
    const pr = prog(p.id);
    const letters = lettersOf(p.respuesta);
    const n = letters.length;
    if (!Array.isArray(pr.entry) || pr.entry.length !== n) pr.entry = Array(n).fill('');
    const has = r => Array.isArray(p[r]) && p[r].length > 0;

    const lens = p.respuesta.trim().split(/[\s-]+/).map(w => lettersOf(w).length);
    const gapAfter = new Set();
    lens.slice(0, -1).reduce((acc, l) => { gapAfter.add(acc + l - 1); return acc + l; }, 0);

    app.innerHTML = `
      ${headHTML}
      <div class="puzzle-layout">
      <div class="puzzle-main">
      <div class="clue-card">
        ${levelTag(p, T)}
        <p class="clue" id="clue">${clueHTML(p.pista, p)} <span class="enum">(${enumStr(p.respuesta)})</span></p>
        <div class="legend" id="legend" hidden>${ROLES.map(r => `<span class="tag tag-${r}">${esc(T.roles[r])}</span>`).join('')}</div>
      <div class="answer-zone">
      <form id="answer-form" novalidate autocomplete="off">
        <div class="boxes" id="boxes" role="group" aria-label="${esc(T.answerLabel)}" style="--n:${n}"></div>
        <!-- Botón invisible: permite que el «Intro»/«Ir» del teclado del móvil envíe el formulario -->
        <button type="submit" class="sr-only" tabindex="-1" aria-hidden="true">${esc(T.check)}</button>
      </form>
      <div class="actions" id="actions">
        <button type="button" class="btn primary" id="check">${esc(T.check)}</button>
        <button type="button" class="btn ghost" id="scratch-open" aria-haspopup="dialog">${esc(T.scratch.open)}</button>
        <span class="possible" id="possible"></span>
      </div>
      <p class="msg" id="msg" aria-live="polite"></p>
      </div>
      </div>
      <div class="result" id="result" hidden></div>
      </div>
      <aside class="hints" id="hints">
        <h2 class="h-small">${esc(T.hints)}</h2>
        <div class="hint-grid">
          ${ROLES.map(r => `<button type="button" class="hint hint-${r}" data-hint="${r}"><span>${esc(T.hintLabels[r])}</span><span class="hint-cost">${has(r) ? '−' + PEN[r] : esc(T.notAvailable)}</span></button>`).join('')}
          <button type="button" class="hint hint-letra" data-hint="letra"><span>${esc(T.hintLabels.letra)}</span><span class="hint-cost">−${PEN.letra}</span></button>
        </div>
        <p class="hint-note" id="hint-note"></p>
        <div class="giveup-row"><button type="button" class="btn ghost sm" id="giveup">${esc(T.giveUp)}</button></div>
      </aside>
      </div>
      <dialog class="scratch" id="scratch" aria-labelledby="scratch-title">
        <div class="scratch-head">
          <h2 id="scratch-title">${esc(T.scratch.title)}</h2>
          <button type="button" class="scratch-close" id="scratch-close" aria-label="${esc(T.scratch.close)}">×</button>
        </div>
        <p class="clue scratch-clue">${clueHTML(p.pista, p)} <span class="enum">(${enumStr(p.respuesta)})</span></p>
        <label class="scratch-label" for="scratch-input">${esc(T.scratch.label)}</label>
        <input class="scratch-input" id="scratch-input" type="text" autocomplete="off" spellcheck="false"
               autocapitalize="characters" enterkeyhint="go" placeholder="${esc(T.scratch.placeholder)}">
        <div class="scratch-tiles" id="scratch-tiles" aria-live="polite"></div>
        <div class="scratch-actions">
          <button type="button" class="btn primary" id="scratch-shuffle">${esc(T.scratch.shuffle)}</button>
          <button type="button" class="btn ghost" id="scratch-clear">${esc(T.scratch.clear)}</button>
        </div>
        <p class="hint-note">${esc(T.scratch.note)}</p>
      </dialog>`;

    const boxesEl = $('#boxes'), msg = $('#msg');
    const boxes = letters.map((_, i) => {
      const b = document.createElement('input');
      b.className = 'box' + (gapAfter.has(i) ? ' gap-after' : '');
      b.type = 'text'; b.inputMode = 'text';
      b.setAttribute('enterkeyhint', 'go'); // en el móvil, la tecla de acción es «Ir» y no «Siguiente»
      b.autocomplete = 'off'; b.spellcheck = false;
      b.setAttribute('autocapitalize', 'characters');
      b.setAttribute('autocorrect', 'off');
      b.setAttribute('aria-label', T.letterLabel(i + 1, n));
      boxesEl.appendChild(b);
      return b;
    });

    const done = () => pr.solved || pr.gaveUp;
    const editable = i => !done() && !pr.revealed.includes(i);
    const nextEditable = i => { for (let j = i + 1; j < n; j++) if (editable(j)) return j; return -1; };
    const prevEditable = i => { for (let j = i - 1; j >= 0; j--) if (editable(j)) return j; return -1; };
    const say = (text, cls) => { msg.textContent = text || ''; msg.className = 'msg' + (cls ? ' ' + cls : ''); };

    function update() {
      const isDone = done();
      const clue = $('#clue');
      ROLES.forEach(r => clue.classList.toggle('show-' + r, isDone || pr.hints[r]));
      $('#legend').hidden = !(isDone || ROLES.some(r => pr.hints[r]));

      boxes.forEach((b, i) => {
        const rev = pr.revealed.includes(i);
        b.value = isDone || rev ? letters[i] : (pr.entry[i] || '');
        b.readOnly = isDone || rev;
        b.tabIndex = isDone || rev ? -1 : 0;
        b.classList.toggle('revealed', rev && !isDone);
        b.classList.toggle('solved', pr.solved);
        b.classList.toggle('gaveup', pr.gaveUp);
      });

      const remaining = n - pr.revealed.length;
      document.querySelectorAll('[data-hint]').forEach(btn => {
        const k = btn.dataset.hint;
        if (k === 'letra') btn.disabled = isDone || remaining <= 1;
        else { btn.disabled = isDone || !has(k) || pr.hints[k]; btn.classList.toggle('used', !!pr.hints[k]); }
      });
      $('#hint-note').textContent = !isDone && remaining <= 1 ? T.lastLetter : '';
      $('#possible').innerHTML = isDone ? '' : `${esc(T.possible)}: <b>${possible(pr)}</b> ${esc(T.pointsShort)}`;
      $('#actions').hidden = isDone;
      $('#hints').hidden = isDone;
      if (isDone) renderResult();
    }

    function renderResult() {
      const res = $('#result');
      const s = stats(lang);
      const countsForStreak = pr.solved && pr.solvedOn === p.fecha;
      res.hidden = false;
      res.innerHTML = `
        <div class="result-head">
          <h2>${esc(pr.solved ? T.solvedTitle : T.gaveUpTitle)}</h2>
          <span class="score">${pr.solved ? pr.score : 0} ${esc(T.points)}</span>
        </div>
        <p class="answer-word">${esc(p.respuesta.toUpperCase())}</p>
        <p class="meta">${esc(T.type)}: ${esc(T.types[p.tipo] || p.tipo)}</p>
        <h3 class="h-small">${esc(T.explanation)}</h3>
        <p class="expl">${md(p.explicacion)}</p>
        ${countsForStreak && p.fecha === todayISO() ? `<p class="streak-msg">${esc(T.streakNow(s.cur))}</p>` : ''}
        ${pr.solved && !countsForStreak ? `<p class="note">${esc(T.archiveNoStreak)}</p>` : ''}
        <div class="result-links">
          <a class="btn" href="${href(lang, 'archive')}">${esc(T.goArchive)}</a>
          <a class="btn ghost" href="${href(lang, 'howto')}">${esc(T.nav.howto)}</a>
        </div>`;
    }

    function check() {
      if (done()) return;
      for (let i = 0; i < n; i++) {
        if (editable(i) && !pr.entry[i]) { say(T.fillAll); boxes[i].focus(); return; }
      }
      const ok = letters.every((c, i) => pr.revealed.includes(i) || norm(pr.entry[i]) === norm(c));
      if (ok) {
        pr.score = possible(pr);
        pr.solved = true;
        pr.solvedOn = todayISO();
        save();
        route(true); // repinta (estadísticas incluidas) sin mover el scroll
        const bx = $('#boxes');
        if (bx) { bx.querySelectorAll('.box').forEach((el, i) => el.style.setProperty('--i', i)); bx.classList.add('win'); }
        const r = $('#result');
        if (r) r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        pr.wrong++;
        save();
        say(T.wrong(PEN.fallo), 'bad');
        boxesEl.classList.remove('shake'); void boxesEl.offsetWidth; boxesEl.classList.add('shake');
        update();
      }
    }

    boxes.forEach((b, i) => {
      b.addEventListener('focus', () => b.select());
      b.addEventListener('input', e => {
        if (!editable(i)) return;
        // Preferimos lo que se acaba de escribir o pegar (e.data); si no lo hay, el contenido de la casilla
        let typed = e.data ? lettersOf(norm(e.data)) : lettersOf(norm(b.value));
        if (!e.data && typed.length > 1 && pr.entry[i] && typed[0] === pr.entry[i]) typed = typed.slice(1);
        if (e.data && !typed.length) { b.value = pr.entry[i] || ''; return; } // espacio, número…: se ignora
        if (msg.textContent) say('');
        if (!typed.length) { pr.entry[i] = ''; b.value = ''; save(); return; }
        // Varias letras de golpe (pegar, escritura rápida): se reparten por las casillas siguientes
        let j = i;
        if (typed.length > 1 && typed.length === n - i) {
          // Se ha pegado el resto de la palabra completa: posición a posición, respetando las reveladas
          typed.forEach((ch, k) => { if (editable(i + k)) { pr.entry[i + k] = ch; boxes[i + k].value = ch; } });
          save();
          const last = prevEditable(n); // la casilla sigue enfocada para poder pulsar Intro
          if (last >= 0) boxes[last].focus();
          return;
        }
        let lastWritten = i;
        for (const ch of typed) {
          if (j < 0) break;
          pr.entry[j] = ch; boxes[j].value = ch;
          lastWritten = j;
          j = nextEditable(j);
        }
        save();
        // Al llenar la última casilla, el foco se queda en ella para poder pulsar Intro
        boxes[j >= 0 ? j : lastWritten].focus();
      });
      b.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !b.value) {
          e.preventDefault();
          const j = prevEditable(i);
          if (j >= 0) { pr.entry[j] = ''; boxes[j].value = ''; boxes[j].focus(); save(); }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault(); const j = prevEditable(i); if (j >= 0) boxes[j].focus();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault(); const j = nextEditable(i); if (j >= 0) boxes[j].focus();
        } else if (e.key === 'Enter') {
          e.preventDefault(); check();
        }
      });
    });

    $('#check').addEventListener('click', check);
    $('#answer-form').addEventListener('submit', e => { e.preventDefault(); check(); });
    currentCheck = check;
    setupScratch(p, pr, T);

    document.querySelectorAll('[data-hint]').forEach(btn => btn.addEventListener('click', () => {
      if (done()) return;
      const k = btn.dataset.hint;
      if (k === 'letra') {
        if (n - pr.revealed.length <= 1) return;
        const idx = revealOrder(p.id, n).find(i => !pr.revealed.includes(i));
        if (idx == null) return;
        pr.revealed.push(idx);
        pr.entry[idx] = norm(letters[idx]);
      } else {
        if (!has(k) || pr.hints[k]) return;
        pr.hints[k] = true;
      }
      save(); update();
    }));

    $('#giveup').addEventListener('click', () => {
      if (done() || !window.confirm(T.confirmGiveUp)) return;
      pr.gaveUp = true; pr.score = 0; save();
      route(true);
    });

    update();
  }

  /* ---------------- Borrador: escribir y mezclar letras al azar ---------------- */
  function setupScratch(p, pr, T) {
    const dlg = $('#scratch'), input = $('#scratch-input'), tilesEl = $('#scratch-tiles');
    if (!dlg) return;
    let order = []; // posiciones de las letras escritas, en el orden en que se muestran
    const letters = () => Array.from(input.value.toUpperCase()).filter(W.isL);

    function draw(animate) {
      const ls = letters();
      const before = new Map();
      if (animate) tilesEl.querySelectorAll('.stile').forEach(t => before.set(t.dataset.k, t.getBoundingClientRect()));
      tilesEl.innerHTML = ls.length
        ? order.map(k => `<span class="stile" data-k="${k}">${esc(ls[k])}</span>`).join('')
        : `<span class="scratch-empty">${esc(T.scratch.empty)}</span>`;
      if (!animate) return;
      // Animación FLIP: cada ficha viaja desde su posición anterior a la nueva
      tilesEl.querySelectorAll('.stile').forEach(t => {
        const a = before.get(t.dataset.k);
        if (!a) return;
        const b = t.getBoundingClientRect();
        const dx = a.left - b.left, dy = a.top - b.top;
        if (!dx && !dy) return;
        t.style.transition = 'none';
        t.style.transform = `translate(${dx}px, ${dy}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => { t.style.transition = ''; t.style.transform = ''; }));
      });
    }
    function reset() { order = letters().map((_, i) => i); draw(false); }
    function shuffle() {
      const ls = letters(), n = order.length;
      if (n < 2) { input.focus(); return; }
      const key = o => o.map(k => norm(ls[k])).join('');
      const prev = key(order);
      const allSame = new Set(ls.map(norm)).size < 2;
      const next = order.slice();
      for (let tries = 0; tries < 20; tries++) { // evita repetir el mismo orden que ya se ve
        for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]]; }
        if (allSame || key(next) !== prev) break;
      }
      order = next;
      draw(true);
    }

    input.value = pr.borrador || '';
    reset();
    input.addEventListener('input', () => { pr.borrador = input.value; save(); reset(); });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); shuffle(); } });
    $('#scratch-shuffle').addEventListener('click', shuffle);
    $('#scratch-clear').addEventListener('click', () => { input.value = ''; pr.borrador = ''; save(); reset(); input.focus(); });
    $('#scratch-open').addEventListener('click', () => {
      // La pista del borrador muestra los mismos resaltados que ya hayas pedido
      const dst = dlg.querySelector('.scratch-clue'), src = $('#clue');
      ROLES.forEach(r => dst.classList.toggle('show-' + r, src.classList.contains('show-' + r)));
      if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
      input.focus();
    });
    $('#scratch-close').addEventListener('click', () => {
      if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
    });
  }

  // Intro comprueba la respuesta aunque el foco no esté en una casilla
  // (los botones y enlaces conservan su comportamiento normal con Intro)
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' || e.defaultPrevented || e.isComposing || !currentCheck) return;
    if (e.target.closest && e.target.closest('button, a, textarea, select, dialog')) return;
    e.preventDefault();
    currentCheck();
  });

  // Entrada escondida al modo pruebas: pulsar 5 veces seguidas el logo
  // (también se puede añadir ?pruebas a la dirección)
  let logoTaps = 0, logoTimer = null;
  $('#logo').addEventListener('click', () => {
    if (TEST_MODE) return;
    logoTaps++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => { logoTaps = 0; }, 1500);
    if (logoTaps >= 5) {
      const lang = LANGS.includes(store.lang) ? store.lang : defaultLang();
      location.href = location.pathname + '?pruebas' + href(lang, 'archive');
    }
  });

  window.addEventListener('hashchange', () => route(false));
  route(false);
})();

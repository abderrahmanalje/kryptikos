/* Utilidades compartidas, resaltado de pistas, ejemplos interactivos y tutorial. */
(function () {
  'use strict';

  const ROLES = ['definicion', 'indicador', 'material'];
  const isL = c => /\p{L}/u.test(c);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  // Mini-markdown: **negrita** y *cursiva*
  function md(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>');
  }
  // Mayúsculas sin acentos, pero conservando Ñ y Ç como letras propias
  function norm(s) {
    return String(s).toUpperCase()
      .replace(/Ñ/g, '\u0001').replace(/Ç/g, '\u0002')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\u0001/g, 'Ñ').replace(/\u0002/g, 'Ç');
  }
  function lettersOf(s) { return Array.from(String(s).toUpperCase()).filter(isL); }
  function enumStr(r) { return String(r).trim().split(/[\s-]+/).map(w => lettersOf(w).length).join(','); }

  // Busca `phrase` dentro de `text` respetando límites de palabra y sin solaparse con lo ya marcado
  function findRange(text, phrase, taken) {
    const lt = text.toLowerCase(), lp = String(phrase).toLowerCase();
    if (!lp) return null;
    let from = 0;
    for (;;) {
      const i = lt.indexOf(lp, from);
      if (i < 0) return null;
      const j = i + lp.length;
      const bounded = (i === 0 || !isL(text[i - 1])) && (j >= text.length || !isL(text[j]));
      let free = true;
      for (let k = i; k < j; k++) if (taken[k]) { free = false; break; }
      if (bounded && free) return [i, j];
      from = i + 1;
    }
  }

  // Devuelve el HTML de la pista con cada pieza envuelta en <span class="seg seg-ROL">
  function clueHTML(text, marks) {
    const role = new Array(text.length).fill(null);
    const taken = [];
    ROLES.forEach(r => {
      ((marks && marks[r]) || []).forEach(ph => {
        const rg = findRange(text, ph, taken);
        if (!rg) { console.warn(`[kryptikós] No encuentro «${ph}» (${r}) en «${text}»`); return; }
        for (let k = rg[0]; k < rg[1]; k++) { taken[k] = true; role[k] = r; }
      });
    });
    let out = '', cur = null, buf = '';
    const flush = () => {
      if (!buf) return;
      out += cur ? `<span class="seg seg-${cur}">${esc(buf)}</span>` : esc(buf);
      buf = '';
    };
    for (let k = 0; k < text.length; k++) {
      if (role[k] !== cur) { flush(); cur = role[k]; }
      buf += text[k];
    }
    flush();
    return out;
  }

  /* ---------------- Animación de letras ---------------- */
  // Cada ficha tiene un estado inicial (a) y uno final (b): {x, y, o(pacidad), s(cala)} en unidades de ficha
  function vizModel(v) {
    const L = lettersOf;
    if (v.type === 'rearrange') {
      const from = L(v.from), to = L(v.to), used = [];
      const tiles = from.map((ch, i) => ({ ch, cls: 'mat', a: { x: i, y: 0, o: 1 } }));
      to.forEach((ch, j) => {
        const i = from.findIndex((c, k) => !used[k] && norm(c) === norm(ch));
        if (i >= 0) { used[i] = true; tiles[i].b = { x: j, y: 0, o: 1 }; }
      });
      tiles.forEach(t => { if (!t.b) t.b = { x: t.a.x, y: 0, o: 0 }; });
      return { tiles, cols: Math.max(from.length, to.length), rows: 1 };
    }
    if (v.type === 'insert') {
      const o = L(v.outer), inn = L(v.inner), at = v.at, k = inn.length, tiles = [];
      o.forEach((ch, i) => tiles.push({ ch, cls: 'mat', a: { x: i + k / 2, y: 1, o: 1 }, b: { x: i < at ? i : i + k, y: 1, o: 1 } }));
      inn.forEach((ch, j) => tiles.push({ ch, cls: 'ins', a: { x: at + j, y: 0, o: 1 }, b: { x: at + j, y: 1, o: 1 } }));
      return { tiles, cols: o.length + k, rows: 2 };
    }
    if (v.type === 'join') {
      const parts = v.parts.map(L), GAP = 0.7, tiles = [];
      const shift = (parts.length - 1) * GAP / 2;
      let x0 = 0, x1 = 0;
      parts.forEach((p, pi) => {
        p.forEach(ch => {
          tiles.push({ ch, cls: pi % 2 ? 'ins' : 'mat', a: { x: x0, y: 0, o: 1 }, b: { x: x1 + shift, y: 0, o: 1 } });
          x0++; x1++;
        });
        x0 += GAP;
      });
      return { tiles, cols: x0 - GAP, rows: 1 };
    }
    if (v.type === 'delete') {
      const w = L(v.word), rm = new Set(v.remove), off = rm.size / 2;
      let r = 0;
      const tiles = w.map((ch, i) => {
        const del = rm.has(i);
        const t = { ch, cls: del ? 'del' : 'mat', a: { x: i, y: 0, o: 1 }, b: del ? { x: i, y: 0, o: 0, s: 0.3 } : { x: r + off, y: 0, o: 1 } };
        if (!del) r++;
        return t;
      });
      return { tiles, cols: w.length, rows: 1 };
    }
    if (v.type === 'pick') {
      const chars = Array.from(String(v.text).toUpperCase());
      const tiles = [];
      let x = 0, prevL = false;
      const initials = [];
      chars.forEach(ch => {
        if (isL(ch)) {
          if (!prevL) initials.push(tiles.length);
          tiles.push({ ch, cls: 'plain', a: { x, y: 0, o: 1 } });
          x += 1; prevL = true;
        } else {
          if (ch === ' ') x += 0.5;
          prevL = false;
        }
      });
      const cols = x;
      let picks = [];
      if (v.mode === 'acrostic') {
        picks = initials;
      } else {
        const flat = tiles.map(t => norm(t.ch)).join('');
        const target = lettersOf(v.answer).map(norm).join('');
        const look = v.mode === 'hiddenRev' ? Array.from(target).reverse().join('') : target;
        const i = flat.indexOf(look);
        if (i >= 0) for (let k = 0; k < look.length; k++) picks.push(i + k);
        if (v.mode === 'hiddenRev') picks.reverse();
      }
      tiles.forEach(t => { t.b = { x: t.a.x, y: 0, o: 0.3 }; });
      const off = (cols - picks.length) / 2;
      picks.forEach((ti, k) => { tiles[ti].hl = true; tiles[ti].b = { x: off + k, y: 1, o: 1 }; });
      return { tiles, cols, rows: 2 };
    }
    return null;
  }

  function renderViz(wrap, v) {
    const m = vizModel(v);
    wrap.innerHTML = '';
    if (!m) return () => {};
    const stage = document.createElement('div');
    stage.className = 'viz';
    const avail = (wrap.clientWidth || 300) - 4;
    const step = Math.max(24, Math.min(46, Math.floor(avail / Math.max(1, m.cols))));
    const rowGap = 12;
    stage.style.width = Math.ceil(m.cols * step) + 'px';
    stage.style.height = (m.rows * step + (m.rows - 1) * rowGap) + 'px';
    stage.style.setProperty('--tile', (step - 5) + 'px');
    const els = m.tiles.map((t, i) => {
      const d = document.createElement('span');
      d.className = 'tile ' + t.cls;
      d.textContent = t.ch;
      d.style.transitionDelay = (i * 35) + 'ms';
      stage.appendChild(d);
      return d;
    });
    const place = state => {
      m.tiles.forEach((t, i) => {
        const p = t[state], d = els[i];
        d.style.transform = `translate(${p.x * step}px, ${p.y * (step + rowGap)}px) scale(${p.s || 1})`;
        d.style.opacity = p.o == null ? 1 : p.o;
        d.classList.toggle('hl', state === 'b' && !!t.hl);
      });
    };
    wrap.appendChild(stage);
    const play = () => {
      stage.classList.add('no-anim');
      place('a');
      void stage.offsetWidth;
      stage.classList.remove('no-anim');
      setTimeout(() => place('b'), 450);
    };
    play();
    return play;
  }

  /* ---------------- Ejemplo interactivo ---------------- */
  function renderExample(host, ex, T) {
    const box = document.createElement('div');
    box.className = 'example';
    const roleBtns = ROLES.filter(r => ex[r] && ex[r].length)
      .map(r => `<button type="button" class="chip chip-${r}" data-role="${r}" aria-pressed="false">${esc(T.roles[r])}</button>`).join('');
    box.innerHTML = `
      <p class="clue ex-clue">${clueHTML(ex.pista, ex)} <span class="enum">(${enumStr(ex.respuesta)})</span></p>
      <div class="ex-buttons">
        ${roleBtns}
        ${ex.viz ? `<button type="button" class="chip" data-act="viz">${esc(T.ex.animate)}</button>` : ''}
        <button type="button" class="chip chip-solution" data-act="sol" aria-pressed="false">${esc(T.ex.solution)}</button>
      </div>
      <div class="viz-wrap" hidden></div>
      <div class="ex-solution" hidden>
        <p class="answer-word">${esc(ex.respuesta.toUpperCase())}</p>
        <p>${md(ex.explicacion)}</p>
      </div>`;
    host.appendChild(box);

    const clue = box.querySelector('.ex-clue');
    const setRole = (r, on) => {
      clue.classList.toggle('show-' + r, on);
      const b = box.querySelector(`[data-role="${r}"]`);
      if (b) { b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); }
    };
    box.querySelectorAll('[data-role]').forEach(b => b.addEventListener('click', () => {
      setRole(b.dataset.role, !clue.classList.contains('show-' + b.dataset.role));
    }));

    let play = null;
    const vizBtn = box.querySelector('[data-act="viz"]');
    if (vizBtn) vizBtn.addEventListener('click', () => {
      const wrap = box.querySelector('.viz-wrap');
      if (!play) {
        wrap.hidden = false;
        play = renderViz(wrap, ex.viz);
        vizBtn.textContent = T.ex.replay;
      } else {
        play();
      }
    });

    const solBtn = box.querySelector('[data-act="sol"]');
    solBtn.addEventListener('click', () => {
      const sol = box.querySelector('.ex-solution');
      const show = sol.hidden;
      sol.hidden = !show;
      solBtn.classList.toggle('on', show);
      solBtn.setAttribute('aria-pressed', String(show));
      if (show) ROLES.forEach(r => { if (ex[r] && ex[r].length) setRole(r, true); });
    });
  }

  /* ---------------- Práctica: encuentra la definición ---------------- */
  function renderPractice(host, pr, T) {
    const wrap = document.createElement('div');
    wrap.className = 'practice';
    const tokens = pr.pista.split(/\s+/);
    let pos = 0;
    const ranges = tokens.map(tk => { const i = pr.pista.indexOf(tk, pos); pos = i + tk.length; return [i, pos]; });
    const defIdx = new Set();
    const taken = [];
    (pr.definicion || []).forEach(ph => {
      const r = findRange(pr.pista, ph, taken);
      if (!r) return;
      for (let k = r[0]; k < r[1]; k++) taken[k] = true;
      ranges.forEach(([a, b], ti) => { if (a < r[1] && b > r[0]) defIdx.add(ti); });
    });
    wrap.innerHTML = `
      <p class="pr-prompt">${md(T.practice.prompt)}</p>
      <p class="pr-tokens">${tokens.map((tk, i) => `<button type="button" class="tok" data-i="${i}" aria-pressed="false">${esc(tk)}</button>`).join(' ')} <span class="enum">(${enumStr(pr.respuesta)})</span></p>
      <div class="pr-actions">
        <button type="button" class="btn primary sm" data-act="check">${esc(T.practice.check)}</button>
        <button type="button" class="btn ghost sm" data-act="show">${esc(T.practice.show)}</button>
      </div>
      <p class="msg pr-msg" aria-live="polite"></p>`;
    host.appendChild(wrap);
    const msg = wrap.querySelector('.pr-msg');
    const toks = [...wrap.querySelectorAll('.tok')];
    toks.forEach(t => t.addEventListener('click', () => {
      t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true'));
      msg.textContent = ''; msg.className = 'msg pr-msg';
    }));
    const selected = () => new Set(toks.filter(t => t.getAttribute('aria-pressed') === 'true').map(t => +t.dataset.i));
    wrap.querySelector('[data-act="check"]').addEventListener('click', () => {
      const s = selected();
      if (!s.size) { msg.textContent = T.practice.empty; msg.className = 'msg pr-msg'; return; }
      const ok = s.size === defIdx.size && [...s].every(i => defIdx.has(i));
      if (ok) { msg.innerHTML = `<strong>${esc(T.practice.correct)}</strong> ${md(pr.explicacion)}`; msg.className = 'msg pr-msg ok'; }
      else { msg.textContent = T.practice.wrong; msg.className = 'msg pr-msg bad'; }
    });
    wrap.querySelector('[data-act="show"]').addEventListener('click', () => {
      toks.forEach(t => t.setAttribute('aria-pressed', String(defIdx.has(+t.dataset.i))));
      msg.innerHTML = md(pr.explicacion); msg.className = 'msg pr-msg';
    });
  }

  /* ---------------- Tutorial completo ---------------- */
  function renderTutorial(root, tut, T, scoringHTML) {
    if (!tut) { root.innerHTML = ''; return; }
    root.innerHTML = `
      <article class="tutorial">
        <h1>${esc(tut.title)}</h1>
        <p class="lede">${md(tut.lede)}</p>
        <nav class="toc" aria-label="${esc(T.tut.toc)}">
          ${tut.sections.map(s => `<button type="button" class="toc-item" data-target="tut-${s.id}">${esc(s.title)}</button>`).join('')}
        </nav>
        ${tut.sections.map(s => `
          <section class="tut-section" id="tut-${s.id}">
            <h2>${esc(s.title)}</h2>
            ${s.scoring ? scoringHTML : (s.html || '')}
            ${s.indicadores ? `<div class="indicators"><span class="ind-title">${esc(T.tut.indicators)}</span>${s.indicadores.map(x => `<span class="ind-chip">${esc(x)}</span>`).join('')}</div>` : ''}
            <div class="ex-host"></div>
            ${s.practice ? '<div class="pr-host"></div>' : ''}
          </section>`).join('')}
      </article>`;
    tut.sections.forEach(s => {
      const sec = root.querySelector('#tut-' + s.id);
      const h = sec.querySelector('.ex-host');
      (s.examples || []).forEach(ex => renderExample(h, ex, T));
      if (s.practice) renderPractice(sec.querySelector('.pr-host'), s.practice, T);
    });
    root.querySelectorAll('.toc-item').forEach(b => b.addEventListener('click', () => {
      const t = document.getElementById(b.dataset.target);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  }

  window.KryptikosWidgets = { ROLES, isL, esc, md, norm, lettersOf, enumStr, findRange, clueHTML, renderExample, renderPractice, renderTutorial };
})();

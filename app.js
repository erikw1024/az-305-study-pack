(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const storeKey = 'az305-study-v1';
  let state = {read: {}, quiz: {}};
  try {
    const saved = JSON.parse(localStorage.getItem(storeKey));
    if (saved && typeof saved === 'object') {
      state.read = saved.read && typeof saved.read === 'object' ? saved.read : {};
      state.quiz = saved.quiz && typeof saved.quiz === 'object' ? saved.quiz : {};
    }
  } catch { /* Reading and practising still work if storage is unavailable. */ }
  const pages = [...document.querySelectorAll('[data-page]')];
  const cards = [...document.querySelectorAll('[data-question]')];
  const nav = [...document.querySelectorAll('[data-nav]')];
  const sidebar = document.getElementById('sidebar');
  const menu = document.getElementById('menu-toggle');
  const domain = document.getElementById('domain-filter');
  const status = document.getElementById('status-filter');
  const search = document.getElementById('search');
  const results = document.getElementById('search-results');
  const mobileLayout = window.matchMedia('(max-width: 760px)');
  const backdrop = document.createElement('button');
  backdrop.type = 'button'; backdrop.className = 'nav-backdrop'; backdrop.hidden = true;
  backdrop.setAttribute('aria-label', 'Close navigation');
  sidebar.before(backdrop);
  function save() {
    try { localStorage.setItem(storeKey, JSON.stringify(state)); }
    catch { document.querySelector('.local-progress small').textContent = 'Storage is unavailable; this session still works.'; }
  }
  function closeMenu() {
    sidebar.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu'; backdrop.hidden = true;
    document.documentElement.classList.remove('nav-open');
  }
  backdrop.addEventListener('click', () => { closeMenu(); menu.focus(); });
  mobileLayout.addEventListener('change', () => { closeMenu(); syncTables(); });
  menu.addEventListener('click', () => {
    const open = !sidebar.classList.contains('open');
    if (!open) { closeMenu(); return; }
    sidebar.classList.add('open'); menu.setAttribute('aria-expanded', 'true');
    menu.textContent = 'Close'; backdrop.hidden = false; results.hidden = true;
    document.documentElement.classList.add('nav-open');
  });
  const tableRegions = [...document.querySelectorAll('.table-scroll')];
  tableRegions.forEach((region, index) => {
    const hint = document.createElement('p');
    hint.id = `table-scroll-hint-${index}`; hint.className = 'table-hint';
    hint.textContent = 'Swipe sideways to see all columns.'; hint.hidden = true;
    region.before(hint); region.setAttribute('aria-describedby', hint.id);
  });
  function syncTables() {
    tableRegions.forEach(region => {
      const overflow = region.clientWidth > 0 && region.scrollWidth > region.clientWidth + 1;
      document.getElementById(region.getAttribute('aria-describedby')).hidden = !overflow || !mobileLayout.matches;
      region.tabIndex = overflow ? 0 : -1;
    });
  }
  window.addEventListener('resize', syncTables);
  function activate() {
    let target = null;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* Fall back to overview. */ }
    if (target?.id === 'main' && document.querySelector('[data-page].active')) {
      target.focus(); closeMenu(); results.hidden = true; return;
    }
    let page = target?.closest('[data-page]') || document.getElementById('home');
    pages.forEach(p => p.classList.toggle('active', p === page));
    nav.forEach(a => {
      if (a.dataset.nav === page.id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.getElementById('breadcrumb').textContent = page.id === 'home' ? 'Your study workspace' : (nav.find(a => a.dataset.nav === page.id)?.textContent || 'Study notes');
    document.title = (page.id === 'home' ? 'AZ-305 Study Workspace' : document.getElementById('breadcrumb').textContent + ' · AZ-305');
    closeMenu(); results.hidden = true;
    if (target?.matches('[data-question]')) { domain.value = 'all'; status.value = 'all'; filterQuiz(); }
    requestAnimationFrame(() => {
      syncTables();
      if (target && target !== page) target.scrollIntoView({block: 'start'}); else window.scrollTo({top: 0});
    });
  }
  window.addEventListener('hashchange', activate);
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.hash === location.hash) activate();
    if (!e.target.closest('.topbar')) results.hidden = true;
  });
  function updateReading() {
    const inputs = [...document.querySelectorAll('[data-read]')];
    inputs.forEach(i => { i.checked = state.read[i.dataset.read] === true; });
    const count = inputs.filter(i => i.checked).length;
    document.getElementById('reading-label').textContent = `${count} of ${inputs.length} sections reviewed`;
    const bar = document.getElementById('reading-progress');
    bar.max = inputs.length; bar.value = count; bar.textContent = Math.round(100 * count / inputs.length) + '%';
  }
  document.querySelectorAll('[data-read]').forEach(input => input.addEventListener('change', () => {
    state.read[input.dataset.read] = input.checked; save(); updateReading();
  }));
  function score() {
    const checked = cards.filter(c => state.quiz[c.id]?.checked);
    const correct = checked.filter(c => state.quiz[c.id].choice === c.dataset.answer);
    document.getElementById('quiz-score').textContent = `${checked.length} / ${cards.length}`;
    document.getElementById('quiz-score-label').textContent = `checked · ${correct.length} correct`;
  }
  function filterQuiz() {
    let count = 0;
    cards.forEach(c => {
      const s = state.quiz[c.id];
      const matchesDomain = domain.value === 'all' || c.dataset.domain === domain.value;
      const matchesStatus = status.value === 'all' || (status.value === 'unanswered' && !s?.checked) || (status.value === 'mistakes' && s?.checked && s.choice !== c.dataset.answer);
      c.hidden = !(matchesDomain && matchesStatus); if (!c.hidden) count++;
    });
    document.getElementById('quiz-empty').hidden = count > 0;
  }
  function paint(c) {
    const s = state.quiz[c.id] || {};
    const feedback = c.querySelector('.question-feedback');
    c.querySelectorAll('input[type=radio]').forEach(input => {
      input.checked = input.value === s.choice;
      const label = input.closest('.option');
      label.classList.toggle('correct', !!s.checked && input.value === c.dataset.answer);
      label.classList.toggle('incorrect', !!s.checked && input.checked && input.value !== c.dataset.answer);
    });
    const correct = s.choice === c.dataset.answer;
    feedback.textContent = s.checked ? (correct ? 'Correct. Read the reasoning below.' : 'Review the reasoning below.') : '';
    feedback.className = 'question-feedback' + (s.checked ? (correct ? ' success' : ' retry') : '');
    c.querySelector('button[type=submit]').textContent = s.checked ? 'Answer checked' : 'Check answer';
    c.querySelector('details').open = !!s.checked;
  }
  cards.forEach(c => {
    c.querySelectorAll('input[type=radio]').forEach(input => input.addEventListener('change', () => {
      state.quiz[c.id] = {choice: input.value, checked: false}; save(); paint(c); score();
    }));
    c.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const selected = c.querySelector('input:checked');
      if (!selected) { c.querySelector('.question-feedback').textContent = 'Choose an answer first.'; return; }
      state.quiz[c.id] = {choice: selected.value, checked: true}; save(); paint(c); score(); filterQuiz();
    });
    paint(c);
  });
  domain.addEventListener('change', filterQuiz); status.addEventListener('change', filterQuiz);
  let resetArmed = false;
  const reset = document.getElementById('reset-quiz');
  reset.addEventListener('click', () => {
    if (!resetArmed) { resetArmed = true; reset.textContent = 'Confirm reset'; return; }
    state.quiz = {}; save(); cards.forEach(paint); score(); filterQuiz();
    resetArmed = false; reset.textContent = 'Reset attempt';
  });
  const searchIndex = [];
  pages.forEach(p => {
    if (p.id === 'home') return;
    if (p.id === 'practice') {
      cards.forEach(c => searchIndex.push({id: c.id, title: `${c.id} · ${c.querySelector('h2').textContent}`, body: c.querySelector('.question-stem').textContent}));
    } else {
      let heading = p.querySelector('h1');
      p.querySelectorAll('h3,p,table').forEach(el => {
        if (el.tagName === 'H3') heading = el;
        else searchIndex.push({id: heading.id || p.id, title: heading.textContent, body: el.textContent});
      });
    }
  });
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase(); results.replaceChildren();
    if (q.length < 2) { results.hidden = true; return; }
    const found = searchIndex.filter(x => (x.title + ' ' + x.body).toLowerCase().includes(q));
    const unique = new Map();
    found.forEach(x => { if (!unique.has(x.id)) unique.set(x.id, x); });
    [...unique.values()].slice(0, 12).forEach(x => {
      const a = document.createElement('a'); a.href = '#' + x.id;
      const strong = document.createElement('strong'); strong.textContent = x.title;
      const preview = document.createElement('p'); const body = x.body.replace(/\s+/g, ' ');
      const idx = body.toLowerCase().indexOf(q); const start = Math.max(0, idx - 45);
      preview.textContent = (start ? '…' : '') + body.slice(start, start + 155) + (body.length > start + 155 ? '…' : '');
      a.append(strong, preview); results.append(a);
    });
    if (!unique.size) { const p = document.createElement('p'); p.className = 'search-empty'; p.textContent = 'No matches. Try a service name or design concept.'; results.append(p); }
    results.hidden = false;
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape') {
      const wasOpen = sidebar.classList.contains('open');
      results.hidden = true; closeMenu(); search.blur();
      if (wasOpen) menu.focus();
    }
  });
  let printDetails = [];
  window.addEventListener('beforeprint', () => {
    printDetails = [...document.querySelectorAll('details')].filter(d => !d.open); printDetails.forEach(d => { d.open = true; });
  });
  window.addEventListener('afterprint', () => printDetails.forEach(d => { d.open = false; }));
  document.getElementById('print-pack').addEventListener('click', () => window.print());
  updateReading(); score(); filterQuiz(); activate();
})();

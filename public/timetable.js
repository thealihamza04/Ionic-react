/* ══════════════════════════════════════
   TIMETABLE LOGIC
══════════════════════════════════════ */

// Normal slot times: [startH, startM, endH, endM]
const SLOTS_NORMAL = {
  1: [8, 0, 9, 15],
  2: [9, 30, 10, 45],
  3: [11, 0, 12, 15],
  5: [14, 0, 15, 15]
};

// Ramadan Mon–Thu & Sat
const SLOTS_RAMADAN = {
  1: [8, 0, 8, 55],
  2: [9, 0, 9, 55],
  3: [10, 0, 10, 55],
  5: [12, 0, 12, 55]
};

// Ramadan Friday (slot 3 same, slot 5 = 11:00)
const SLOTS_RAMADAN_FRI = {
  1: [8, 0, 8, 55],
  2: [9, 0, 9, 55],
  3: [10, 0, 10, 55],
  5: [11, 0, 11, 55]
};

function getSlotTimes(slotNum, isFriday, isRamadan) {
  if (!isRamadan) return SLOTS_NORMAL[slotNum];
  if (isFriday) return SLOTS_RAMADAN_FRI[slotNum];
  return SLOTS_RAMADAN[slotNum];
}

function toMins(h, m) {
  return h * 60 + m;
}

function getStatus(slotNum, dayOfWeek, nowMins, isRamadan) {
  const isFriday = dayOfWeek === 5;
  const times = getSlotTimes(slotNum, isFriday, isRamadan);
  if (!times) return null;
  const [sh, sm, eh, em] = times;
  const start = toMins(sh, sm);
  const end = toMins(eh, em);
  if (nowMins >= start && nowMins < end) {
    return {
      state: 'live',
      progress: Math.round(((nowMins - start) / (end - start)) * 100),
      start,
      end
    };
  }
  if (nowMins >= end) return { state: 'done' };
  if (nowMins < start) return { state: 'upcoming', minsUntil: start - nowMins };
  return null;
}

function fmtMins(m) {
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

// ── MODE TOGGLE ──
function setMode(mode) {
  const body = document.body;
  const btnN = document.getElementById('btn-normal');
  const btnR = document.getElementById('btn-ramadan');
  const isRam = mode === 'ramadan';
  body.classList.toggle('ramadan-mode', isRam);
  btnN?.setAttribute('aria-pressed', String(!isRam));
  btnR?.setAttribute('aria-pressed', String(isRam));
  try {
    localStorage.setItem('timeMode', mode);
  } catch {
    // ignore
  }
  applyTimeHighlights();
}

// Expose for inline onclick handlers.
window.setMode = setMode;

// ── TODAY HIGHLIGHT ──
function highlightToday() {
  const jsDay = new Date().getDay();
  const dayMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 0: null };
  const today = dayMap[jsDay];
  if (!today) return;

  // Desktop
  const tbody = document.querySelector('tbody');
  const row = document.querySelector(`tr[data-day="${today}"]`);
  if (row && tbody) {
    tbody.classList.add('has-today');
    row.classList.add('today-row');
    const dayCell = row.querySelector('.td-day');
    const dayText = dayCell?.textContent?.trim() ?? '';
    if (dayCell) {
      dayCell.innerHTML = `<div class="today-day-inner">
      <span class="today-day-name">${dayText}</span>
      <span class="today-pill">Today</span>
    </div>`;
      dayCell.setAttribute('aria-label', `${dayText} — today`);
    }
  }

  // Mobile
  const mobileView = document.querySelector('.mobile-view');
  const card = document.querySelector(`.day-card[data-day="${today}"]`);
  if (card && mobileView) {
    mobileView.classList.add('has-today');
    card.classList.add('today-card');
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
  }
}

// ── LECTURE TIME HIGHLIGHTS ──
function applyTimeHighlights() {
  const now = new Date();
  const jsDay = now.getDay();
  const dayMap = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 0: null };
  const today = dayMap[jsDay];
  if (!today) return;

  const nowMins = toMins(now.getHours(), now.getMinutes());
  const isRamadan = document.body.classList.contains('ramadan-mode');

  // Desktop
  const todayRow = document.querySelector(`tr[data-day="${today}"]`);
  if (todayRow) {
    const cells = todayRow.querySelectorAll('td:not(.td-day)');
    const colToSlot = [1, 2, 3, 5];
    cells.forEach((td, i) => {
      const card = td.querySelector('.card');
      if (!card) return;
      const slotNum = colToSlot[i];
      const result = getStatus(slotNum, today, nowMins, isRamadan);
      if (!result) return;

      card.classList.remove('live', 'done', 'upcoming');
      card
        .querySelectorAll('.live-badge,.done-badge,.upcoming-badge,.progress-bar-wrap')
        .forEach((el) => el.remove());

      card.classList.add(result.state);

      if (result.state === 'live') {
        card.insertAdjacentHTML(
          'beforeend',
          `
          <div class="live-badge"><span class="live-dot"></span>Live now</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${result.progress}%"></div>
          </div>`
        );
      } else if (result.state === 'done') {
        card.insertAdjacentHTML('beforeend', `<div class="done-badge">✓ Done</div>`);
      } else if (result.state === 'upcoming') {
        card.insertAdjacentHTML(
          'beforeend',
          `<div class="upcoming-badge">↑ In ${fmtMins(result.minsUntil)}</div>`
        );
      }
    });
  }

  // Mobile
  const mobileCard = document.querySelector(`.day-card[data-day="${today}"]`);
  if (mobileCard) {
    const slots = mobileCard.querySelectorAll('.m-slot');
    const colToSlot = [1, 2, 3, 5];
    slots.forEach((slot, i) => {
      const content = slot.querySelector('.m-content');
      if (!content) return;
      const slotNum = colToSlot[i] || colToSlot[i];
      const result = getStatus(slotNum, today, nowMins, isRamadan);
      if (!result) return;

      content.classList.remove('live', 'done', 'upcoming');
      content
        .querySelectorAll('.live-badge,.done-badge,.upcoming-badge,.progress-bar-wrap')
        .forEach((el) => el.remove());

      content.classList.add(result.state);

      if (result.state === 'live') {
        content.insertAdjacentHTML(
          'beforeend',
          `
          <div class="live-badge"><span class="live-dot"></span>Live now</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${result.progress}%"></div>
          </div>`
        );
      } else if (result.state === 'done') {
        content.insertAdjacentHTML('beforeend', `<div class="done-badge">✓ Done</div>`);
      } else if (result.state === 'upcoming') {
        content.insertAdjacentHTML(
          'beforeend',
          `<div class="upcoming-badge">↑ In ${fmtMins(result.minsUntil)}</div>`
        );
      }
    });
  }
}

// ── LEGEND PILL FILTER ──
function initPillFilter() {
  const chips = document.querySelectorAll('.leg-chip[data-filter]');
  chips.forEach((chip) => {
    const course = chip.dataset.filter;
    if (!course) return;

    chip.addEventListener('mouseenter', () => {
      document.body.setAttribute('data-filter', course);
    });
    chip.addEventListener('mouseleave', () => {
      document.body.removeAttribute('data-filter');
    });
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const active = document.body.getAttribute('data-filter');
        if (active === course) {
          document.body.removeAttribute('data-filter');
        } else {
          document.body.setAttribute('data-filter', course);
        }
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  highlightToday();
  initPillFilter();
  try {
    const saved = localStorage.getItem('timeMode');
    if (saved === 'ramadan') setMode('ramadan');
  } catch {
    // ignore
  }
  applyTimeHighlights();
  setInterval(applyTimeHighlights, 60000);
});


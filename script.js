/* ============================================================
   CMN112/CMP112/CBS102 — Fundamentals of Statistics CTF
   Interactive engine: validates short-answer responses and
   reveals FOS{...} flags on correct submissions.

   Every challenge is short-answer. A field is either:
     - numeric: { key, label, expected, tol }   (accepts fractions or decimals)
     - text:    { key, label, text:true, accept:[...] }  (case/space-insensitive)
   ============================================================ */

// ===== Challenge configuration =====
const challenges = {
  // ============= CATEGORY 1: PROBABILITY PROTOCOL (01-09) =============
  '01': { fields: [{ key: 'p', label: '$P(\\text{even})$',           expected: 0.5,    tol: 0.005 }], flag: 'FOS{even_one_half}' },
  '02': { fields: [{ key: 'p', label: '$P(\\text{Club})$',           expected: 13/52,  tol: 0.005 }], flag: 'FOS{club_one_quarter}' },
  '03': { fields: [{ key: 'p', label: '$P(\\text{fail})$',           expected: 0.3,    tol: 0.005 }], flag: 'FOS{fail_zero_three}' },
  '04': { fields: [{ key: 'p', label: '$P(\\text{sum}=5)$',          expected: 4/36,   tol: 0.005 }], flag: 'FOS{sum_five_ninth}' },
  '05': { fields: [{ key: 'p', label: '$P(\\text{Python})$',         expected: 0.4,    tol: 0.005 }], flag: 'FOS{marginal_python_04}' },
  '06': { fields: [{ key: 'p', label: '$P(\\text{Q} \\cup \\diamondsuit)$', expected: 16/52, tol: 0.005 }], flag: 'FOS{queen_or_diamond}' },
  '07': { fields: [{ key: 'p', label: '$P(\\text{King}\\mid\\text{Face})$', expected: 4/12, tol: 0.005 }], flag: 'FOS{king_given_face_third}' },
  '08': { fields: [{ key: 'p', label: '$P(A \\cup B)$',              expected: 0.8,    tol: 0.005 }], flag: 'FOS{disjoint_zero_eight}' },
  '09': { fields: [{ key: 'p', label: '$P(A \\cap B)$',              expected: 0.855,  tol: 0.002 }], flag: 'FOS{servers_both_up_0855}' },

  // ============= CATEGORY 2: THE COUNTING CODEX (10-18) =============
  '10': { fields: [{ key: 'n', label: 'Sequences',     expected: 64,     tol: 0 }], flag: 'FOS{coin_seq_64}' },
  '11': { fields: [{ key: 'n', label: '$_7P_3$',       expected: 210,    tol: 0 }], flag: 'FOS{perm_210}' },
  '12': { fields: [{ key: 'n', label: '$6!$',          expected: 720,    tol: 0 }], flag: 'FOS{factorial_720}' },
  '13': { fields: [{ key: 'n', label: 'Combos',        expected: 12,     tol: 0 }], flag: 'FOS{combo_count_12}' },
  '14': { fields: [{ key: 'n', label: '$_{12}C_4$',    expected: 495,    tol: 0 }], flag: 'FOS{committee_495}' },
  '15': { fields: [{ key: 'n', label: 'Arrangements',  expected: 120,    tol: 0 }], flag: 'FOS{circular_120}' },
  '16': { fields: [{ key: 'p', label: '$P(\\text{both red})$', expected: 0.245, tol: 0.003 }], flag: 'FOS{red_pair_0245}' },
  '17': { fields: [{ key: 'n', label: 'PINs',          expected: 100000, tol: 0 }], flag: 'FOS{pin_forge_100000}' },
  '18': { fields: [{ key: 'p', label: '$P(A \\cap B)$', expected: 0.2,   tol: 0.005 }], flag: 'FOS{chain_rule_02}' },

  // ============= CATEGORY 3: BELL CURVE BUREAU (19-27) =============
  '19': { fields: [{ key: 'p', label: 'Percentage',  expected: 68,   tol: 0 }],     flag: 'FOS{empirical_68}' },
  '20': { fields: [{ key: 'p', label: 'Percentage',  expected: 99.7, tol: 0.05 }],  flag: 'FOS{within_3sigma_997}' },
  '21': { fields: [{ key: 'z', label: '$z$',         expected: 2,    tol: 0.02 }],  flag: 'FOS{zscore_is_2}' },
  '22': { fields: [{ key: 'u', label: 'Upper bound', expected: 66,   tol: 0 }],     flag: 'FOS{range_upper_66}' },
  '23': { fields: [{ key: 'z', label: '$z$',         expected: -1.5, tol: 0.02 }],  flag: 'FOS{zscore_neg15}' },
  '24': { fields: [{ key: 'w', label: 'Classification', text: true, accept: ['unusual', 'unusual value'] }], flag: 'FOS{value_unusual}' },
  '25': { fields: [{ key: 'p', label: '$P(X < 80)$',          expected: 0.9641, tol: 0.002 }], flag: 'FOS{leopard_09641}' },
  '26': { fields: [{ key: 'p', label: '$P(-1.5 < Z < 1.8)$',  expected: 0.8973, tol: 0.002 }], flag: 'FOS{between_08973}' },
  '27': { fields: [{ key: 'x', label: '$x$',                  expected: 75,     tol: 0 }],     flag: 'FOS{reverse_z_75}' },

  // ============= CATEGORY 4: SAMPLING STATION (28-36) =============
  '28': { fields: [{ key: 'm',  label: '$\\mu_{\\bar{x}}$',          expected: 75, tol: 0 }],     flag: 'FOS{sampling_mean_75}' },
  '29': { fields: [{ key: 'se', label: '$\\sigma_{\\bar{x}}$',       expected: 3,  tol: 0.01 }],  flag: 'FOS{stderr_is_3}' },
  '30': { fields: [{ key: 'n',  label: '$n \\geq$',                  expected: 30, tol: 0 }],     flag: 'FOS{clt_minimum_30}' },
  '31': { fields: [{ key: 'se', label: '$\\sigma_{\\bar{x}}$ (Kina)', expected: 50, tol: 0.5 }],  flag: 'FOS{vendor_stderr_50}' },
  '32': { fields: [{ key: 'z',  label: '$z$',                        expected: -2, tol: 0.05 }],  flag: 'FOS{sample_z_neg2}' },
  '33': { fields: [{ key: 'se', label: '$\\sigma_{\\bar{x}}$',       expected: 2,  tol: 0.01 }],  flag: 'FOS{stderr_is_2}' },
  '34': { fields: [{ key: 'se', label: '$\\sigma_{\\bar{x}}$ (Kina)', expected: 15, tol: 0.1 }],  flag: 'FOS{pmv_stderr_15}' },
  '35': { fields: [{ key: 'p',  label: '$P(465 < \\bar{X} < 495)$',  expected: 0.6826, tol: 0.002 }], flag: 'FOS{pmv_between_06826}' },
  '36': { fields: [{ key: 'se', label: '$\\sigma_{\\bar{x}}$ (kg)',  expected: 0.75, tol: 0.01 }], flag: 'FOS{cocoa_stderr_075}' },

  // ============= CATEGORY 5: THE REGRESSION ENGINE (37-45) =============
  '37': { fields: [{ key: 'm',  label: 'Slope $m$',     expected: 12,   tol: 0 }],     flag: 'FOS{slope_is_12}' },
  '38': { fields: [{ key: 'c',  label: '$y$-intercept', expected: 38.5, tol: 0.05 }],  flag: 'FOS{intercept_385}' },
  '39': { fields: [{ key: 'r2', label: '$R^2$',         expected: 0.64, tol: 0.005 }], flag: 'FOS{rsquared_064}' },
  '40': { fields: [{ key: 'y',  label: '$\\hat{y}$',    expected: 74.9, tol: 0.05 }],  flag: 'FOS{predicted_749}' },
  '41': { fields: [{ key: 'm',  label: '$m$',           expected: 2.6,  tol: 0.02 }],  flag: 'FOS{slope_26}' },
  '42': { fields: [{ key: 'w',  label: 'Strength + direction', text: true, accept: ['strong negative', 'strongly negative', 'strong negative linear', 'strong negative relationship', 'strong negative linear relationship', 'strong and negative'] }], flag: 'FOS{strong_negative}' },
  '43': { fields: [{ key: 'r',  label: 'Pearson $r$',   expected: 0.919, tol: 0.003 }], flag: 'FOS{pearson_0919}' },
  '44': { fields: [{ key: 't',  label: '$t$',           expected: 6.5,  tol: 0.05 }],  flag: 'FOS{tstat_65}' },
  '45': { fields: [{ key: 'w',  label: 'Decision', text: true, accept: ['reject', 'reject h0', 'reject ho', 'reject null', 'reject the null', 'reject the null hypothesis', 'reject h 0'] }], flag: 'FOS{reject_null}' }
};

// ===== Numeric answer parsing (accepts fractions and decimals) =====
function parseAnswer(input) {
  if (input === null || input === undefined) return NaN;
  let s = String(input).trim();
  if (s === '') return NaN;
  s = s.replace(/%$/, '').trim();           // tolerate a trailing %
  if (s.includes('/')) {
    const parts = s.split('/');
    if (parts.length !== 2) return NaN;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0) return NaN;
    return num / den;
  }
  return parseFloat(s);
}

function approxEqual(a, b, tol) {
  if (isNaN(a) || isNaN(b)) return false;
  if (tol === 0) return a === b;
  return Math.abs(a - b) <= (tol || 0.001);
}

// ===== Text answer normalisation =====
function normText(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function textMatches(input, accept) {
  const got = normText(input);
  if (got === '') return false;
  return accept.map(normText).includes(got);
}

// ===== MathJax re-render =====
function typesetMath(el) {
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise(el ? [el] : undefined).catch(() => {});
  }
}

// ===== localStorage persistence =====
const SOLVED_KEY_PREFIX = 'fos-stats-ctf-solved-';
function markSolvedInStorage(id) {
  try { localStorage.setItem(SOLVED_KEY_PREFIX + id, '1'); } catch (e) {}
}
function isSolvedInStorage(id) {
  try { return localStorage.getItem(SOLVED_KEY_PREFIX + id) === '1'; } catch (e) { return false; }
}

// ===== Render one challenge's interactive UI =====
function renderChallenge(area) {
  const id = area.dataset.challenge;
  const config = challenges[id];
  if (!config) return;

  let inputsHtml = '<div class="input-row">';
  config.fields.forEach(f => {
    const ph = f.text ? 'type answer' : '?';
    inputsHtml += `
      <div class="input-cell">
        <label>${f.label}</label>
        <input type="text" class="numeric-input ctf-input" data-key="${f.key}" autocomplete="off" inputmode="${f.text ? 'text' : 'text'}" placeholder="${ph}">
      </div>`;
  });
  inputsHtml += '</div>';

  area.innerHTML = `
    <p class="answer-prompt">Your answer</p>
    ${inputsHtml}
    <button type="button" class="btn-check ctf-check-btn">Check Answer</button>
    <div class="ctf-feedback" id="fb-${id}"></div>
    <div class="flag-reveal" id="flag-${id}" hidden></div>
  `;

  wireUpChallenge(area, id, config);
  typesetMath(area);

  if (isSolvedInStorage(id)) {
    revealFlag(area, id, config.flag, true);
  }
}

// ===== Wire up event handlers =====
function wireUpChallenge(area, id, config) {
  const checkBtn = area.querySelector('.ctf-check-btn');
  if (checkBtn) checkBtn.addEventListener('click', () => handleCheck(area, id, config));

  area.querySelectorAll('.ctf-input').forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && checkBtn && !checkBtn.disabled) {
        e.preventDefault();
        checkBtn.click();
      }
    });
  });
}

// ===== Validate the attempt =====
function handleCheck(area, id, config) {
  if (isSolvedInStorage(id)) return;

  let allCorrect = true;
  let anyEmpty = false;

  const inputs = area.querySelectorAll('.ctf-input');
  inputs.forEach(inp => inp.classList.remove('cell-correct', 'cell-incorrect'));

  config.fields.forEach(f => {
    const inp = area.querySelector(`.ctf-input[data-key="${f.key}"]`);
    const raw = inp.value.trim();
    if (raw === '') { anyEmpty = true; allCorrect = false; return; }

    let ok;
    if (f.text) {
      ok = textMatches(raw, f.accept);
    } else {
      ok = approxEqual(parseAnswer(raw), f.expected, f.tol);
    }

    if (ok) { inp.classList.add('cell-correct'); }
    else { inp.classList.add('cell-incorrect'); allCorrect = false; }
  });

  if (anyEmpty && !allCorrect) {
    showFeedback(area, id, 'partial', 'Enter your answer before checking. Numeric answers accept fractions like <code>1/6</code> or decimals like <code>0.1667</code>. Text answers (like <code>unusual</code> or <code>reject</code>) are case-insensitive.');
    return;
  }

  if (allCorrect) {
    inputs.forEach(inp => inp.disabled = true);
    const btn = area.querySelector('.ctf-check-btn');
    if (btn) btn.disabled = true;
    revealFlag(area, id, config.flag);
  } else {
    showFeedback(area, id, 'incorrect', 'Not quite &mdash; the highlighted field is wrong. Double-check your working and try again. No penalty for retrying.');
  }
}

// ===== Inline feedback =====
function showFeedback(area, id, type, html) {
  const fb = area.querySelector(`#fb-${id}`);
  fb.classList.remove('fb-incorrect', 'fb-partial', 'show');
  fb.classList.add(`fb-${type}`);
  const tagText = (type === 'partial') ? 'Hold on' : 'Not yet';
  fb.innerHTML = `<span class="ctf-feedback-tag">${tagText}</span><div class="ctf-feedback-body">${html}</div>`;
  requestAnimationFrame(() => fb.classList.add('show'));
}

// ===== Flag reveal =====
function revealFlag(area, id, flag, restored = false) {
  const reveal = area.querySelector(`#flag-${id}`);
  reveal.innerHTML = `
    <span class="flag-reveal-tag">${restored ? 'Already captured' : 'Flag captured'}</span>
    <div class="flag-display-row">
      <code class="flag-text">${flag}</code>
      <button type="button" class="ctf-copy-btn">Copy</button>
    </div>
    <p class="flag-reveal-hint">Paste this into the matching challenge on CTFd to score the points.</p>
  `;
  reveal.hidden = false;

  area.querySelectorAll('.ctf-input').forEach(inp => inp.disabled = true);
  const checkBtn = area.querySelector('.ctf-check-btn');
  if (checkBtn) checkBtn.disabled = true;

  const copyBtn = reveal.querySelector('.ctf-copy-btn');
  copyBtn.addEventListener('click', () => {
    copyTextToClipboard(flag).then((ok) => {
      copyBtn.textContent = ok ? 'Copied!' : 'Press Ctrl+C';
      copyBtn.classList.add('copied');
      setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1800);
    });
  });

  const fb = area.querySelector(`#fb-${id}`);
  if (fb) fb.classList.remove('show');

  if (!restored) markSolvedInStorage(id);
  updateProgress();
}

// ===== Clipboard copy with fallback =====
function copyTextToClipboard(text) {
  return new Promise((resolve) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => fallback());
    } else { fallback(); }
    function fallback() {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { const ok = document.execCommand('copy'); document.body.removeChild(ta); resolve(ok); }
      catch (e) { document.body.removeChild(ta); resolve(false); }
    }
  });
}

// ===== Per-page progress =====
function updateProgress() {
  const pageChallenges = Array.from(document.querySelectorAll('.answer-area')).map(a => a.dataset.challenge);
  if (pageChallenges.length === 0) return;
  const solved = pageChallenges.filter(id => isSolvedInStorage(id)).length;
  const pct = (solved / pageChallenges.length) * 100;
  const text = document.getElementById('progress-text');
  const fill = document.getElementById('progress-fill');
  if (text) text.textContent = `${solved} / ${pageChallenges.length}`;
  if (fill) fill.style.width = `${pct}%`;
}

// ===== Reset utility (for instructor) =====
window.resetCTFProgress = function () {
  Object.keys(challenges).forEach(id => {
    try { localStorage.removeItem(SOLVED_KEY_PREFIX + id); } catch (e) {}
  });
  location.reload();
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.answer-area').forEach(renderChallenge);
  updateProgress();
});

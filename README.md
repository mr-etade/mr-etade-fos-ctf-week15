# Fundamentals of Statistics — End-of-Semester CTF

A static web app hosting **45 statistics challenges** across 5 categories, drawn from
CMN112/CMP112/CBS102 Fundamentals of Statistics (Weeks 2–7 and 11–12).

- **Event:** Thursday 4 June 2026 · **Duration:** 1 hour · **Total:** 900 points
- **Flag format:** `FOS{...}` (case-sensitive, lowercase, underscores)
- **Answer style:** every challenge is short-answer / type-in. **No multiple choice. No hints.**
- **CTFd:** http://139.180.180.165/

---

## Files

| File | Purpose |
|---|---|
| `index.html` | Landing page: intro, rules, CTFd panel, category navigation |
| `probability.html` | Category 1 — Probability Protocol (Weeks 2-3) |
| `counting.html` | Category 2 — The Counting Codex (Week 4) |
| `normal.html` | Category 3 — Bell Curve Bureau (Week 5) |
| `sampling.html` | Category 4 — Sampling Station (Weeks 6-7) |
| `regression.html` | Category 5 — The Regression Engine (Weeks 11-12) |
| `styles.css` | Risograph zine styling |
| `script.js` | Answer-validation and flag-reveal engine |
| `challenges.csv` | CTFd bulk-import file (45 rows, `FOS{...}` flags) |
| `ANSWERS.md` | **Instructor only** — answer key, verification, CTFd + figure maps |
| `TIKZ_DIAGRAMS.md` | TikZ source for all 24 diagram slots (IguanaTeX, pdflatex, 600 dpi) |
| `fig_q*.png` | Compiled diagrams you add (see below) |
| `.gitignore` | Keeps `ANSWERS.md` and `challenges.csv` out of public repos |

---

## Diagrams — design philosophy

**Diagrams are data sources, not answer keys.**

Every figure has been designed so that students *must* read it to solve the challenge:

| Type | Examples | What students do |
|------|----------|-----------------|
| **Read the data** | Q05 table, Q06 Venn, Q08 Venn | Extract numbers, apply a formula |
| **Count outcomes** | Q01 die faces, Q04 grid, Q07 face cards, Q13 tree | Count highlighted items in the figure |
| **Read parameters** | Q21, Q25, Q32, Q35, Q37, Q40 | Read µ, σ, boundaries, or rise/run; calculate the result |

Nothing in any figure reveals a probability, a calculated product, a z-score, a decision
("reject"), or a final answer. The figure is necessary but not sufficient — students must
still do the arithmetic.

---

## Compiling the diagrams

1. Open PowerPoint with **IguanaTeX** installed.
2. **IguanaTeX → Settings:** engine = `pdflatex`, DPI = **600**, output = PNG.
3. **IguanaTeX → Edit preamble:** paste the preamble block from `TIKZ_DIAGRAMS.md` **once**.
4. For each figure, paste only the `\begin{tikzpicture}...\end{tikzpicture}` block into the
   IguanaTeX equation box, compile, and export the PNG.
5. Name each PNG **exactly** as listed in `TIKZ_DIAGRAMS.md` and drop it into this folder
   alongside the `.html` files.

Until a PNG is added, the challenge shows an empty framed box — everything else still works,
so you can deploy first and add diagrams as you compile them.

---

## Deploy to GitHub Pages

1. Create a repository (e.g. `stats-ctf-2026`).
2. Upload everything in this folder **except** `ANSWERS.md` and `challenges.csv`
   (the `.gitignore` already excludes them from `git add`).
3. **Settings → Pages → Source:** `Deploy from a branch` → `main` → `/(root)`.
4. Wait 1–2 minutes; site is live at `https://<username>.github.io/<repo-name>/`.
5. Test on a phone the day before.

---

## Setup checklist

- [ ] Repo created; all `.html`, `styles.css`, `script.js`, `TIKZ_DIAGRAMS.md`, `README.md`
      uploaded (and any compiled `fig_q*.png`)
- [ ] `ANSWERS.md` and `challenges.csv` confirmed absent from the public repo
      (`.gitignore` handles this automatically)
- [ ] GitHub Pages live; URL works on a phone
- [ ] CTFd reachable at the event address; 45 challenges imported via `challenges.csv`
- [ ] CTFd categories: `Probability Protocol`, `The Counting Codex`, `Bell Curve Bureau`,
      `Sampling Station`, `The Regression Engine`
- [ ] Event start/end times set in CTFd
- [ ] One full flag captured end-to-end as a test (solve → copy → paste into CTFd → points)
- [ ] CTFd address written on the whiteboard at the start
- [ ] `resetCTFProgress()` run in the browser console to clear any test progress

---

## Note on flag visibility

Flag strings live in `script.js` in plain text, revealed by JS only after a correct answer.
For a one-hour in-class maths event this is an acceptable trade-off. If stronger separation
is needed, host flag validation behind a small server endpoint.

> To clear local test progress before the event: open the browser console on any page and run
> `resetCTFProgress()`.

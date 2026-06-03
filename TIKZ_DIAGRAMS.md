# TikZ Diagram Pack — Fundamentals of Statistics CTF
## **Instructor edition — revised for CTF integrity**

**Design principle (revised):** Every diagram is now a **data source** that students must read
to answer the question. No diagram reveals the answer, shows the calculation, or annotates the
correct outcome count. Students have to count, read, and reason from the figure.

**23 figures, 24 image slots.** Compile in **IguanaTeX** (engine **pdflatex**, **600 dpi**,
transparent background optional). Drop each PNG into the same folder as the `.html` files.

---

## 1. One-time IguanaTeX setup

In PowerPoint: **IguanaTeX → Settings → LaTeX engine: `pdflatex`, DPI: 600, output PNG.**

Open **IguanaTeX → Edit preamble** and paste this block **once**:

```latex
\usepackage{tikz}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\usepgfplotslibrary{groupplots}
\usepackage{amsmath}
\usepackage{amssymb}
\usetikzlibrary{arrows.meta,positioning,calc,backgrounds,shapes.geometric,fit,patterns}

% ---- styles.css palette ----
\definecolor{cream}{HTML}{FEFDFA}
\definecolor{paper}{HTML}{F6F1E6}
\definecolor{ink}{HTML}{1A1A1C}
\definecolor{inkmid}{HTML}{45454A}
\definecolor{inksoft}{HTML}{7A7A80}
\definecolor{red}{HTML}{FF2E20}
\definecolor{yellow}{HTML}{FFD966}
\definecolor{green}{HTML}{86CF64}
\definecolor{blue}{HTML}{04B4D8}

% ---- reusable normal-density function: gauss(mean,sd) ----
\pgfmathdeclarefunction{gauss}{2}{%
  \pgfmathparse{1/(#2*sqrt(2*pi))*exp(-((x-#1)^2)/(2*#2^2))}%
}

\tikzset{every picture/.style={line width=0.6pt}}
```

Paste only the `\begin{tikzpicture}...\end{tikzpicture}` block for each figure into the
IguanaTeX equation box — the preamble is applied automatically.

---

## 2. Filename → placement map

| #  | Filename | Page | Challenge |
|----|----------|------|-----------|
| 1  | `fig_q01_dice_even.png`          | probability.html | 01 Even Money |
| 2  | `fig_q04_two_dice_grid.png`      | probability.html | 04 Take Five |
| 3  | `fig_q05_contingency.png`        | probability.html | 05 Marginal Notes |
| 4  | `fig_q06_venn_union.png`         | probability.html | 06 Queen of Diamonds |
| 5  | `fig_q07_reduced_space.png`      | probability.html | 07 Royal Conditional |
| 6  | `fig_q08_venn_disjoint.png`      | probability.html | 08 Disjoint Drive |
| 7  | `fig_q11_perm_slots.png`         | counting.html    | 11 Order Up |
| 8  | `fig_q13_tree_combos.png`        | counting.html    | 13 Kai Bar Combos |
| 9  | `fig_q15_circular_table.png`     | counting.html    | 15 Round the Haus |
| 10 | `fig_q16_tree_noreplace.png`     | counting.html    | 16 No Returns |
| 11 | `fig_q19_empirical_68.png`       | normal.html      | 19 The 68 Slice |
| 12 | `fig_q21_zscore_mark.png`        | normal.html      | 21 Zero to Z |
| 13 | `fig_q22_empirical_ranges.png`   | normal.html      | 22 Top of the Range |
| 14 | `fig_q24_unusual_tails.png`      | normal.html      | 24 Usual Suspect |
| 15 | `fig_q25_left_area.png`          | normal.html      | 25 Leopard's Range |
| 16 | `fig_q26_between_area.png`       | normal.html      | 26 Middle Passage |
| 17 | `fig_q30_clt_convergence.png`    | sampling.html    | 30 CLT Threshold |
| 18 | `fig_q32_sampling_z.png`         | sampling.html    | 32 Data Drift |
| 19 | `fig_q33_se_vs_n.png`            | sampling.html    | 33 Size Matters |
| 20 | `fig_q35_sampling_between.png`   | sampling.html    | 35 Fare Window |
| 21 | `fig_q37_line.png`               | regression.html  | 37 Read the Rate |
| 22 | `fig_q40_scatter_line.png`       | regression.html  | 40 Predict & Win |
| 23 | `fig_q42_correlation_panels.png` | regression.html  | 42 Strength Read |
| 24 | `fig_q45_tdist_critical.png`     | regression.html  | 45 The Verdict |

---

## 3. The figures

---

### `fig_q01_dice_even.png` — probability.html · Challenge 01 · *Even Money*

**What students must do:** Count the total number of faces and identify which are even.
The die faces are shown without any grouping or labelling — students read them directly.
No outcome count, no fraction, no annotation.

```latex
\begin{tikzpicture}[font=\normalsize]
  % Six die faces laid out in a row — no highlighting, no annotation
  \foreach \n in {1,...,6}{
    \node[draw=ink, line width=1.2pt, fill=cream, text=ink,
          minimum size=1.1cm, font=\Large\bfseries]
      at (\n*1.3, 0) {\n};
  }
  % Only label: what a die is
  \node[inksoft, font=\footnotesize] at (4.55, -0.85)
    {faces of a standard six-sided die};
\end{tikzpicture}
```

---

### `fig_q04_two_dice_grid.png` — probability.html · Challenge 04 · *Take Five*

**What students must do:** Scan the 6 × 6 grid of sums and locate every cell equal to 5 —
the cells are highlighted in yellow but carry no count label and no caption stating the answer.
Students count the yellow cells themselves.

```latex
\begin{tikzpicture}[scale=0.82, font=\scriptsize]
  % Column header: Die 2
  \node[inkmid, font=\small] at (3.9, 7.35) {Die 2};
  % Row header: Die 1
  \node[inkmid, font=\small, rotate=90] at (-0.45, 3.5) {Die 1};

  % Column numbers (top)
  \foreach \j in {1,...,6}{
    \node[ink, font=\footnotesize\bfseries] at (\j, 6.65) {\j};
  }
  % Row numbers (left)
  \foreach \i in {1,...,6}{
    \node[ink, font=\footnotesize\bfseries] at (0.22, 7-\i) {\i};
  }

  % Grid cells — sum shown inside; cells summing to 5 are yellow
  \foreach \i in {1,...,6}{
    \foreach \j in {1,...,6}{
      \pgfmathtruncatemacro{\s}{\i+\j}
      \ifnum\s=5
        \def\fillc{yellow}
      \else
        \def\fillc{cream}
      \fi
      \node[draw=ink, line width=0.55pt, fill=\fillc,
            minimum size=0.88cm, font=\scriptsize]
        at (\j, 7-\i) {\s};
    }
  }
\end{tikzpicture}
```

---

### `fig_q05_contingency.png` — probability.html · Challenge 05 · *Marginal Notes*

**What students must do:** Read the row total for Python from the table and divide by the
grand total. The table is complete with all counts but carries no calculated probabilities,
no fractions, and no highlighted answer.

```latex
\begin{tikzpicture}[font=\small,
  c/.style ={draw=ink, line width=0.6pt,
             minimum width=1.75cm, minimum height=0.88cm},
  hd/.style={c, fill=ink, text=cream, font=\footnotesize\bfseries},
  rh/.style={c, fill=paper, font=\footnotesize\bfseries, text=ink}]

  % Column headers
  \node[c,  fill=cream]  at (0,    0)    {};
  \node[hd]              at (1.75, 0)    {Year 1};
  \node[hd]              at (3.5,  0)    {Year 2};
  \node[hd]              at (5.25, 0)    {Total};

  % Python row
  \node[rh]              at (0,    -0.88){Python};
  \node[c, fill=cream]   at (1.75, -0.88){50};
  \node[c, fill=cream]   at (3.5,  -0.88){30};
  \node[c, fill=cream]   at (5.25, -0.88){80};

  % Java row
  \node[rh]              at (0,    -1.76){Java};
  \node[c, fill=cream]   at (1.75, -1.76){40};
  \node[c, fill=cream]   at (3.5,  -1.76){20};
  \node[c, fill=cream]   at (5.25, -1.76){60};

  % C++ row
  \node[rh]              at (0,    -2.64){C\texttt{++}};
  \node[c, fill=cream]   at (1.75, -2.64){30};
  \node[c, fill=cream]   at (3.5,  -2.64){30};
  \node[c, fill=cream]   at (5.25, -2.64){60};

  % Totals row
  \node[rh]              at (0,    -3.52){Total};
  \node[c, fill=paper]   at (1.75, -3.52){120};
  \node[c, fill=paper]   at (3.5,  -3.52){80};
  \node[c, fill=paper]   at (5.25, -3.52){200};
\end{tikzpicture}
```

---

### `fig_q06_venn_union.png` — probability.html · Challenge 06 · *Queen of Diamonds*

**What students must do:** Read the raw counts from each region of the Venn diagram
(Queens only, overlap, Diamonds only) and apply the addition rule. The diagram shows
counts but no calculated union probability and no formula.

```latex
\begin{tikzpicture}[font=\small]
  % Left circle — Queens
  \draw[fill=yellow!35, draw=ink, line width=1.1pt] (-1.15, 0) circle (1.85cm);
  % Right circle — Diamonds
  \draw[fill=blue!22,   draw=ink, line width=1.1pt] ( 1.15, 0) circle (1.85cm);
  % Overlap shaded on top
  \begin{scope}
    \clip (-1.15,0) circle (1.85cm);
    \fill[green!50] (1.15,0) circle (1.85cm);
  \end{scope}
  % Redraw borders cleanly
  \draw[draw=ink, line width=1.1pt] (-1.15, 0) circle (1.85cm);
  \draw[draw=ink, line width=1.1pt] ( 1.15, 0) circle (1.85cm);

  % Labels
  \node[ink, font=\footnotesize\bfseries] at (-1.9,  1.65) {Queens};
  \node[ink, font=\footnotesize\bfseries] at ( 1.95, 1.65) {Diamonds};

  % Counts — students must read these and apply the formula
  \node[ink, font=\normalsize\bfseries] at (-1.85,  0)   {3};
  \node[ink, font=\normalsize\bfseries] at ( 0,     0)   {1};
  \node[ink, font=\normalsize\bfseries] at ( 1.85,  0)   {12};

  % Deck size reference only
  \node[inksoft, font=\scriptsize] at (0, -2.55)
    {Standard 52-card deck};
\end{tikzpicture}
```

---

### `fig_q07_reduced_space.png` — probability.html · Challenge 07 · *Royal Conditional*

**What students must do:** Count the total face cards shown (the full reduced sample space)
and identify how many are Kings. No count labels, no fraction, no annotation — students count
the cards directly from the grid.

```latex
\begin{tikzpicture}[font=\footnotesize]
  % 4 suits × 3 ranks (J, Q, K) shown as a 4 × 3 grid
  % King column highlighted in yellow; no count shown
  \foreach \c/\suit in {0/{\clubsuit}, 1/{\diamondsuit},
                         2/{\heartsuit}, 3/{\spadesuit}}{
    \foreach \r/\rank in {0/J, 1/Q, 2/K}{
      \ifnum\r=2
        \def\fillc{yellow!60}
        \def\tc{ink}
      \else
        \def\fillc{cream}
        \def\tc{ink}
      \fi
      \node[draw=ink, line width=0.75pt, fill=\fillc, text=\tc,
            rounded corners=2pt,
            minimum width=1.05cm, minimum height=1.35cm]
        at (\c*1.25, -\r*1.6) {$\rank\,\suit$};
    }
  }
  % Single label: context only, no counts
  \node[inksoft, font=\scriptsize] at (1.9, -5.1)
    {All face cards shown above};
\end{tikzpicture}
```

---

### `fig_q08_venn_disjoint.png` — probability.html · Challenge 08 · *Disjoint Drive*

**What students must do:** Read the probability values for A and B from the diagram and
apply the mutual-exclusion rule. The diagram shows only the raw probabilities — no sum,
no union result.

```latex
\begin{tikzpicture}[font=\small]
  % Sample-space rectangle
  \draw[draw=ink, line width=1pt, fill=cream]
    (-3.6, -2.1) rectangle (3.6, 2.1);
  \node[ink, font=\footnotesize] at (3.15, 1.75) {$S$};

  % Event A — left circle (no overlap with B)
  \draw[fill=yellow!40, draw=ink, line width=1.1pt]
    (-1.75, 0) circle (1.25cm);

  % Event B — right circle
  \draw[fill=blue!22, draw=ink, line width=1.1pt]
    ( 1.75, 0) circle (1.25cm);

  % Labels and probability values — no sum shown
  \node[ink, font=\bfseries]      at (-1.75,  0.45) {$A$};
  \node[ink, font=\normalsize]    at (-1.75, -0.15) {$0.35$};

  \node[ink, font=\bfseries]      at ( 1.75,  0.45) {$B$};
  \node[ink, font=\normalsize]    at ( 1.75, -0.15) {$0.45$};
\end{tikzpicture}
```

---

### `fig_q11_perm_slots.png` — counting.html · Challenge 11 · *Order Up*

**What students must do:** Read the pool size and the number of ordered slots from the
diagram, then apply the permutation formula. The slot values are shown but the product
and final answer are deliberately omitted.

```latex
\begin{tikzpicture}[font=\small]
  % Pool label
  \node[draw=ink, line width=1pt, fill=paper, minimum width=2.2cm,
        minimum height=0.9cm, font=\footnotesize\bfseries]
    at (0, 1.5) {Pool of \textbf{7} items};

  % Three ordered slots — show available choices, not the product
  \foreach \i/\choices in {0/7, 1/6, 2/5}{
    \node[draw=ink, line width=1pt, fill=yellow!40,
          minimum size=1.15cm, font=\large\bfseries]
      at (\i*2.2, 0) {\choices};
  }
  \node[font=\small, inksoft] at (0,   -0.85) {1st choice};
  \node[font=\small, inksoft] at (2.2, -0.85) {2nd choice};
  \node[font=\small, inksoft] at (4.4, -0.85) {3rd choice};

  % Multiplication signs only
  \node[ink, font=\large] at (1.1,  0) {$\times$};
  \node[ink, font=\large] at (3.3,  0) {$\times$};
  \node[ink, font=\large] at (5.15, 0) {$=$\,\textbf{?}};
\end{tikzpicture}
```

---

### `fig_q13_tree_combos.png` — counting.html · Challenge 13 · *Kai Bar Combos*

**What students must do:** Count the number of leaves (complete bun–filling combinations)
on the tree. Buns and fillings are labelled B1–B3 and F1–F4 but leaf nodes carry no count.
No "12" appears anywhere.

```latex
\begin{tikzpicture}[font=\footnotesize, grow=right,
  level 1/.style={sibling distance=3.2cm, level distance=2.5cm},
  level 2/.style={sibling distance=0.8cm,  level distance=2.8cm},
  edge from parent/.style={draw=inkmid, -{Stealth[length=4pt]}}]
  \node[draw=ink, fill=yellow!40, line width=0.8pt,
        font=\footnotesize\bfseries, inner sep=4pt] {Lunch}
    child {node[draw=ink, fill=blue!20, inner sep=3pt] {B1}
      child {node[draw=inksoft, inner sep=3pt] {F1}}
      child {node[draw=inksoft, inner sep=3pt] {F2}}
      child {node[draw=inksoft, inner sep=3pt] {F3}}
      child {node[draw=inksoft, inner sep=3pt] {F4}}}
    child {node[draw=ink, fill=blue!20, inner sep=3pt] {B2}
      child {node[draw=inksoft, inner sep=3pt] {F1}}
      child {node[draw=inksoft, inner sep=3pt] {F2}}
      child {node[draw=inksoft, inner sep=3pt] {F3}}
      child {node[draw=inksoft, inner sep=3pt] {F4}}}
    child {node[draw=ink, fill=blue!20, inner sep=3pt] {B3}
      child {node[draw=inksoft, inner sep=3pt] {F1}}
      child {node[draw=inksoft, inner sep=3pt] {F2}}
      child {node[draw=inksoft, inner sep=3pt] {F3}}
      child {node[draw=inksoft, inner sep=3pt] {F4}}};
\end{tikzpicture}
```

---

### `fig_q15_circular_table.png` — counting.html · Challenge 15 · *Round the Haus*

**What students must do:** See that one seat is fixed (marked with a star) and five
remaining seats must be arranged. Students apply the circular-permutation formula
$(n-1)!$ themselves — no formula or answer is shown.

```latex
\begin{tikzpicture}[font=\small]
  % Table surface
  \draw[fill=paper, draw=ink, line width=1.1pt] (0,0) circle (1.55cm);
  \node[inkmid, font=\footnotesize] at (0, 0) {table};

  % 6 seat nodes around the table
  \foreach \i in {0,...,5}{
    \pgfmathsetmacro{\ang}{90 + \i*60}
    \ifnum\i=0
      % Fixed seat — marked with ★ to indicate it is the reference point
      \node[draw=ink, line width=1pt, fill=red, text=cream,
            circle, minimum size=0.9cm, font=\large]
        at (\ang:2.45cm) {$\star$};
      \node[inksoft, font=\scriptsize] at (\ang:3.25cm) {fixed};
    \else
      \node[draw=ink, line width=0.8pt, fill=yellow!50, text=ink,
            circle, minimum size=0.9cm]
        at (\ang:2.45cm) {};
    \fi
  }
\end{tikzpicture}
```

---

### `fig_q16_tree_noreplace.png` — counting.html · Challenge 16 · *No Returns*

**What students must do:** Read the branch probabilities from the tree and multiply along
the red-then-red path. The individual branch fractions are shown but the product and
decimal result are omitted — students calculate those.

```latex
\begin{tikzpicture}[font=\footnotesize, grow=right,
  level 1/.style={sibling distance=3.0cm, level distance=3.0cm},
  level 2/.style={sibling distance=1.5cm, level distance=3.4cm},
  edge from parent/.style={draw=inkmid}]
  \node[draw=ink, fill=cream, line width=0.8pt,
        inner sep=4pt, font=\footnotesize\bfseries] {Deck}
    child {node[draw=ink, fill=red, text=cream, inner sep=3pt] {Red}
      child {node[draw=ink, fill=red, text=cream, inner sep=3pt] {Red}
             edge from parent
               node[above, font=\scriptsize, red]{\strut$\frac{25}{51}$}}
      child {node[draw=ink, fill=cream, inner sep=3pt] {Black}
             edge from parent
               node[below, font=\scriptsize, inkmid]{\strut$\frac{26}{51}$}}
      edge from parent
        node[above, font=\scriptsize, red]{\strut$\frac{26}{52}$}}
    child {node[draw=ink, fill=ink, text=cream, inner sep=3pt] {Black}
      child {node[draw=ink, fill=red, text=cream, inner sep=3pt] {Red}
             edge from parent
               node[above, font=\scriptsize, inkmid]{\strut$\frac{26}{51}$}}
      child {node[draw=ink, fill=ink, text=cream, inner sep=3pt] {Black}
             edge from parent
               node[below, font=\scriptsize, inkmid]{\strut$\frac{25}{51}$}}
      edge from parent
        node[below, font=\scriptsize, inkmid]{\strut$\frac{26}{52}$}};
\end{tikzpicture}
```

---

### `fig_q19_empirical_68.png` — normal.html · Challenge 19 · *The 68 Slice*

**What students must do:** Read the percentage label from the shaded region.
The shaded area between ±1σ carries a label — but no other values are pre-calculated.
(This is an "easy" challenge: students read one value from the diagram.)

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.45,
  xmin=-4, xmax=4, axis lines=left, axis line style={ink}, clip=false,
  xtick={-3,-2,-1,0,1,2,3},
  xticklabels={$-3\sigma$,$-2\sigma$,$-\sigma$,$\mu$,
               $\sigma$,$2\sigma$,$3\sigma$},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  % Shaded region ±1σ — labelled with the percentage students must submit
  \addplot[draw=none, fill=green!45, domain=-1:1, samples=80]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=-4:4, samples=150]
    {gauss(0,1)};
  % The percentage IS shown — this easy challenge asks students to read it
  \node[ink, font=\normalsize\bfseries] at (axis cs:0, 0.17) {68\%};
  % Boundary markers
  \draw[ink, dashed, line width=0.6pt]
    (axis cs:-1,0) -- (axis cs:-1,{gauss(0,1)*0.98/(1*sqrt(2*pi))});
  \draw[ink, dashed, line width=0.6pt]
    (axis cs: 1,0) -- (axis cs: 1,{gauss(0,1)*0.98/(1*sqrt(2*pi))});
\end{axis}
\end{tikzpicture}
```

---

### `fig_q21_zscore_mark.png` — normal.html · Challenge 21 · *Zero to Z*

**What students must do:** Read µ, σ, and the marked x-value from the diagram, then
compute z = (x − µ)/σ. The z-score itself is **not** shown — only the distribution
parameters and the position of X.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.12,
  xmin=-2, xmax=22, axis lines=left, axis line style={ink}, clip=false,
  xtick={2,6,10,14,18},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  \addplot[draw=blue, line width=1pt, domain=-2:22, samples=150]
    {gauss(10,4)};
  % Mark x = 18 — show the x-value and distribution params, NOT z
  \draw[red, line width=1.1pt, dashed]
    (axis cs:18, 0) -- (axis cs:18, 0.076);
  \node[red, font=\footnotesize, anchor=south] at (axis cs:18, 0.078)
    {$x = 18$};
  % Distribution parameters shown so students can compute z
  \node[ink, font=\footnotesize] at (axis cs:6, 0.103)
    {$\mu = 10,\quad \sigma = 4$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q22_empirical_ranges.png` — normal.html · Challenge 22 · *Top of the Range*

**What students must do:** Read µ and σ from the axis labels, identify the 95% band
boundaries, and compute µ + 2σ. The upper boundary marker on the axis shows its
x-value — students must verify or calculate it from the parameters.
The answer value "66" is **not** pre-annotated.

```latex
\begin{tikzpicture}
\begin{axis}[width=11cm, height=6cm, ymin=0, ymax=0.062,
  xmin=20, xmax=80, axis lines=left, axis line style={ink}, clip=false,
  xtick={26,34,42,50,58,66,74},
  xticklabels={26,34,42,\textbf{50},58,\textbf{66},74},
  ytick=\empty, x tick label style={font=\scriptsize, ink}]
  % Three shaded bands — unlabelled (students must apply the empirical rule)
  \addplot[draw=none, fill=blue!12,  domain=26:74, samples=120]
    {gauss(50,8)} \closedcycle;
  \addplot[draw=none, fill=blue!25,  domain=34:66, samples=120]
    {gauss(50,8)} \closedcycle;
  \addplot[draw=none, fill=green!50, domain=42:58, samples=120]
    {gauss(50,8)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=20:80, samples=160]
    {gauss(50,8)};
  % Distribution parameters only
  \node[ink, font=\footnotesize] at (axis cs:50, 0.056)
    {$\mu = 50,\quad \sigma = 8$};
  % Dashed line at x = 66 (upper 95% boundary) — no value label attached
  \draw[red, dashed, line width=0.9pt]
    (axis cs:66, 0) -- (axis cs:66, 0.043);
\end{axis}
\end{tikzpicture}
```

---

### `fig_q24_unusual_tails.png` — normal.html · Challenge 24 · *Usual Suspect*

**What students must do:** Identify the two-tail boundary (|z| > 2) from the diagram,
then decide whether z = 2.5 falls inside or outside that boundary. The x-axis is marked
with the boundary values ±2; the test value z = 2.5 is marked with a dashed line.
No classification label ("usual"/"unusual") appears in the figure.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.45,
  xmin=-4, xmax=4, axis lines=left, axis line style={ink}, clip=false,
  xtick={-3,-2,-1,0,1,2,3},
  xticklabels={$-3$,$-2$,$-1$,$0$,$1$,$2$,$3$},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  % Tails beyond |z|=2 shaded red
  \addplot[draw=none, fill=red!40, domain= 2:4, samples=60]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=none, fill=red!40, domain=-4:-2, samples=60]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=-4:4, samples=150]
    {gauss(0,1)};
  % Test value z = 2.5 — marked but not labelled as "unusual"
  \draw[ink, dashed, line width=1pt]
    (axis cs:2.5, 0) -- (axis cs:2.5, 0.11);
  \node[ink, font=\footnotesize, anchor=south] at (axis cs:2.5, 0.12)
    {$z = 2.5$};
  % Boundary markers
  \draw[ink, line width=0.8pt] (axis cs: 2, 0) -- (axis cs: 2, 0.06);
  \draw[ink, line width=0.8pt] (axis cs:-2, 0) -- (axis cs:-2, 0.06);
\end{axis}
\end{tikzpicture}
```

---

### `fig_q25_left_area.png` — normal.html · Challenge 25 · *Leopard's Range*

**What students must do:** Read µ, σ, and the boundary value x = 80 from the diagram,
compute the z-score, then look up the probability in their z-table.
The probability value is **not** written on the figure.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.05,
  xmin=32, xmax=92, axis lines=left, axis line style={ink}, clip=false,
  xtick={42,52,62,72,82},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  % Shaded area P(X < 80) — no probability label
  \addplot[draw=none, fill=blue!30, domain=32:80, samples=140]
    {gauss(62,10)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=32:92, samples=160]
    {gauss(62,10)};
  % Boundary line and x-value label only
  \draw[red, dashed, line width=0.9pt]
    (axis cs:80, 0) -- (axis cs:80, 0.028);
  \node[red, font=\footnotesize, anchor=south] at (axis cs:80, 0.029)
    {$x = 80$};
  % Distribution parameters
  \node[ink, font=\footnotesize] at (axis cs:50, 0.043)
    {$\mu = 62,\quad \sigma = 10$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q26_between_area.png` — normal.html · Challenge 26 · *Middle Passage*

**What students must do:** Read the two z-boundaries from the diagram, look up the
corresponding Φ-values in their z-table (provided in the question text), and subtract.
The probability 0.8973 is **not** written on the figure — only the boundary z-values.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.45,
  xmin=-4, xmax=4, axis lines=left, axis line style={ink}, clip=false,
  xtick={-3,-2,-1,0,1,2,3},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  % Shaded band between z = -1.5 and z = 1.8
  \addplot[draw=none, fill=green!45, domain=-1.5:1.8, samples=140]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=-4:4, samples=150]
    {gauss(0,1)};
  % Boundary markers with z-value labels
  \draw[ink, dashed, line width=0.7pt]
    (axis cs:-1.5, 0) -- (axis cs:-1.5, 0.165);
  \draw[ink, dashed, line width=0.7pt]
    (axis cs: 1.8, 0) -- (axis cs: 1.8, 0.094);
  \node[ink, font=\scriptsize, anchor=south east] at (axis cs:-1.5, 0.168)
    {$z = -1.5$};
  \node[ink, font=\scriptsize, anchor=south west] at (axis cs: 1.8, 0.097)
    {$z = 1.8$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q30_clt_convergence.png` — sampling.html · Challenge 30 · *CLT Threshold*

**What students must do:** Identify at which sample size the distribution of $\bar{x}$
becomes approximately normal. The three panels are labelled with their sample sizes;
students identify the conventional minimum threshold. No answer is printed.

```latex
\begin{tikzpicture}
\begin{groupplot}[
  group style={group size=3 by 1, horizontal sep=1.0cm},
  width=4.8cm, height=4.5cm, ymin=0,
  axis lines=left, axis line style={ink},
  ytick=\empty, xtick=\empty,
  title style={font=\footnotesize\bfseries, ink}]

  \nextgroupplot[title={Population ($n=1$)}]
    \addplot[draw=red, line width=1pt, fill=red!22,
             domain=0:6, samples=100]
      {2.2*exp(-1.4*x)} \closedcycle;

  \nextgroupplot[title={$\bar{x}$, $n=10$}]
    \addplot[draw=blue, line width=1pt, fill=blue!16,
             domain=-1:6, samples=120]
      {gauss(2.5,0.9)} \closedcycle;

  \nextgroupplot[title={$\bar{x}$, $n=?$}]
    \addplot[draw=green!60!ink, line width=1pt, fill=green!35,
             domain=0:5, samples=120]
      {gauss(2.5,0.45)} \closedcycle;
\end{groupplot}
% Question prompt below — students must identify the threshold n
\node[inksoft, font=\footnotesize] at (8.2, -0.65)
  {At what minimum $n$ does $\bar{x}$ become approximately normal?};
\end{tikzpicture}
```

---

### `fig_q32_sampling_z.png` — sampling.html · Challenge 32 · *Data Drift*

**What students must do:** Read µ, σ_x̄, and x̄ from the diagram, then compute the
z-score. The z-score is **not** labelled — only the axis position of x̄ = 4.8 is marked.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=4.4,
  xmin=4.6, xmax=5.4, axis lines=left, axis line style={ink}, clip=false,
  xtick={4.7,4.8,4.9,5.0,5.1,5.2,5.3},
  ytick=\empty, x tick label style={font=\scriptsize, ink}]
  \addplot[draw=blue, line width=1pt, domain=4.6:5.4, samples=160]
    {gauss(5,0.1)};
  % Mark x̄ = 4.8 — show the value, NOT the z-score
  \draw[red, dashed, line width=0.9pt]
    (axis cs:4.8, 0) -- (axis cs:4.8, 2.42);
  \node[red, font=\footnotesize, anchor=south] at (axis cs:4.8, 2.46)
    {$\bar{x} = 4.8$};
  % Parameters
  \node[ink, font=\footnotesize] at (axis cs:5.0, 3.8)
    {$\mu = 5.0,\quad \sigma_{\bar{x}} = 0.1$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q33_se_vs_n.png` — sampling.html · Challenge 33 · *Size Matters*

**What students must do:** Observe that increasing sample size narrows the sampling
distribution, then use the given σ = 12 and n = 36 to compute SE. The diagram shows
three curves; no SE value is labelled.

```latex
\begin{tikzpicture}
\begin{axis}[width=10cm, height=5.8cm, ymin=0, ymax=0.73,
  xmin=-6, xmax=6, axis lines=left, axis line style={ink}, clip=false,
  xtick={-4,-2,0,2,4}, xlabel={$\bar{x}$},
  ytick=\empty, x tick label style={font=\footnotesize, ink},
  label style={font=\footnotesize, ink}]
  % Three curves — widest to narrowest
  \addplot[draw=inksoft,      line width=1.0pt, domain=-6:6, samples=140]
    {gauss(0,2)};
  \addplot[draw=blue,         line width=1.0pt, domain=-6:6, samples=150]
    {gauss(0,1)};
  \addplot[draw=green!60!ink, line width=1.2pt, domain=-6:6, samples=170]
    {gauss(0,0.6)};
  % Labels: relative sample size only — no SE values
  \node[inksoft,      font=\scriptsize, anchor=west] at (axis cs:2.5, 0.06)
    {small $n$};
  \node[blue,         font=\scriptsize, anchor=west] at (axis cs:1.4, 0.30)
    {medium $n$};
  \node[green!60!ink, font=\scriptsize, anchor=west] at (axis cs:0.7, 0.65)
    {large $n$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q35_sampling_between.png` — sampling.html · Challenge 35 · *Fare Window*

**What students must do:** Read the centre µ = 480 and the two boundary values
(465 and 495) from the diagram. Students compute the z-scores (±1), look up Φ(1.00)
from their table (provided in the question), and subtract. The probability is **not**
shown in the diagram.

```latex
\begin{tikzpicture}
\begin{axis}[width=10.5cm, height=5.8cm, ymin=0, ymax=0.031,
  xmin=435, xmax=525, axis lines=left, axis line style={ink}, clip=false,
  xtick={450,465,480,495,510},
  ytick=\empty, x tick label style={font=\scriptsize, ink}]
  % Shaded region — no probability label
  \addplot[draw=none, fill=green!45, domain=465:495, samples=120]
    {gauss(480,15)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=435:525, samples=160]
    {gauss(480,15)};
  % Boundary dashed lines only
  \draw[ink, dashed, line width=0.7pt]
    (axis cs:465, 0) -- (axis cs:465, 0.023);
  \draw[ink, dashed, line width=0.7pt]
    (axis cs:495, 0) -- (axis cs:495, 0.023);
  % Distribution parameters
  \node[ink, font=\footnotesize] at (axis cs:480, 0.027)
    {$\mu = 480,\quad \sigma_{\bar{x}} = 15$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q37_line.png` — regression.html · Challenge 37 · *Read the Rate*

**What students must do:** Read the slope directly from the labelled rise-over-run
triangle on the graph. The equation $y = 12x + 30$ is **not** written on the figure —
students must infer the slope from the triangle markings.

```latex
\begin{tikzpicture}
\begin{axis}[width=9cm, height=6cm, xmin=0, xmax=6,
  ymin=0, ymax=110, axis lines=left, axis line style={ink}, clip=false,
  xlabel={$x$ (hours)}, ylabel={$y$ (earnings)},
  label style={font=\footnotesize, ink},
  tick label style={font=\footnotesize, ink}]
  % Regression line — no equation label
  \addplot[draw=blue, line width=1.2pt, domain=0:6] {12*x + 30};
  % y-intercept dot
  \addplot[only marks, mark=*, red, mark size=2.2pt] coordinates {(0,30)};
  \node[red, font=\scriptsize, anchor=west] at (axis cs:0.12, 30)
    {intercept};
  % Rise-over-run triangle — students read "rise" and "run" to find slope
  \draw[ink, line width=0.9pt] (axis cs:3,66) -- (axis cs:4,66)
                                               -- (axis cs:4,78);
  \node[ink, font=\scriptsize, anchor=north] at (axis cs:3.5, 65)
    {run $= 1$};
  \node[ink, font=\scriptsize, anchor=west]  at (axis cs:4.08, 72)
    {rise $= ?$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q40_scatter_line.png` — regression.html · Challenge 40 · *Predict & Win*

**What students must do:** Use the equation given in the question ($\hat{y} = 5.2x + 38.5$)
to predict at x = 7. The scatter plot shows the data and line of best fit; the prediction
point is marked on the line at x = 7 but the y-value is **not** labelled — students must
substitute and calculate it.

```latex
\begin{tikzpicture}
\begin{axis}[width=9.5cm, height=6.3cm, xmin=0, xmax=8,
  ymin=35, ymax=85, axis lines=left, axis line style={ink}, clip=false,
  xlabel={$x$ (study hours)}, ylabel={$\hat{y}$ (exam score)},
  label style={font=\footnotesize, ink},
  tick label style={font=\footnotesize, ink}]
  % Data points
  \addplot[only marks, mark=*, ink, mark size=1.7pt]
    coordinates {(1,45)(2,47)(3,55)(4,58)(5,66)(6,69)};
  % Line of best fit
  \addplot[draw=blue, line width=1.1pt, domain=0:8] {5.2*x + 38.5};
  % Prediction marker at x = 7 — NO y-value label
  \addplot[only marks, mark=*, red, mark size=2.8pt] coordinates {(7,74.9)};
  \draw[red, dashed, line width=0.75pt]
    (axis cs:7,35) -- (axis cs:7,74.9);
  \node[red, font=\footnotesize, anchor=north] at (axis cs:7,35)
    {$x = 7$};
\end{axis}
\end{tikzpicture}
```

---

### `fig_q42_correlation_panels.png` — regression.html · Challenge 42 · *Strength Read*

**What students must do:** Match the shape of the panel labelled $r = -0.93$ (or closest
to it) to the correct strength-and-direction description. Only the end panels ($r = \pm 1$
and near-zero) are labelled — no "strong negative" text appears anywhere. Note: the
question asks students to describe $r = -0.93$, so no panel is labelled $-0.93$.

```latex
\begin{tikzpicture}
\begin{groupplot}[
  group style={group size=5 by 1, horizontal sep=0.6cm},
  width=3.4cm, height=3.4cm,
  xmin=-0.5, xmax=5.5, ymin=-0.5, ymax=5.5,
  xtick=\empty, ytick=\empty,
  axis line style={ink},
  title style={font=\scriptsize\bfseries, ink}]

  \nextgroupplot[title={$r = -1$}]
    \addplot[only marks, mark=*, mark size=1.4pt, red]
      coordinates{(0,5)(1,4)(2,3)(3,2)(4,1)(5,0)};

  \nextgroupplot[title={$r \approx -0.9$}]
    \addplot[only marks, mark=*, mark size=1.4pt, ink]
      coordinates{(0,4.8)(1,3.9)(2,2.8)(3,2.1)(4,1.2)(5,0.3)};

  \nextgroupplot[title={$r \approx 0$}]
    \addplot[only marks, mark=*, mark size=1.4pt, inkmid]
      coordinates{(0,2)(1,4)(2,1)(3,3)(4,2)(5,4)};

  \nextgroupplot[title={$r \approx +0.5$}]
    \addplot[only marks, mark=*, mark size=1.4pt, inkmid]
      coordinates{(0,1)(1,2)(2,2)(3,3)(4,4)(5,3)};

  \nextgroupplot[title={$r = +1$}]
    \addplot[only marks, mark=*, mark size=1.4pt, blue]
      coordinates{(0,0)(1,1)(2,2)(3,3)(4,4)(5,5)};
\end{groupplot}
\end{tikzpicture}
```

---

### `fig_q45_tdist_critical.png` — regression.html · Challenge 45 · *The Verdict*

**What students must do:** Read the critical value from the x-axis, compare it to |t| = 6.5
(marked on the figure), and determine whether the test statistic falls in the rejection
region. No decision ("reject"/"fail to reject") is written on the figure.

```latex
\begin{tikzpicture}
\begin{axis}[width=11cm, height=6cm, ymin=0, ymax=0.45,
  xmin=-7, xmax=7, axis lines=left, axis line style={ink}, clip=false,
  xtick={-3.182, 0, 3.182},
  xticklabels={$-3.182$, $0$, $3.182$},
  ytick=\empty, x tick label style={font=\footnotesize, ink}]
  % Rejection region tails — shaded red but not labelled
  \addplot[draw=none, fill=red!40, domain= 3.182:7, samples=60]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=none, fill=red!40, domain=-7:-3.182, samples=60]
    {gauss(0,1)} \closedcycle;
  \addplot[draw=blue, line width=1pt, domain=-7:7, samples=180]
    {gauss(0,1)};
  % Test statistic t = 6.5 — marked with an arrow; students must judge position
  \draw[ink, line width=1.1pt, -{Stealth[length=5.5pt]}]
    (axis cs:6.5, 0.14) -- (axis cs:6.5, 0.01);
  \node[ink, font=\footnotesize, anchor=south] at (axis cs:6.5, 0.145)
    {$t = 6.5$};
  % Critical value markers (already on x-axis tick labels above)
  \draw[ink, dashed, line width=0.7pt]
    (axis cs: 3.182, 0) -- (axis cs: 3.182, 0.08);
  \draw[ink, dashed, line width=0.7pt]
    (axis cs:-3.182, 0) -- (axis cs:-3.182, 0.08);
\end{axis}
\end{tikzpicture}
```

---

## 4. Notes

### Design philosophy recap
Every figure now falls into one of three categories:

| Category | Examples | What students must do |
|----------|----------|----------------------|
| **Read the data** | Q05 contingency, Q06 Venn counts, Q08 Venn probabilities | Extract numbers from the diagram and substitute into a formula |
| **Count the outcomes** | Q01 die faces, Q04 dice grid, Q07 face cards, Q13 tree leaves | Count highlighted or listed items; grid/tree structure does the work |
| **Read parameters, compute result** | Q21, Q25, Q32, Q35, Q37, Q40 | Diagram supplies µ, σ, boundary values, or run/rise; students calculate |

### What was removed from every figure
- No outcome counts ("4 outcomes sum to 5")
- No calculated fractions ("26/52 × 25/51 ≈ 0.245")
- No probability labels on shaded areas ("0.8973", "0.6826", "0.9641")
- No answer labels on prediction points ("(7, 74.9)")
- No decision labels ("usual", "unusual", "reject region")
- No final formula evaluation slots ("= 210", "= 120")

### What was kept (students legitimately need these)
- Distribution parameters µ and σ (needed to compute z-scores)
- Standard error σ_x̄ on the sampling figures (given in the question anyway)
- Branch fractions on the probability tree (students must multiply, not read a product)
- Cell sums in the dice grid (students count highlighted cells)
- Raw counts in the Venn diagram (students must apply the addition rule)
- Z-boundary values on z-distribution figures (students look up Φ, then subtract)
- Critical value on the t-distribution (students compare, not read the decision)

### On `fig_q45_tdist_critical.png`
Uses a standard-normal shape as a stand-in for the t₃ distribution (adequate for a
one-hour in-class visual). For the true t₃ shape replace `gauss(0,1)` with:

```latex
(gamma(2)/(sqrt(3*pi)*gamma(1.5)))*(1+x^2/3)^(-2)
```

### Adjusting layout after compiling
All coordinate values are chosen for readability at 600 dpi. If any label overlaps after
compiling, nudge its `at (axis cs:...)` coordinate — the numbers are intentionally simple.

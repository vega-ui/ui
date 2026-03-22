# @vega-ui/tokens-core

Core tokens for Vega UI Kit Web

## Color palette

Each color has 11 steps from `0` to `1000`. Use raw palette tokens (`--color-blue-500`) only to define semantic tokens. In components always use semantic tokens: `--color-primary-*`, `--color-secondary-*`, `--color-gray-accent-*`, etc.

In dark mode the scale is automatically inverted: `accent-N` maps to `raw-(1000−N)`, so components don't need dark mode overrides when using accent tokens.

### Scale anatomy

| Steps | Zone | Purpose |
|-------|------|---------|
| `0` | Background | Lightest surface, ghost button resting state |
| `100–200` | Surface | Hover/active states on light backgrounds, disabled fills, subtle borders |
| `300–400` | Border | Default and hover borders for form controls |
| `500` | Action | **Primary interactive color** — filled buttons, checked states, progress, links |
| `600–700` | Action states | Hover (`600`) and active/pressed (`700`) for filled elements |
| `800` | Text on fill | Text color inside filled alert/badge backgrounds |
| `900–1000` | Deep | Not used directly in components; needed for dark mode inversion |

### How to apply steps in a component

**Filled element** (button, checkbox, progress bar):
```css
background: var(--color-primary-500);   /* default */
background: var(--color-primary-600);   /* hover   */
background: var(--color-primary-700);   /* active  */
```

**Ghost / transparent element** (ghost button, option row):
```css
background: transparent;                /* default */
background: var(--color-primary-0);     /* hover   */
background: var(--color-primary-100);   /* active  */
color: var(--color-primary-500);        /* text — all states */
```

**Outline element** (outline button, outline badge):
```css
border-color: var(--color-primary-500); /* default */
background:   var(--color-primary-0);   /* hover   */
background:   var(--color-primary-100); /* active  */
```

**Form control border** (input, select):
```css
border-color: var(--color-gray-accent-300); /* default */
border-color: var(--color-gray-accent-400); /* hover   */
border-color: var(--color-gray-accent-500); /* active  */
border-color: var(--color-primary-500);     /* focus   */
```

**Notification / badge variants**:
```css
/* filled  */ background: var(--color-red-accent-100); color: var(--color-red-accent-800);
/* surface */ background: var(--color-red-accent-0);   color: var(--color-red-accent-700); border-color: var(--color-red-accent-700);
/* fill    */ background: var(--color-red-accent-500); color: var(--color-white);
```

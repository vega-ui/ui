# Progress Styling

## Overview

`Progress` styling is split across the root bar surface and the visible track fill, with optional indeterminate animation at the root level.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--progress-height` | `Progress`, `ProgressTrack` | Bar thickness. |
| `--progress-value` | `ProgressTrack` | Current value. |
| `--progress-max` | `ProgressTrack` | Maximum range. |
| `--progress-track-color` | `ProgressTrack` | Fill color. |

## Part-Level Variables

- `Progress`: root size, background surface, and indeterminate mode.
- `ProgressTrack`: fill width, color, and animation.

## State And Variant Interaction

- `size` changes bar height.
- `variant` changes track color.
- `indeterminate` switches width and animation behavior.

## Examples

```css
.compactProgress {
  --progress-height: 4px;
}
```

```css
.brandProgress {
  --progress-track-color: var(--color-primary-500);
}
```

## Do Not Override

- Do not use fake determinate values when the task is really indeterminate.
- Do not remove enough contrast that the track becomes hard to read.
- Do not confuse progress styling with meter semantics.

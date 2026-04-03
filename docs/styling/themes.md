# Themes

VegaUI ships a separate theme layer in `@vega-ui/theme-core`. The package entrypoint is [packages/theme/src/index.css](/Users/slava/WebstormProjects/ui/packages/theme/src/index.css), which imports both [light.css](/Users/slava/WebstormProjects/ui/packages/theme/src/light.css) and [dark.css](/Users/slava/WebstormProjects/ui/packages/theme/src/dark.css).

## Theme Model

Themes are class-based:

- `.light`: light theme semantic values
- `.dark`: dark theme semantic values

Each theme imports `@vega-ui/tokens-core` first, then maps raw token scales into semantic application variables such as:

- `--background-color`
- `--text-color`
- `--focus-color`
- `--surface-primary`
- `--surface-secondary`
- `--border-color`
- `--fills-primary`
- `--label-primary`

## Key Semantic Variables

These are the main variables application code and component styles should rely on first.

| Variable | Role | Typical Consumers |
| --- | --- | --- |
| `--background-color` | base app canvas color | app shell backgrounds, thumb-on-track contrast, custom page layout |
| `--text-color` | default content color | `Text`, `Heading`, field values, icon triggers, option rows |
| `--focus-color` | focus outline color | buttons, links, sliders, radios, checkboxes, segmented control |
| `--surface-primary` | primary container surface | `DialogContent`, `DrawerContent`, `SheetContent`, `PopoverContent` |
| `--surface-secondary` | floating or transient surface | `SelectListbox`, `TooltipContent`, `TooltipArrow` |
| `--border-color` | default structural border | `Card`, `Fieldset`, `TableRow`, `CheckboxCard` |
| `--border-color-hover` | interactive border emphasis | hover-state border progression for border-driven surfaces |
| `--color-error` | validation and error feedback | `TextField`, `TextArea`, `PinField`, `HelperText` |
| `--fills-primary` | accent-selected fill | checked `Checkbox`, checked `Radio`, page control progress |
| `--fills-secondary` | neutral track or subdued fill | `Progress`, `Meter`, `MeterStack`, `SliderBase`, `Code`, off `Switch` |
| `--label-primary` | strong indicator label | page control active indicators and derived emphasis fills |
| `--label-secondary` | muted secondary text | `Fieldset` legend text, `Code` foreground, secondary metadata |
| `--disable-text-color` | disabled primary content | disabled button text, disabled field values, disabled segmented items |
| `--disable-background-color` | disabled control surface | disabled `TextField`, `TextArea`, `Select`, `Checkbox`, `Switch`, `ButtonBase` |
| `--surface-shadow` | elevated surface shadow | `Dialog`, `Drawer`, `Sheet`, `Popover`, `Tooltip`, `SelectListbox` |

## Semantic Token Types

`Key Semantic Variables` is the quick-reference layer. This section is the classification layer: it groups theme variables by semantic family so the system is easier to extend and reason about.

| Token | Semantic Type | Meaning In UI |
| --- | --- | --- |
| `--fills-primary` | `accent-soft-fill` | primary accent fill for selected or active UI |
| `--fills-primary-hover` | `accent-soft-fill-hover` | hover state for the primary accent fill |
| `--fills-primary-active` | `accent-soft-fill-active` | active state for the primary accent fill |
| `--fills-secondary` | `neutral-track-fill` | neutral fill for tracks, rails, and subdued containers |
| `--fills-secondary-hover` | `neutral-track-fill-hover` | hover state for neutral track-like surfaces |
| `--fills-secondary-active` | `neutral-track-fill-active` | active state for neutral track-like surfaces |
| `--fills-tertiary` | `field-surface` | default background for text-entry and field-like controls |
| `--fills-tertiary-hover` | `field-surface-hover` | hover state for field surfaces |
| `--fills-tertiary-active` | `field-surface-active` | active state for field surfaces |
| `--fills-quaternary-hover` | `micro-surface-hover` | lightweight hover fill for icon actions and micro-interactions |
| `--fills-quaternary-active` | `micro-surface-active` | active state for micro-interactions |
| `--surface-primary` | `container-surface` | main elevated surface for containers such as dialogs or sheets |
| `--surface-secondary` | `floating-surface` | floating surface for listboxes, popovers, and tooltips |
| `--surface-shadow` | `elevation-shadow` | shadow for elevated surfaces |
| `--text-color` | `content-primary` | default readable content color |
| `--text-color-inverce` | `content-on-accent` | readable content color on accent-filled backgrounds |
| `--label-primary` | `label-strong` | strong UI label or indicator color |
| `--label-secondary` | `label-muted` | secondary label or metadata color |
| `--label-tertiary` | `label-subtle` | placeholder, helper, and subdued label color |
| `--border-color` | `border-default` | default structural border color |
| `--border-color-hover` | `border-hover` | hover state for structural borders |
| `--border-color-active` | `border-active` | active state for structural borders |
| `--disable-background-color` | `disabled-surface` | disabled background and surface fill |
| `--disable-text-color` | `disabled-content` | disabled primary text or value color |
| `--disable-label-text-color` | `disabled-subtle-content` | disabled secondary, helper, or placeholder text color |
| `--disable-border-color` | `disabled-border` | disabled border or indicator color |
| `--focus-color` | `focus-ring` | focus ring and outline color |
| `--color-error` | `feedback-error` | error and validation feedback color |
| `--overlay` | `backdrop-overlay` | backdrop tint for modal and overlay layers |
| `--separator-opaque` | `separator-strong` | visible separators, handles, and dividers |

## Semantic Families

Think about theme variables in these families first:

- `fills-*`: interactive fill semantics for selected, hovered, pressed, or field-like surfaces
- `surface-*`: container and floating surface semantics for overlays and elevated UI
- `text-*` and `label-*`: readable content and UI-label semantics
- `border-*`: structural boundary and border-emphasis semantics
- `disable-*`: disabled-state surface, content, and border semantics
- `focus-color`, `color-error`, `overlay`, `separator-*`: system and state-feedback semantics

## Semantic Types In Practice

These semantic types come from how the UI package actually uses the variables:

- `accent-soft-fill`: selected or checked states such as `Checkbox`, `Radio`, and page-control progress
- `neutral-track-fill`: tracks and neutral bars such as `Progress`, `Meter`, `MeterStack`, and `SliderBase`
- `field-surface`: input-like controls such as `TextField`, `TextArea`, `PinField`, and `SelectCombobox`
- `micro-surface-*`: low-emphasis hover and active surfaces for icon buttons, trigger buttons, and picker items
- `container-surface`: primary overlay or panel surfaces such as `DialogContent`, `DrawerContent`, and `SheetContent`
- `floating-surface`: floating content surfaces such as `SelectListbox`, `TooltipContent`, and `PopoverContent`
- `content-*`, `label-*`, `border-*`, and `disable-*`: text, label, border, and disabled-state semantics reused across the entire kit

Use this section to answer “what class of semantic token do I need here?”, then use `Key Semantic Variables` to pick the concrete variable name.

## How To Apply A Theme

```tsx
import '@vega-ui/theme-core';

export function App() {
  return <div className='light'>{/* app */}</div>;
}
```

Switching theme is a class change at the application boundary:

```tsx
<div className={isDark ? 'dark' : 'light'}>{/* app */}</div>
```

## App Shell With Theme Switcher

```tsx
import { useState } from 'react';
import '@vega-ui/theme-core';

type ThemeName = 'light' | 'dark';

export function AppShell() {
  const [theme, setTheme] = useState<ThemeName>('light');

  return (
    <div className={theme} style={{ minHeight: '100vh', background: 'var(--background-color)', color: 'var(--text-color)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: 16 }}>
        <strong>VegaUI App</strong>
        <button type='button' onClick={() => setTheme((value) => (value === 'light' ? 'dark' : 'light'))}>
          Switch to {theme === 'light' ? 'dark' : 'light'}
        </button>
      </header>

      <main style={{ padding: 16 }}>
        {/* app */}
      </main>
    </div>
  );
}
```

Apply the theme class once around the application shell. Do not toggle themes per component subtree unless the product explicitly needs nested theme islands.

## Theme Customization

The safest customization path is to define your own theme class and override semantic variables there.

```css
@import '@vega-ui/theme-core';

.brand-sunrise {
  --background-color: #fffaf3;
  --text-color: #251b10;
  --surface-primary: #fffdf9;
  --surface-secondary: #fff7ec;
  --border-color: #e7d7c2;
  --focus-color: var(--color-orange-accent-400);
  --fills-primary: color-mix(in oklab, var(--color-orange-accent-500) 16%, transparent);
  --fills-primary-hover: color-mix(in oklab, var(--color-orange-accent-500) 22%, transparent);
  --label-secondary: #7a6653;
}
```

Then apply that class at the app boundary the same way as `.light` or `.dark`.

Customize semantic variables first. Reach for component-local variables only when the change should affect one component family rather than the whole application.

## Light vs Dark Behavior

Light and dark themes keep the same semantic variable names. The main difference is how those semantics map onto the raw token scale.

In particular, accent colors are inverted in dark mode. For example, `--color-blue-accent-100` points to a lighter raw blue in light mode and a darker raw blue in dark mode. That is why component styles should prefer semantic accent variables over raw palette steps.

## Guidance

- apply the theme class high in the tree, not per component
- consume semantic variables in component CSS whenever possible
- avoid writing component-specific light/dark overrides when a semantic theme variable already exists
- customize semantic variables before touching component-local `--component-*` variables

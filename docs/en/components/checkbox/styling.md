# Checkbox Styling

## Overview

`Checkbox` styling is split across the root label state model and the visible indicator surface. Checked, indeterminate, disabled, and focus behavior are coordinated through root-level CSS variables.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--checkbox-size` | `Checkbox`, `CheckboxIndicator` | Visual size. |
| `--checkbox-border-color` | `Checkbox`, `CheckboxIndicator` | Current border color. |
| `--checkbox-background-color` | `Checkbox`, `CheckboxIndicator` | Current background color. |
| `--checkbox-color` | `CheckboxIndicator` | Icon color. |
| `--checkbox-outline` | `CheckboxIndicator` | Focus outline. |
| `--checkbox-border-color-hover` | `Checkbox` | Border color on hover. |
| `--checkbox-border-color-active` | `Checkbox` | Border color while pressed. |

## Part-Level Variables

- `Checkbox`: root state owner for checked, indeterminate, disabled, and variant styles.
- `CheckboxIndicator`: visible control surface.
- `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon`: icon rendering inside the indicator.

## State And Variant Interaction

- `variant` changes the checked and indeterminate color family.
- Disabled state overrides both background and border semantics.
- Focus lives on the visually hidden input but is rendered through the indicator.

## Examples

<!-- example: checkbox/examples.css -->
```css
.brandCheckbox {
  --checkbox-br-ratio: 0.25;
}
```
<!-- /example -->

<!-- example: checkbox/styling-examples.css -->
```css
.compactCheckbox {
  --checkbox-size: 14px;
}
```
<!-- /example -->

### Custom state icons

Children of `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon` replace the default icon of that state. The other state keeps its default icon.

<!-- example: checkbox/custom-state-icons.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon>
            <Rocket />
          </CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Deploy after merge
      </Checkbox>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput indeterminate />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon>
            <Diff />
          </CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Files with changes
      </Checkbox>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not remove the focus outline without a replacement.
- Do not hide the difference between unchecked and checked or indeterminate states.
- Do not force custom colors that weaken disabled-state readability.

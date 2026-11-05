# CheckboxCard Styling

## Overview

`CheckboxCard` builds on `Card` and adds a small card-specific styling layer for orientation, hover, checked, indeterminate, and disabled border treatment.

## Public CSS Variables

| Variable | Purpose |
| --- | --- |
| `--checkbox-card-background-color` | card surface override hook |
| `--card-border-color` | main border color, adjusted by state |

## Part-Level Variables

### Root

The root `.checkboxCard` element owns orientation, hover, active, checked, and disabled border styling.

### Content

`CheckboxCardContent`, `CheckboxCardTitle`, and `CheckboxCardDescription` rely mostly on the `Card` text and spacing layer.

### Control

The control visuals are driven by the composed checkbox-card control parts.

## State And Variant Interaction

- `data-orientation='vertical' | 'horizontal'` changes layout direction and spacing.
- `data-variant='primary' | 'secondary'` changes checked and indeterminate border color.
- `:has(input[type='checkbox']:checked)` and `:has(...:indeterminate)` drive selected border state.
- Disabled state remaps the border color to disabled theme tokens.

## Examples

### Local minimum width override

The root has `min-width: 220px`. Lower it with a local class when several short cards should fit in one row; the example imports the stylesheet next to it.

<!-- example: checkbox-card/local-minimum-width-override.css -->
```css
.compactPlanCard {
  min-width: 104px;
}
```
<!-- /example -->

<!-- example: checkbox-card/local-minimum-width-override.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import './local-minimum-width-override.css';

const regions = [
  { value: 'eu', title: 'Europe', description: 'Frankfurt' },
  { value: 'us', title: 'US', description: 'Virginia' },
  { value: 'apac', title: 'Asia', description: 'Singapore' },
];

export default function LocalMinimumWidthOverride() {
  return (
    <div role='group' aria-label='Backup regions' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', width: '100%' }}>
      {regions.map((region) => (
        <CheckboxCard key={region.value} size='sm' className='compactPlanCard'>
          <CheckboxCardContent>
            <CheckboxCardTitle>{region.title}</CheckboxCardTitle>
            <CheckboxCardDescription>{region.description}</CheckboxCardDescription>
          </CheckboxCardContent>
          <CheckboxCardControl>
            <CheckboxCardControlInput name='regions' value={region.value} defaultChecked={region.value === 'eu'} />
            <CheckboxIndicator>
              <CheckboxCardControlCheckedIcon />
              <CheckboxCardControlIndeterminateIcon />
            </CheckboxIndicator>
          </CheckboxCardControl>
        </CheckboxCard>
      ))}
    </div>
  );
}
```
<!-- /example -->

### Custom state icons

Children of `CheckboxCardControlCheckedIcon` and `CheckboxCardControlIndeterminateIcon` replace the default icon of that state. The other state keeps its default icon.

<!-- example: checkbox-card/custom-state-icons.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import { Diff, Rocket } from '@vega-ui/icons';

export default function CustomStateIcons() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', width: '100%' }}>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Deploy after merge</CheckboxCardTitle>
          <CheckboxCardDescription>Ship to production as soon as checks pass.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput defaultChecked />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon>
              <Rocket />
            </CheckboxCardControlCheckedIcon>
            <CheckboxCardControlIndeterminateIcon />
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
      <CheckboxCard>
        <CheckboxCardContent>
          <CheckboxCardTitle>Review changed files</CheckboxCardTitle>
          <CheckboxCardDescription>3 of 12 files are already reviewed.</CheckboxCardDescription>
        </CheckboxCardContent>
        <CheckboxCardControl>
          <CheckboxCardControlInput indeterminate />
          <CheckboxIndicator>
            <CheckboxCardControlCheckedIcon />
            <CheckboxCardControlIndeterminateIcon>
              <Diff />
            </CheckboxCardControlIndeterminateIcon>
          </CheckboxIndicator>
        </CheckboxCardControl>
      </CheckboxCard>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- breaking the labeled-card click target with pointer-events hacks
- styling checked cards in ways that hide disabled or indeterminate state
- treating descriptive text spacing as if it were independent from card orientation

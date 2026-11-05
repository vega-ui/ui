# SegmentedControl Patterns

## Short View Or Mode Selector

When to use:

- Users switch between a few always-visible views or modes.

Composition notes:

- Keep the option set short.
- Use concise labels that stay comparable side by side.

Trade-offs:

- Strong visual comparison.
- Weak fit for long option sets.

<!-- example: segmented-control/view-range-selector.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function ViewRangeSelector() {
  return (
    <SegmentedControl name='calendar-view' defaultValue='week' role='radiogroup' aria-label='Calendar view'>
      <SegmentedControlItem value='day'>
        <SegmentedControlItemInput />
        Day
      </SegmentedControlItem>
      <SegmentedControlItem value='week'>
        <SegmentedControlItemInput />
        Week
      </SegmentedControlItem>
      <SegmentedControlItem value='month'>
        <SegmentedControlItemInput />
        Month
      </SegmentedControlItem>
      <SegmentedControlItem value='year'>
        <SegmentedControlItemInput />
        Year
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Compact Theme Or Density Selector

When to use:

- A settings surface needs a dense exclusive selector with strong visual affordance.

Composition notes:

- Use icon-only segments only when the meaning is already obvious.
- Keep the option count small and balanced.

Trade-offs:

- Compact and expressive.
- More fragile than radio groups when labels or icons are uneven.

<!-- example: segmented-control/icon-only-mode-selector.tsx -->
```tsx
import {
  Icon,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { MonitorIcon, MoonIcon, SunIcon } from '@vega-ui/icons';

export default function IconOnlyModeSelector() {
  return (
    <SegmentedControl name='appearance' defaultValue='system' size='sm' role='radiogroup' aria-label='Appearance'>
      <SegmentedControlItem value='light' title='Light'>
        <SegmentedControlItemInput aria-label='Light' />
        <Icon size='sm'><SunIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='system' title='System'>
        <SegmentedControlItemInput aria-label='System' />
        <Icon size='sm'><MonitorIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='dark' title='Dark'>
        <SegmentedControlItemInput aria-label='Dark' />
        <Icon size='sm'><MoonIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Exclusive Selector Inside Overlays

When to use:

- A dialog or drawer needs one short, always-visible choice group.

Composition notes:

- Keep the control compact enough for the overlay width.
- Avoid mixing too many long labels in constrained layouts.

Trade-offs:

- Works well for short overlay forms.
- Breaks down if the content becomes too wide or too numerous.

<!-- example: segmented-control/exclusive-selector-inside-overlays.tsx -->
```tsx
import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const densities = [
  { value: 'compact', label: 'Compact' },
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
];

export default function ExclusiveSelectorInsideOverlays() {
  const [density, setDensity] = useState('default');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setDensity(String(data.get('density')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Row density: <strong>{density}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Display settings</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='display-settings-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='display-settings-title' as='h2' size={4} fontWeight={600}>Display settings</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label id='density-label'>Row density</Label>
              <SegmentedControl name='density' defaultValue={density} role='radiogroup' aria-labelledby='density-label'>
                {densities.map((item) => (
                  <SegmentedControlItem key={item.value} value={item.value}>
                    <SegmentedControlItemInput />
                    {item.label}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
            </div>
            <Button type='submit'>Apply</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## With Separators

When to use:

- Segments need a visible boundary between them, for example on a low-contrast surface.

Composition notes:

- Place a vertical `Separator` between the items; it is a sibling, not part of any item.
- Give the root `display: flex` so the separators line up with the items.

Trade-offs:

- Clearer boundaries between options.
- The separators stay visible next to the selected segment.

<!-- example: segmented-control/with-separators.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Separator,
} from '@vega-ui/react';

export default function WithSeparators() {
  return (
    <SegmentedControl
      name='sort-order'
      defaultValue='newest'
      role='radiogroup'
      aria-label='Sort by'
      style={{ display: 'flex', width: 'min-content' }}
    >
      <SegmentedControlItem value='newest'>
        <SegmentedControlItemInput />
        Newest
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='popular'>
        <SegmentedControlItemInput />
        Most popular
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='price'>
        <SegmentedControlItemInput />
        Price
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

# SegmentedControl Examples

## Basic

### Basic: view switcher

Each segment is a `SegmentedControlItem` with a hidden `SegmentedControlItemInput` radio, all sharing the root `name`. The root does not set a role on its own, so pass `role='radiogroup'` and an `aria-label` to name the group.

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

## Controlled/Stateful

### Controlled/Stateful: date range driving a summary

The parent owns `value` and updates it from `event.currentTarget.value` in `onChange`. The visitor totals below are computed from the selected range.

<!-- example: segmented-control/parent-owned-selected-segment.tsx -->
```tsx
import { useState } from 'react';
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';

const dailyVisitors = [
  1180, 1240, 990, 1430, 1510, 870, 760, 1320, 1290, 1405, 1388, 1460, 910, 820, 1500,
  1530, 1475, 1610, 1580, 960, 880, 1620, 1700, 1655, 1590, 1720, 1010, 940, 1750, 1810,
];
const ranges = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
];

export default function ParentOwnedSelectedSegment() {
  const [range, setRange] = useState('7');

  const days = dailyVisitors.slice(-Number(range));
  const total = days.reduce((sum, visitors) => sum + visitors, 0);
  const average = Math.round(total / days.length);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <SegmentedControl
        name='traffic-range'
        role='radiogroup'
        aria-label='Date range'
        value={range}
        onChange={(event) => setRange(event.currentTarget.value)}
      >
        {ranges.map((item) => (
          <SegmentedControlItem key={item.value} value={item.value}>
            <SegmentedControlItemInput />
            {item.label}
          </SegmentedControlItem>
        ))}
        <SegmentedControlIndicator />
      </SegmentedControl>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {total.toLocaleString('en-US')} visitors in the last {range} days · {average.toLocaleString('en-US')} per day
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: reading the value with FormData

The inputs are native radios with the root `name`, so `FormData.get('export-format')` returns the selected `value`. `defaultValue` becomes `defaultChecked`, so the form reset restores it.

<!-- example: segmented-control/native-radio-group-participation.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';

export default function NativeRadioGroupParticipation() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`format=${data.get('export-format')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='export-format-label'>File format</Label>
        <SegmentedControl name='export-format' defaultValue='csv' role='radiogroup' aria-labelledby='export-format-label'>
          <SegmentedControlItem value='csv'>
            <SegmentedControlItemInput />
            CSV
          </SegmentedControlItem>
          <SegmentedControlItem value='xlsx'>
            <SegmentedControlItemInput />
            Excel
          </SegmentedControlItem>
          <SegmentedControlItem value='json'>
            <SegmentedControlItemInput />
            JSON
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Export report</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: selector inside a dialog

The control lives in a `form method='dialog'`: applying reads `FormData`, updates the value outside and closes the dialog. The dialog content remounts on open, so `defaultValue` starts from the applied value.

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

## Error

### Error: required choice with no default

Without `defaultValue` nothing is selected. `required` on the inputs blocks submit; their `invalid` event shows a `HelperText` linked to the group through `aria-describedby`, marks the inputs `aria-invalid` and focuses the first segment. Selecting a size clears the error.

<!-- example: segmented-control/required-visible-choice-without-a-selection.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  HelperText,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function RequiredVisibleChoiceWithoutASelection() {
  const [invalid, setInvalid] = useState(false);
  const [added, setAdded] = useState('');

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.value === sizes[0]) {
      event.currentTarget.focus();
    }
    setInvalid(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAdded(`Size ${data.get('size')} added to the cart.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='size-label'>Size</Label>
        <SegmentedControl
          name='size'
          role='radiogroup'
          aria-labelledby='size-label'
          aria-describedby={invalid ? 'size-error' : undefined}
          onChange={() => setInvalid(false)}
        >
          {sizes.map((size) => (
            <SegmentedControlItem key={size} value={size}>
              <SegmentedControlItemInput
                required
                aria-invalid={invalid}
                onInvalid={handleInvalid}
              />
              {size}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
        {invalid && <HelperText id='size-error' error>Choose a size to add the jacket to the cart.</HelperText>}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Add to cart</Button>
        {added && <HelperText aria-live='polite'>{added}</HelperText>}
      </div>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: locked group and one unavailable segment

`disabled` on the root disables every input and keeps the selected segment visible. For a single segment, `disabled` on `SegmentedControlItem` only changes its look; put `disabled` on its `SegmentedControlItemInput` as well to make it unselectable.

<!-- example: segmented-control/selected-disabled-control.tsx -->
```tsx
import {
  HelperText,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function SelectedDisabledControl() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='billing-label'>Billing</Label>
        <SegmentedControl
          name='billing'
          defaultValue='yearly'
          disabled
          role='radiogroup'
          aria-labelledby='billing-label'
          aria-describedby='billing-note'
        >
          <SegmentedControlItem value='monthly'>
            <SegmentedControlItemInput />
            Monthly
          </SegmentedControlItem>
          <SegmentedControlItem value='yearly'>
            <SegmentedControlItemInput />
            Yearly
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <HelperText id='billing-note'>Locked until your contract renews on March 1.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='quality-label'>Video quality</Label>
        <SegmentedControl name='quality' defaultValue='1080p' role='radiogroup' aria-labelledby='quality-label'>
          <SegmentedControlItem value='720p'>
            <SegmentedControlItemInput />
            720p
          </SegmentedControlItem>
          <SegmentedControlItem value='1080p'>
            <SegmentedControlItemInput />
            1080p
          </SegmentedControlItem>
          <SegmentedControlItem value='4k' disabled>
            <SegmentedControlItemInput disabled aria-describedby='quality-note' />
            4K
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <HelperText id='quality-note'>4K is available on the Premium plan.</HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: icon-only segments

Icons carry no text, so every `SegmentedControlItemInput` gets an `aria-label`, and `title` on the item gives sighted mouse users the same name on hover.

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

### Edge: numeric values

Item values can be numbers, but `event.currentTarget.value` is always a string, so convert it with `Number` before storing it. The number of grid columns follows the selection.

<!-- example: segmented-control/numeric-values.tsx -->
```tsx
import { useState } from 'react';
import {
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

const columnOptions = [1, 2, 3, 4];
const photos = ['Harbor', 'Dunes', 'Glacier', 'Canyon', 'Forest', 'Delta', 'Reef', 'Ridge'];

export default function NumericValues() {
  const [columns, setColumns] = useState(3);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Label id='columns-label'>Columns</Label>
        <SegmentedControl
          name='columns'
          size='sm'
          role='radiogroup'
          aria-labelledby='columns-label'
          value={columns}
          onChange={(event) => setColumns(Number(event.currentTarget.value))}
        >
          {columnOptions.map((option) => (
            <SegmentedControlItem key={option} value={option}>
              <SegmentedControlItemInput />
              {option}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'var(--spacing-4)' }}>
        {photos.map((photo) => (
          <div
            key={photo}
            style={{
              display: 'grid',
              placeItems: 'center',
              height: 64,
              borderRadius: 'var(--radius-2)',
              background: 'var(--fills-tertiary)',
              color: 'var(--label-secondary)',
            }}
          >
            {photo}
          </div>
        ))}
      </div>
    </div>
  );
}
```
<!-- /example -->

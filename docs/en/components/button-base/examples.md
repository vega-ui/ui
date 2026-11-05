# ButtonBase Examples

## Basic

### Basic: variants and appearances

`ButtonBase` maps `variant` and `appearance` to colors and state styles but has no height or padding. Every example here adds its own spacing, which is exactly what `Button` and `IconButton` do on top of it.

<!-- example: button-base/variant-appearance-matrix.tsx -->
```tsx
import { ButtonBase, type ButtonBaseAppearance, type ButtonBaseVariant } from '@vega-ui/react';

const variants: ButtonBaseVariant[] = ['primary', 'secondary'];
const appearances: ButtonBaseAppearance[] = ['fill', 'outline', 'ghost', 'transparent'];

export default function VariantAppearanceMatrix() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--spacing-4)', width: '100%' }}>
      {appearances.map((appearance) => variants.map((variant) => (
        <ButtonBase
          key={`${variant}-${appearance}`}
          type='button'
          variant={variant}
          appearance={appearance}
          style={{ padding: 'var(--spacing-3) var(--spacing-8)', borderRadius: 'var(--radius-3)', fontSize: 'var(--font-size-2)' }}
        >
          {variant} {appearance}
        </ButtonBase>
      )))}
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: filter chips with aria-pressed

Pill-shaped chips are a typical custom surface built on `ButtonBase`. Each chip is a toggle with `aria-pressed`, the parent owns the selected filters, and the list below reacts to them.

<!-- example: button-base/filter-chips.tsx -->
```tsx
import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

const tasks = [
  { title: 'Draft Q3 roadmap', status: 'open' },
  { title: 'Review onboarding copy', status: 'review' },
  { title: 'Fix billing export', status: 'open' },
  { title: 'Ship dark theme', status: 'done' },
  { title: 'Audit color contrast', status: 'review' },
];

const filters = ['open', 'review', 'done'];

export default function FilterChips() {
  const [active, setActive] = useState<string[]>(['open']);

  const toggle = (filter: string) => {
    if (active.includes(filter)) {
      setActive(active.filter((item) => item !== filter));
      return;
    }

    setActive([...active, filter]);
  };

  const visible = tasks.filter((task) => active.includes(task.status));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='group' aria-label='Task status' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {filters.map((filter) => {
          const pressed = active.includes(filter);

          return (
            <ButtonBase
              key={filter}
              type='button'
              variant={pressed ? 'primary' : 'secondary'}
              appearance={pressed ? 'fill' : 'ghost'}
              aria-pressed={pressed}
              onClick={() => toggle(filter)}
              style={{
                padding: 'var(--spacing-2) var(--spacing-8)',
                borderRadius: 999,
                fontSize: 'var(--font-size-2)',
                textTransform: 'capitalize',
              }}
            >
              {filter}
            </ButtonBase>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <p role='status' style={{ margin: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', fontVariantNumeric: 'tabular-nums' }}>
          {visible.length} of {tasks.length} tasks
        </p>
        <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
          {visible.map((task) => <li key={task.title}>{task.title}</li>)}
        </ul>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: explicit button types in a search form

`ButtonBase` renders a native `<button>`, whose default type is `submit`. The Clear action sets `type='button'` so it does not submit the form; Search submits it and the query is read with `FormData`.

<!-- example: button-base/submit-button-with-explicit-type.tsx -->
```tsx
import { ButtonBase, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

const actionStyle = {
  flexShrink: 0,
  paddingInline: 'var(--spacing-8)',
  borderRadius: 'var(--radius-3)',
  fontSize: 'var(--font-size-2)',
};

export default function SubmitButtonWithExplicitType() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(String(new FormData(event.currentTarget).get('q')));
  };

  return (
    <form role='search' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <TextField style={{ flex: 1, minWidth: 0 }}>
          <TextFieldInput
            name='q'
            type='search'
            aria-label='Search invoices'
            placeholder='Invoice or customer'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />
        </TextField>
        <ButtonBase type='button' variant='secondary' appearance='ghost' style={actionStyle} onClick={() => setQuery('')}>
          Clear
        </ButtonBase>
        <ButtonBase type='submit' style={actionStyle}>
          Search
        </ButtonBase>
      </div>
      <output style={{ color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', overflowWrap: 'anywhere' }}>
        {searched === '' ? 'Nothing searched yet' : `Results for “${searched}”`}
      </output>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: full-row actions in a settings list

`ButtonBase` does not impose layout, so a whole list row can become one action with an icon, two lines of text, and a chevron. `textAlign: 'start'` and `width: '100%'` turn the centered button into a row.

<!-- example: button-base/list-row-actions.tsx -->
```tsx
import { ButtonBase, Icon } from '@vega-ui/react';
import { BellIcon, ChevronRightIcon, LockIcon, UserIcon } from '@vega-ui/icons';
import { type ReactNode, useState } from 'react';
import './examples.css';

const rows: { id: string, label: string, hint: string, icon: ReactNode }[] = [
  { id: 'profile', label: 'Profile', hint: 'Name, photo, bio', icon: <UserIcon /> },
  { id: 'security', label: 'Security', hint: 'Password and two-factor', icon: <LockIcon /> },
  { id: 'notifications', label: 'Notifications', hint: 'Email and push', icon: <BellIcon /> },
];

export default function ListRowActions() {
  const [opened, setOpened] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <div
        role='group'
        aria-label='Settings sections'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-1)',
          padding: 'var(--spacing-2)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
          background: 'var(--surface-primary)',
        }}
      >
        {rows.map((row) => (
          <ButtonBase
            key={row.id}
            type='button'
            variant='secondary'
            appearance={opened === row.id ? 'ghost' : 'transparent'}
            aria-current={opened === row.id ? 'true' : undefined}
            onClick={() => setOpened(row.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-6)',
              width: '100%',
              padding: 'var(--spacing-5) var(--spacing-6)',
              borderRadius: 'var(--radius-3)',
              fontSize: 'var(--font-size-3)',
              textAlign: 'start',
            }}
          >
            <Icon size='md' style={{ color: 'var(--label-secondary)' }}>{row.icon}</Icon>
            <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              {row.label}
              <span style={{ fontSize: 'var(--font-size-2)', fontWeight: 400, color: 'var(--label-secondary)' }}>{row.hint}</span>
            </span>
            <Icon size='sm' className='listRowChevron' style={{ color: 'var(--label-tertiary)' }}><ChevronRightIcon /></Icon>
          </ButtonBase>
        ))}
      </div>
      <p style={{ margin: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' }}>
        {opened === '' ? 'Pick a section' : `Opened: ${opened}`}
      </p>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: blocked while permissions are loading

The action stays disabled until the permission check resolves. The reason is shown in a status next to the button, because a disabled button cannot be focused to read a description.

<!-- example: button-base/blocked-action-while-permissions-are-loading.tsx -->
```tsx
import { ButtonBase, Spinner } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function BlockedActionWhilePermissionsAreLoading() {
  const [canTransfer, setCanTransfer] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCanTransfer(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const loading = canTransfer === null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <ButtonBase
        type='button'
        variant='secondary'
        appearance='ghost'
        disabled={!canTransfer}
        style={{
          flexShrink: 0,
          padding: 'var(--spacing-3) var(--spacing-8)',
          borderRadius: 'var(--radius-3)',
          fontSize: 'var(--font-size-2)',
        }}
      >
        Transfer ownership
      </ButtonBase>
      <span role='status' style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          minWidth: 0,
          color: 'var(--label-secondary)',
          fontSize: 'var(--font-size-2)',
        }}>
        {loading && <Spinner size={2} aria-hidden='true' />}
        {loading ? 'Checking permissions…' : 'You own this workspace'}
      </span>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: custom variant string

`variant` accepts any string, but only `primary` and `secondary` have CSS. A custom value such as `danger` gets no colors until you set the `--button-*` variables yourself; its disabled look also needs your own CSS.

<!-- example: button-base/custom-variant-string.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { ButtonBase } from '@vega-ui/react';
import { useState } from 'react';

const danger = {
  '--button-color': 'var(--color-white)',
  '--button-color-hover': 'var(--color-white)',
  '--button-color-active': 'var(--color-white)',
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
  padding: 'var(--spacing-3) var(--spacing-8)',
  borderRadius: 'var(--radius-3)',
  fontSize: 'var(--font-size-2)',
  flexShrink: 0,
} as CSSProperties;

export default function CustomVariantString() {
  const [revoked, setRevoked] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <ButtonBase type='button' variant='danger' style={danger} onClick={() => setRevoked(true)}>
        Revoke all sessions
      </ButtonBase>
      <span style={{ minWidth: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' }}>
        {revoked ? 'All devices were signed out' : '3 active devices'}
      </span>
    </div>
  );
}
```
<!-- /example -->

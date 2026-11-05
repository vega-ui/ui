# Option Examples

## Basic

### Basic: rows inside a named list

`Option` renders a row with `role='option'`, so it always goes inside an element with `role='listbox'` and an accessible name. `selected` only paints and announces the state; it does not manage it.

<!-- example: option/basic-usage.tsx -->
```tsx
import { Option } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <div role='listbox' aria-label='Issue status' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      <Option>Backlog</Option>
      <Option selected>In progress</Option>
      <Option>In review</Option>
      <Option>Done</Option>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: selected state from parent

A custom list owns both states: `selected` follows a click or Enter, `active` follows the arrow keys. The focus stays on the list, which points at the active row with `aria-activedescendant`, so every row needs an `id`.

<!-- example: option/selected-state-from-parent.tsx -->
```tsx
import { Option, Text } from '@vega-ui/react';
import { KeyboardEvent, useId, useState } from 'react';

const statuses = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'progress', label: 'In progress' },
  { value: 'review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

export default function SelectedStateFromParent() {
  const id = useId();
  const [selected, setSelected] = useState('review');
  const [active, setActive] = useState<string | null>(null);
  const current = statuses.find((status) => status.value === selected);

  const moveActive = (step: number) => {
    const index = statuses.findIndex((status) => status.value === active);
    const next = Math.min(Math.max(index + step, 0), statuses.length - 1);
    setActive(statuses[next].value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (active === null) return;

    event.preventDefault();
    setSelected(active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 260 }}>
      <div
        role='listbox'
        tabIndex={0}
        aria-label='Issue status'
        aria-activedescendant={active === null ? undefined : `${id}-${active}`}
        onKeyDown={onKeyDown}
        onFocus={() => setActive(selected)}
        onBlur={() => setActive(null)}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
      >
        {statuses.map((status) => (
          <Option
            key={status.value}
            id={`${id}-${status.value}`}
            selected={status.value === selected}
            active={status.value === active}
            onClick={() => setSelected(status.value)}
          >
            {status.label}
          </Option>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Status: {current?.label}</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: suggestions for a text field

The text field is the combobox and keeps the focus: it points at the active suggestion with `aria-activedescendant`, and Enter or a click copies the name into the field, which the form submits as `assignee`. `onMouseDown` prevents the row from taking the focus away from the field.

<!-- example: option/option-in-custom-selector-list.tsx -->
```tsx
import { Button, Label, Option, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, KeyboardEvent, useId, useState } from 'react';

const people = ['Amara Okafor', 'Boris Petrov', 'Chloé Lefèvre', 'Dmitri Volkov', 'Elena Rossi', 'Farah Haddad'];

export default function OptionInCustomSelectorList() {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState('');

  const matches = people.filter((person) => person.toLowerCase().includes(query.trim().toLowerCase()));
  const open = query.trim() !== '' && !people.includes(query);

  const choose = (person: string) => {
    setQuery(person);
    setActive(0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(Math.min(active + 1, matches.length - 1));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(Math.max(active - 1, 0));
      return;
    }

    if (event.key !== 'Enter') return;

    event.preventDefault();
    choose(matches[active]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('assignee')));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 300 }}>
      <Label htmlFor={id}>Assignee</Label>
      <TextField>
        <TextFieldInput
          id={id}
          name='assignee'
          role='combobox'
          autoComplete='off'
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && matches.length > 0 ? `${listId}-${active}` : undefined}
          placeholder='Start typing a name'
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
      </TextField>
      <div
        role='listbox'
        id={listId}
        aria-label='Matching people'
        hidden={!open}
        style={{ display: open ? 'flex' : 'none', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
      >
        {matches.map((person, index) => (
          <Option
            key={person}
            id={`${listId}-${index}`}
            size='sm'
            active={index === active}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => choose(person)}
          >
            {person}
          </Option>
        ))}
        {matches.length === 0 && (
          <Text size={2} style={{ padding: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>Nobody matches “{query}”.</Text>
        )}
      </div>
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Assign</Button>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Assigned to {submitted}.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: rich option content

Rows with an icon and a hint inside a raised panel. The row is still one selection surface; two-line content needs `height: 'auto'`, because the row height is fixed by size.

<!-- example: option/rich-option-content.tsx -->
```tsx
import { Icon, Option, Text } from '@vega-ui/react';
import { CopyIcon, LinkIcon, MailIcon, Share2Icon } from '@vega-ui/icons';

const actions = [
  { value: 'link', label: 'Copy link', hint: 'Anyone with the link can view', icon: LinkIcon },
  { value: 'email', label: 'Send by email', hint: 'Up to 20 recipients', icon: MailIcon },
  { value: 'duplicate', label: 'Duplicate', hint: 'Creates a private copy', icon: CopyIcon },
  { value: 'export', label: 'Export to Drive', hint: 'PDF or DOCX', icon: Share2Icon },
];

export default function RichOptionContent() {
  return (
    <div
      role='listbox'
      aria-label='Share options'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-4)',
        width: '100%',
        maxWidth: 300,
        boxSizing: 'border-box',
        borderRadius: 'var(--spacing-8)',
        background: 'var(--surface-secondary)',
        border: '1px solid var(--separator-opaque)',
        boxShadow: 'var(--surface-shadow)',
      }}
    >
      {actions.map((action) => (
        <Option
          key={action.value}
          selected={action.value === 'link'}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-8)' }}
        >
          <Icon size='sm'>
            <action.icon />
          </Icon>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Text size={3}>{action.label}</Text>
            <Text size={2} style={{ opacity: 0.75 }}>{action.hint}</Text>
          </span>
        </Option>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: unavailable options with a reason

Disabled rows stay visible and ignore clicks. The reason is shown in the row and linked with `aria-describedby`, so a screen reader announces why the plan cannot be chosen.

<!-- example: option/unavailable-plan-hint.tsx -->
```tsx
import { Option } from '@vega-ui/react';
import { useId } from 'react';

const plans = [
  { value: 'starter', label: 'Starter', reason: '' },
  { value: 'team', label: 'Team', reason: '' },
  { value: 'legacy', label: 'Legacy Pro', reason: 'No longer available for new workspaces' },
  { value: 'enterprise', label: 'Enterprise', reason: 'Requires a sales contract' },
];

export default function UnavailablePlanHint() {
  const id = useId();

  return (
    <div role='listbox' aria-label='Plan' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      {plans.map((plan) => (
        <Option
          key={plan.value}
          selected={plan.value === 'team'}
          disabled={plan.reason !== ''}
          aria-describedby={plan.reason === '' ? undefined : `${id}-${plan.value}`}
          style={plan.reason === '' ? undefined : { height: 'auto', paddingBlock: 'var(--spacing-5)' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            {plan.label}
            {plan.reason !== '' && (
              <span id={`${id}-${plan.value}`} style={{ fontSize: 'var(--font-size-2)' }}>
                {plan.reason}
              </span>
            )}
          </span>
        </Option>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: active but not selected row

`active` and `selected` are separate: the active row is where the keyboard is, the selected row is the value. Here "Newest first" is the value while the list points at "Oldest first".

<!-- example: option/active-but-not-selected-row.tsx -->
```tsx
import { Option } from '@vega-ui/react';
import { useId } from 'react';

export default function ActiveButNotSelectedRow() {
  const id = useId();

  return (
    <div
      role='listbox'
      tabIndex={0}
      aria-label='Sort by'
      aria-activedescendant={`${id}-oldest`}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
    >
      <Option id={`${id}-newest`} selected>Newest first</Option>
      <Option id={`${id}-oldest`} active>Oldest first</Option>
      <Option id={`${id}-popular`}>Most popular</Option>
      <Option id={`${id}-price`} disabled>Price, low to high</Option>
    </div>
  );
}
```
<!-- /example -->

### Edge: long labels in a narrow list

Rows have a fixed height, so long text has to be truncated inside the row. The full path stays available in `title`.

<!-- example: option/long-label.tsx -->
```tsx
import { Option } from '@vega-ui/react';

const folders = [
  'Inbox',
  'Projects / 2026 / Northwind logistics / Contracts and signed amendments',
  'Receipts',
  'Archive / Customer support / Escalations that were resolved after the SLA deadline',
];

export default function LongLabel() {
  return (
    <div role='listbox' aria-label='Move to folder' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      {folders.map((folder) => (
        <Option key={folder} title={folder} selected={folder === 'Receipts'}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{folder}</span>
        </Option>
      ))}
    </div>
  );
}
```
<!-- /example -->

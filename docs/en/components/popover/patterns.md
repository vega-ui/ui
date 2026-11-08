# Popover Patterns

## Quick Actions

When to use:

- Several small actions should stay attached to one trigger.

Composition notes:

- Keep the content compact.
- Prefer action lists or short grouped commands over paragraph-heavy content.
- Wrap each action in `PopoverClose` with `asChild` so it closes the popover when it runs; the popover does not close on its own.

Trade-offs:

- Fast contextual access.
- Easy to overload with too many actions.

<!-- example: popover/menu-closes-on-select.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const actions = ['Duplicate', 'Move to folder', 'Download as PDF', 'Archive'];

export default function MenuClosesOnSelect() {
  const [last, setLast] = useState('');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Popover placement='bottom-start'>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Brand guidelines.fig</Button>
        </PopoverTrigger>
        <PopoverContent style={{ padding: 'var(--spacing-2)' }}>
          <div role='group' aria-label='File actions' style={{ display: 'grid', minWidth: 200 }}>
            {actions.map((action) => (
              <PopoverClose key={action} asChild>
                <Button
                  variant='secondary'
                  appearance='transparent'
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setLast(action)}
                >
                  {action}
                </Button>
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Text size={2} style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{last ? `Last action: ${last}` : ''}</Text>
    </div>
  );
}
```
<!-- /example -->

## Inline Rename Flow

When to use:

- A tiny form should stay near its trigger.

Composition notes:

- Keep validation and submit behavior simple.

Trade-offs:

- Efficient for small edits.
- Too small for longer form flows.

<!-- example: popover/inline-rename-flow.tsx -->
```tsx
import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function InlineRenameFlow() {
  const titleId = useId();
  const fieldId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Q4 launch plan');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(String(new FormData(event.currentTarget).get('name')).trim());
    setOpen(false);
  };

  return (
    <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{name}</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <form onSubmit={onSubmit} style={{ display: 'grid', width: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>Rename document</Heading>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-6)' }}>
            <Label htmlFor={fieldId}>Name</Label>
            <TextField size='sm'>
              <TextFieldInput id={fieldId} name='name' defaultValue={name} required pattern='.*\S.*' maxLength={80} autoFocus />
            </TextField>
          </div>
          <Button type='submit' size='sm' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-8)' }}>Rename</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Anchored User Menu

When to use:

- Account or context actions should stay visibly attached to the trigger.

Composition notes:

- Keep the content narrow and scannable.
- Do not turn the menu into a full settings surface.

Trade-offs:

- Strong spatial relationship to the trigger.
- Weaker fit once the content becomes form-heavy or destructive.

<!-- example: popover/anchored-user-menu.tsx -->
```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

export default function AnchoredUserMenu() {
  return (
    <Popover role='dialog' placement='bottom-end'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Maria Chen</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Account' style={{ padding: 'var(--spacing-2)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 220 }}>
          <div style={{ display: 'grid', paddingInline: 'var(--spacing-6)', paddingBlock: 'var(--spacing-4)' }}>
            <Text size={3} fontWeight={600}>Maria Chen</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>maria@northwind.dev</Text>
          </div>
          <Separator />
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#profile'>Profile</a>
          </Button>
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#billing'>Billing</a>
          </Button>
          <Separator />
          <Button variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

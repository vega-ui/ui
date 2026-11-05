# IconButton Examples

## Basic

### Basic: header actions with explicit names

Every icon-only action needs its own `aria-label`: the component never adds one. Inside `IconButton` an `Icon` without `size` scales with the button through `--icon-size`.

<!-- example: icon-button/basic-usage.tsx -->
```tsx
import { Icon, IconButton, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </IconButton>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Basic: sizes

`size` sets the square side from `xs` to `xl`; the nested icon follows at one third of the button size.

<!-- example: icon-button/sizes.tsx -->
```tsx
import { Icon, IconButton, type IconButtonSize } from '@vega-ui/react';
import { SettingsIcon } from '@vega-ui/icons';

const sizes: IconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {sizes.map((size) => (
        <IconButton key={size} type='button' size={size} aria-label={`Settings, size ${size}`}>
          <Icon><SettingsIcon /></Icon>
        </IconButton>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: favorite toggle with aria-pressed

The label stays "Favorite" and the state lives in `aria-pressed`, so a screen reader announces "Favorite, toggle button, pressed". Changing the label on every click would hide the state instead.

<!-- example: icon-button/parent-owned-favorite-toggle.tsx -->
```tsx
import { Icon, IconButton } from '@vega-ui/react';
import { HeartIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function ParentOwnedFavoriteToggle() {
  const [favorite, setFavorite] = useState(false);
  const count = favorite ? 129 : 128;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <IconButton
        type='button'
        variant='secondary'
        appearance='ghost'
        aria-label='Favorite'
        aria-pressed={favorite}
        onClick={() => setFavorite(!favorite)}
      >
        <Icon><HeartIcon fill={favorite ? 'currentColor' : 'none'} /></Icon>
      </IconButton>
      <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{count} people saved this recipe</span>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: copy with temporary feedback

The icon swaps to a check for two seconds after copying, and a status region announces "Copied", because an icon change alone is silent for screen readers.

<!-- example: icon-button/copy-to-clipboard.tsx -->
```tsx
import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { CheckIcon, CopyIcon } from '@vega-ui/icons';
import { useEffect, useState } from 'react';

const inviteLink = 'https://app.example.com/invite/7Fq2-K9xD';

export default function CopyToClipboard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', width: '100%' }}>
      <code
        style={{
          flex: 1,
          minWidth: 0,
          alignSelf: 'center',
          padding: 'var(--spacing-4) var(--spacing-6)',
          borderRadius: 'var(--radius-3)',
          background: 'var(--fills-tertiary)',
          fontSize: 'var(--font-size-2)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {inviteLink}
      </code>
      <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Copy invite link' onClick={copy}>
        <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
      </IconButton>
      <VisuallyHidden asChild>
        <span role='status'>{copied ? 'Copied' : ''}</span>
      </VisuallyHidden>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: clear and submit actions next to an input

The clear button uses `type='button'` so it does not submit the form, and returns focus to the input. The search button is a real `type='submit'`; the query is read with `FormData`.

<!-- example: icon-button/inline-clear-action.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Icon, IconButton, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon, XIcon } from '@vega-ui/icons';
import { FormEvent, useRef, useState } from 'react';

export default function InlineClearAction() {
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('quarterly report');
  const [submitted, setSubmitted] = useState('');

  const clear = () => {
    setQuery('');
    input.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('q')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='file-search'>Search files</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <TextField style={{ flex: 1, minWidth: 0, paddingInlineEnd: 'var(--spacing-5)' }}>
          <TextFieldInput
            ref={input}
            id='file-search'
            name='q'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query !== '' && (
            <IconButton
              type='button'
              variant='secondary'
              appearance='ghost'
              aria-label='Clear search'
              onClick={clear}
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          )}
        </TextField>
        <IconButton type='submit' aria-label='Search'>
          <Icon><SearchIcon /></Icon>
        </IconButton>
      </div>
      <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {submitted === '' ? 'Press Enter or the search button' : `Searched for “${submitted}”`}
      </output>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: close button in a dialog

The standard overlay close: a 24×24 round ghost button inside `DialogClose asChild`, positioned with logical insets so it flips in right-to-left layouts.

<!-- example: icon-button/compact-close-action.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function CompactCloseAction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='whats-new-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='whats-new-title' as='h2' size={4} fontWeight={600}>What’s new in 2.4</Heading>
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
        <Text size={3}>
          Shared libraries, faster exports, and a new dark theme. Press Escape or the cross to return to your work.
        </Text>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Layout/Overlay: tooltip for sighted users

`aria-label` names the button for assistive technology; a `Tooltip` shows the same name and the shortcut to mouse and keyboard users. The tooltip is linked as a description, so keep extra details there.

<!-- example: icon-button/tooltip-label.tsx -->
```tsx
import { Icon, IconButton, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@vega-ui/icons';
import { type ReactNode, useState } from 'react';

const alignments: { value: string, label: string, shortcut: string, icon: ReactNode }[] = [
  { value: 'left', label: 'Align left', shortcut: 'Ctrl+Shift+L', icon: <AlignLeftIcon /> },
  { value: 'center', label: 'Align center', shortcut: 'Ctrl+Shift+E', icon: <AlignCenterIcon /> },
  { value: 'right', label: 'Align right', shortcut: 'Ctrl+Shift+R', icon: <AlignRightIcon /> },
];

export default function TooltipLabel() {
  const [alignment, setAlignment] = useState('left');

  return (
    <div
      role='toolbar'
      aria-label='Paragraph alignment'
      style={{
        display: 'flex',
        gap: 'var(--spacing-2)',
        padding: 'var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-4)',
        background: 'var(--surface-primary)',
      }}
    >
      {alignments.map((item) => (
        <Tooltip key={item.value}>
          <TooltipTrigger asChild>
            <IconButton
              type='button'
              size='sm'
              variant='secondary'
              appearance={alignment === item.value ? 'ghost' : 'transparent'}
              aria-label={item.label}
              aria-pressed={alignment === item.value}
              onClick={() => setAlignment(item.value)}
            >
              <Icon>{item.icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            {item.label} · {item.shortcut}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: remove action that fails

Removing a locked file fails: the error is rendered under the row and linked to its button with `aria-describedby`. The accessible name includes the file name, so ten identical trash icons are still distinguishable.

<!-- example: icon-button/failed-remove-action.tsx -->
```tsx
import { HelperText, Icon, IconButton } from '@vega-ui/react';
import { FileTextIcon, Trash2Icon } from '@vega-ui/icons';
import { useState } from 'react';

const initialFiles = [
  { name: 'contract-signed.pdf', locked: true },
  { name: 'brief-v3.docx', locked: false },
  { name: 'moodboard.png', locked: false },
];

export default function FailedRemoveAction() {
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState('');

  const remove = (name: string, locked: boolean) => {
    if (locked) {
      setError(name);
      return;
    }

    setError('');
    setFiles(files.filter((file) => file.name !== name));
  };

  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 0,
        padding: 'var(--spacing-2) var(--spacing-6)',
        listStyle: 'none',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      {files.map((file, index) => {
        const failed = error === file.name;
        const errorId = `remove-error-${file.name}`;

        return (
          <li
            key={file.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-1)',
              paddingBlock: 'var(--spacing-3)',
              borderBlockStart: index === 0 ? undefined : '1px solid var(--separator-opaque)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Icon size='sm' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><FileTextIcon /></Icon>
              <span style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}>{file.name}</span>
              <IconButton
                type='button'
                size='sm'
                variant='secondary'
                appearance='transparent'
                aria-label={`Remove ${file.name}`}
                aria-describedby={failed ? errorId : undefined}
                onClick={() => remove(file.name, file.locked)}
              >
                <Icon><Trash2Icon /></Icon>
              </IconButton>
            </div>
            {failed && (
              <HelperText id={errorId} error role='alert' style={{ paddingInlineStart: 'calc(var(--spacing-8) + var(--spacing-4))', paddingBlockEnd: 'var(--spacing-2)' }}>
                Signed contracts cannot be removed. Ask an admin to archive it instead.
              </HelperText>
            )}
          </li>
        );
      })}
    </ul>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: toolbar disabled by a fieldset

`<Fieldset disabled>` disables every `IconButton` inside it natively, which suits read-only documents where the whole toolbar is unavailable at once.

<!-- example: icon-button/blocked-icon-action.tsx -->
```tsx
import { Button, Fieldset, FieldsetLegend, Icon, IconButton } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BlockedIconAction() {
  const [locked, setLocked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <Fieldset disabled={locked} appearance='outlined' style={{ width: '100%', boxSizing: 'border-box' }}>
        <FieldsetLegend>{locked ? 'Formatting (read-only document)' : 'Formatting'}</FieldsetLegend>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Bold'>
            <Icon><BoldIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Italic'>
            <Icon><ItalicIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Insert link'>
            <Icon><LinkIcon /></Icon>
          </IconButton>
          <IconButton type='button' size='sm' variant='secondary' appearance='ghost' aria-label='Bulleted list'>
            <Icon><ListIcon /></Icon>
          </IconButton>
        </div>
      </Fieldset>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => setLocked(!locked)}>
        {locked ? 'Request edit access' : 'Switch to viewing'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: zoom controls at their limits

The buttons are disabled at the first and last zoom step, computed from the list of steps. When a button disables itself while focused, the browser drops focus, so place the value between the buttons where the user can still see it.

<!-- example: icon-button/zoom-controls.tsx -->
```tsx
import { Icon, IconButton } from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

const steps = [25, 50, 75, 100, 150, 200, 400];

export default function ZoomControls() {
  const [index, setIndex] = useState(3);
  const atMin = index === 0;
  const atMax = index === steps.length - 1;

  return (
    <div role='group' aria-label='Zoom' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <IconButton
        type='button'
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-label='Zoom out'
        disabled={atMin}
        onClick={() => setIndex(index - 1)}
      >
        <Icon><MinusIcon /></Icon>
      </IconButton>
      <output aria-live='polite' style={{ minWidth: '4ch', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
        {steps[index]}%
      </output>
      <IconButton
        type='button'
        size='sm'
        variant='secondary'
        appearance='ghost'
        aria-label='Zoom in'
        disabled={atMax}
        onClick={() => setIndex(index + 1)}
      >
        <Icon><PlusIcon /></Icon>
      </IconButton>
    </div>
  );
}
```
<!-- /example -->

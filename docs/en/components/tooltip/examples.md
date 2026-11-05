# Tooltip Examples

## Basic

### Basic: icon buttons with hints

Each icon button is named by its own `aria-label`; the tooltip only adds a hint and a keyboard shortcut and is linked to the button through `aria-describedby` while it is open. It shows on hover after `delayOpen` and at once on keyboard focus, never on a tap.

<!-- example: tooltip/icon-hint.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

const actions = [
  { label: 'Reply', hint: 'Reply to Maria Chen', icon: <ReplyIcon /> },
  { label: 'Archive', hint: 'Move to Archive · E', icon: <ArchiveIcon /> },
  { label: 'Delete', hint: 'Move to Trash · #', icon: <Trash2Icon /> },
];

export default function IconHint() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger asChild>
            <IconButton aria-label={action.label} variant='secondary' appearance='ghost'>
              <Icon>{action.icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{action.hint}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: copy feedback

The tooltip is controlled, so the click handler can open it right after copying and change its text to Copied. Closing it through `onChangeOpen` resets the text for the next hover.

<!-- example: tooltip/stateful-copy-feedback.tsx -->
```tsx
import { useState } from 'react';
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CheckIcon, CopyIcon } from '@vega-ui/icons';

const inviteLink = 'https://northwind.dev/join/7KQ2-M9XA';

export default function StatefulCopyFeedback() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setCopied(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        boxSizing: 'border-box',
        width: '100%',
        paddingBlock: 'var(--spacing-2)',
        paddingInlineStart: 'var(--spacing-8)',
        paddingInlineEnd: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <Text size={3} style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{inviteLink}</Text>
      <Tooltip delayOpen={0} open={open} onChangeOpen={changeOpen}>
        <TooltipTrigger asChild>
          <IconButton aria-label='Copy invite link' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }} onClick={copy}>
            <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
          </IconButton>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>{copied ? 'Copied' : 'Copy invite link'}</Text>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: open state in your state

`onChangeOpen` reports the hover and focus requests, and `open` decides what is shown: the checkbox pins the hint open whatever the pointer does. The line below shows both values.

<!-- example: tooltip/controlled-open-state.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function ControlledOpenState() {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={pinned} onChange={(event) => setPinned(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Keep the hint open
      </Checkbox>
      <Tooltip open={pinned || open} onChangeOpen={setOpen}>
        <TooltipTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Save draft</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipArrow />
          <Text size={2}>Drafts are saved automatically every minute</Text>
        </TooltipContent>
      </Tooltip>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Hover or focus requests: {open ? 'open' : 'closed'} · shown: {pinned || open ? 'yes' : 'no'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: optional field hint

The label stays visible and names the field; the info button next to it explains when the field is needed. A tooltip only suits optional context like this: required instructions and errors belong in visible text.

<!-- example: tooltip/field-helper.tsx -->
```tsx
import { useId, useState, type FormEvent } from 'react';
import {
  Button,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

export default function FieldHelper() {
  const fieldId = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(String(new FormData(event.currentTarget).get('vat')));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Label htmlFor={fieldId}>VAT number (optional)</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label='About the VAT number' size='xs' variant='secondary' appearance='ghost'>
              <Icon size='xs'><InfoIcon /></Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>Printed on invoices for EU business customers</Text>
          </TooltipContent>
        </Tooltip>
      </div>
      <TextField>
        <TextFieldInput id={fieldId} name='vat' placeholder='DE123456789' pattern='[A-Z]{2}[A-Z0-9]{8,12}' />
      </TextField>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='submit' style={{ flexShrink: 0 }}>Save billing details</Button>
        <Text size={2} role='status' style={{ minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved ? `Saved ${saved}` : ''}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: tooltip inside a dialog

The tooltip renders in the top layer after the dialog, so it shows above the modal and is not clipped by it. `delayOpen={0}` shows it at once, and the copy result changes its text.

<!-- example: tooltip/tooltip-inside-dialog.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
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
  Text,
  TextField,
  TextFieldInput,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CheckIcon, CopyIcon, XIcon } from '@vega-ui/icons';

const apiKey = 'sk_live_51Hx9QaLk2mZ8vR4';

export default function TooltipInsideDialog() {
  const titleId = useId();
  const fieldId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
  };

  return (
    <Dialog onChangeOpen={() => setCopied(false)}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Show API key</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Production API key</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
          <Label htmlFor={fieldId}>Key</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <TextField style={{ flex: 1 }}>
              <TextFieldInput id={fieldId} value={apiKey} readOnly />
            </TextField>
            <Tooltip delayOpen={0}>
              <TooltipTrigger asChild>
                <IconButton aria-label='Copy key' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }} onClick={copy}>
                  <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2}>{copied ? 'Copied to clipboard' : 'Copy to clipboard'}</Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Keep this key secret. Anyone with it can charge your account.</Text>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Layout/Overlay: toolbar with a shared delay

Once one tooltip has shown, moving to a neighbour shows its tooltip at once, without waiting for `delayOpen` again.

<!-- example: tooltip/toolbar-shared-delay.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@vega-ui/icons';

const tools = [
  { label: 'Bold', shortcut: '⌘B', icon: <BoldIcon /> },
  { label: 'Italic', shortcut: '⌘I', icon: <ItalicIcon /> },
  { label: 'Underline', shortcut: '⌘U', icon: <UnderlineIcon /> },
];

export default function ToolbarSharedDelay() {
  return (
    <div
      role='toolbar'
      aria-label='Formatting'
      style={{
        display: 'flex',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-2)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {tools.map(({ label, shortcut, icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <IconButton aria-label={label} appearance='transparent' variant='secondary'>
              <Icon>{icon}</Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{`${label} ${shortcut}`}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: reason for a failed sync

The error state itself is visible as a badge, and the warning button's `aria-label` says what it is about; the tooltip adds the reason. Reconnect fixes the row, and the hint disappears with the error.

<!-- example: tooltip/sync-error-hint.tsx -->
```tsx
import { useState } from 'react';
import {
  Badge,
  Button,
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';

const integrations = [
  { name: 'Slack', error: '' },
  { name: 'Google Drive', error: 'Access expired on Nov 1. Reconnect to resume syncing.' },
  { name: 'Jira', error: '' },
];

export default function SyncErrorHint() {
  const [fixed, setFixed] = useState<string[]>([]);

  return (
    <ul
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {integrations.map((integration, index) => {
        const failing = integration.error !== '' && !fixed.includes(integration.name);

        return (
          <li
            key={integration.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              minWidth: 0,
              paddingBlock: 'var(--spacing-5)',
              borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
            }}
          >
            <Text size={3} style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{integration.name}</Text>
            {!failing && <Badge variant='success' size='xs'>Synced</Badge>}
            {failing && (
              <>
                <Badge variant='error' size='xs'>Sync failed</Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconButton aria-label={`Why ${integration.name} sync failed`} size='xs' variant='secondary' appearance='ghost'>
                      <Icon size='xs'><CircleAlertIcon /></Icon>
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />
                    <Text size={2}>{integration.error}</Text>
                  </TooltipContent>
                </Tooltip>
                <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setFixed([...fixed, integration.name])}>Reconnect</Button>
              </>
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

### Disabled: reason for an unavailable action

A `disabled` button gets no hover or focus, so its tooltip never shows. `aria-disabled` keeps the button focusable and styled as disabled, the tooltip explains why, and the click handler returns early while it is unavailable. Check Billing verified to enable it.

<!-- example: tooltip/disabled-action-reason.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function DisabledActionReason() {
  const [verified, setVerified] = useState(false);
  const [invited, setInvited] = useState(0);

  const invite = () => {
    if (!verified) return;
    setInvited(invited + 1);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={verified} onChange={(event) => setVerified(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Billing verified
      </Checkbox>
      <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-disabled={!verified} onClick={invite}>Invite members</Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>{verified ? 'Send invites to your team' : 'Verify billing to invite more than 5 members'}</Text>
          </TooltipContent>
        </Tooltip>
      <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {invited > 0 ? `Invites sent: ${invited}` : ''}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: full text of a truncated name

Long file names are cut with an ellipsis, and the tooltip shows the full name on hover or keyboard focus of the link. The content gets a `max-width` and `overflow-wrap: anywhere`, so the long name wraps instead of running off the screen.

<!-- example: tooltip/truncated-text.tsx -->
```tsx
import {
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

const files = [
  'Kestrel Robotics – Master services agreement – signed – final v7 (2).pdf',
  'Q3 board deck.pdf',
  'Brand guidelines 2026 – typography, colour, photography and tone of voice.fig',
];

export default function TruncatedText() {
  return (
    <ul
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {files.map((file, index) => (
        <li key={file} style={{ minWidth: 0, paddingBlock: 'var(--spacing-5)', borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined }}>
          <Tooltip delayOpen={300}>
            <TooltipTrigger asChild>
              <a
                href={`#${encodeURIComponent(file)}`}
                style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'inherit' }}
              >
                {file}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              <Text size={2} style={{ display: 'block', maxWidth: 280, overflowWrap: 'anywhere' }}>{file}</Text>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

### Edge: metric definitions in a dense row

Small info buttons next to each metric keep the row compact while the definitions stay one hover or `Tab` away. Each button is named after its metric, so the buttons are distinguishable for screen readers.

<!-- example: tooltip/dense-data-hint.tsx -->
```tsx
import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

const metrics = [
  { label: 'MRR', value: '$48,210', hint: 'Monthly recurring revenue from active subscriptions, excluding one-off charges' },
  { label: 'Churn', value: '2.4%', hint: 'Share of customers who cancelled in the last 30 days' },
  { label: 'Conversion', value: '6.8%', hint: 'Trials that became paid plans. Updated every 15 minutes' },
];

export default function DenseDataHint() {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 'var(--spacing-8)',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
          <dt style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label={`About ${metric.label}`} size='xs' variant='secondary' appearance='ghost'>
                  <Icon size='xs'><InfoIcon /></Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2} style={{ display: 'block', maxWidth: 240 }}>{metric.hint}</Text>
              </TooltipContent>
            </Tooltip>
          </dt>
          <dd style={{ margin: 0 }}><Text size={6} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{metric.value}</Text></dd>
        </div>
      ))}
    </dl>
  );
}
```
<!-- /example -->

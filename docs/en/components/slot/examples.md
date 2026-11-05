# Slot Examples

## Basic

### Basic: authoring an asChild component

The standard pattern: render your own element by default and `Slot` when `asChild` is set. The same `Tag` styling lands on a `<span>`, an `<a>`, or a `<button>`, and each keeps its own semantics.

<!-- example: slot/basic-usage.tsx -->
```tsx
import type { HTMLAttributes } from 'react';
import { Slot } from '@vega-ui/react';

interface TagProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const tagStyle = {
  display: 'inline-flex',
  padding: 'var(--spacing-1) var(--spacing-5)',
  border: 'none',
  borderRadius: 999,
  background: 'var(--fills-secondary)',
  color: 'var(--label-primary)',
  font: 'inherit',
  fontSize: 'var(--font-size-2)',
  textDecoration: 'none',
  cursor: 'pointer',
};

function Tag({ asChild, children, ...props }: TagProps) {
  if (asChild) {
    return <Slot style={tagStyle} {...props}>{children}</Slot>;
  }

  return <span style={tagStyle} {...props}>{children}</span>;
}

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <Tag>Design</Tag>
      <Tag asChild>
        <a href='/tags/accessibility'>Accessibility</a>
      </Tag>
      <Tag asChild>
        <button type='button' onClick={() => alert('Filtering by React')}>React</button>
      </Tag>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: chained click handlers

`Slot` does not replace the child's handlers: both run, the slot's first and the child's second. The log shows the order, which matters when a wrapper adds analytics or guards around an existing action.

<!-- example: slot/low-level-wrapper-authoring.tsx -->
```tsx
import { type ReactNode, useState } from 'react';
import { Button, Slot } from '@vega-ui/react';

interface TrackClickProps {
  event: string
  onTrack(event: string): void
  children: ReactNode
}

function TrackClick({ event, onTrack, children }: TrackClickProps) {
  return <Slot onClick={() => onTrack(`analytics: ${event}`)}>{children}</Slot>;
}

export default function LowLevelWrapperAuthoring() {
  const [log, setLog] = useState<string[]>([]);

  const append = (entry: string) => {
    setLog((current) => [...current, entry]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <TrackClick event='upgrade_clicked' onTrack={append}>
          <Button type='button' onClick={() => append('button: open checkout')}>Upgrade plan</Button>
        </TrackClick>
        <Button type='button' variant='secondary' appearance='ghost' onClick={() => setLog([])}>Clear log</Button>
      </div>
      <ol aria-label='Click handlers in call order' style={{ margin: 0, paddingInlineStart: 'var(--spacing-12)', color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', fontFamily: 'var(--code-font-family)' }}>
        {log.map((entry, index) => <li key={index}>{entry}</li>)}
      </ol>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: field wrapper that wires any control

A `Field` wrapper passes `id`, `name`, and `aria-describedby` through `Slot` to whatever control it wraps, so a `TextArea` and a native `<select>` get the same label and hint wiring. `Slot` only reaches its direct child, so wrap the control itself, not a container around it.

<!-- example: slot/form-control-slot.tsx -->
```tsx
import { type FormEvent, type ReactNode, useState } from 'react';
import { Button, HelperText, Label, Slot, TextArea } from '@vega-ui/react';

interface FieldProps {
  id: string
  label: string
  hint: string
  children: ReactNode
}

function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      <Label htmlFor={id}>{label}</Label>
      <Slot id={id} name={id} aria-describedby={`${id}-hint`}>{children}</Slot>
      <HelperText id={`${id}-hint`}>{hint}</HelperText>
    </div>
  );
}

export default function FormControlSlot() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`${data.get('address')} · ${data.get('team-size')} people`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <Field id='address' label='Billing address' hint='Printed on every invoice'>
        <TextArea rows={3} required defaultValue='Acme Inc., 21 Harbour Street, Dublin' />
      </Field>
      <Field id='team-size' label='Team size' hint='Used to suggest a plan'>
        <select
          defaultValue='6–20'
          style={{
            height: 'var(--spacing-21)',
            paddingInline: 'var(--spacing-10)',
            border: 'none',
            borderRadius: 'var(--radius-4)',
            background: 'var(--fills-tertiary)',
            color: 'inherit',
            font: 'inherit',
          }}
        >
          <option>1–5</option>
          <option>6–20</option>
          <option>21–100</option>
        </select>
      </Field>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit'>Continue</Button>
        <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{result}</output>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: custom component as a popover trigger

`PopoverTrigger asChild` passes `popoverTarget`, ARIA attributes, and a ref to the child. A custom component works only if it spreads those props and the ref onto a native `<button>`, as `AccountChip` does.

<!-- example: slot/custom-overlay-trigger.tsx -->
```tsx
import type { ButtonHTMLAttributes, Ref } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@vega-ui/react';

interface AccountChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  ref?: Ref<HTMLButtonElement>
}

function AccountChip({ name, ref, style, ...props }: AccountChipProps) {
  return (
    <button
      ref={ref}
      type='button'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-2) var(--spacing-6) var(--spacing-2) var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 999,
        background: 'transparent',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden='true'
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--fills-primary)',
          fontSize: 'var(--font-size-1)',
        }}
      >
        {name.charAt(0)}
      </span>
      {name}
    </button>
  );
}

export default function CustomOverlayTrigger() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <AccountChip name='Jane Cooper' />
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <Text size={2}>Signed in as jane@acme.com</Text>
          <Button size='sm' variant='secondary' appearance='ghost'>Account settings</Button>
          <Button size='sm' variant='secondary' appearance='ghost'>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Error

### Error: plain text instead of an element

`Slot` needs exactly one React element to clone. Plain text throws during render; the error boundary here catches it and shows the message, and the toggle switches back to a valid `<a>` child.

<!-- example: slot/text-child-error.tsx -->
```tsx
import { Component, type ReactNode, useState } from 'react';
import { Button, ButtonBase, HelperText } from '@vega-ui/react';

interface BoundaryProps {
  children: ReactNode
}

interface BoundaryState {
  message: string
}

class SlotErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { message: '' };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { message: error.message };
  }

  render() {
    if (this.state.message !== '') {
      return <HelperText error role='alert'>{this.state.message}</HelperText>;
    }

    return this.props.children;
  }
}

export default function TextChildError() {
  const [broken, setBroken] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const toggle = () => {
    setBroken(!broken);
    setAttempt(attempt + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <SlotErrorBoundary key={attempt}>
        {broken && <ButtonBase asChild>Open billing</ButtonBase>}
        {!broken && (
          <ButtonBase asChild variant='secondary' appearance='ghost'>
            <a href='/billing' style={{ padding: 'var(--spacing-3) var(--spacing-8)', borderRadius: 'var(--radius-3)', fontSize: 'var(--font-size-2)' }}>
              Open billing
            </a>
          </ButtonBase>
        )}
      </SlotErrorBoundary>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={toggle}>
        {broken ? 'Pass an element child' : 'Pass plain text instead'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: blocked trigger that still explains itself

A natively disabled button gets no pointer or focus events, so a tooltip around it never opens. Through `TooltipTrigger asChild` the button uses `aria-disabled` instead, stays focusable, and the click handler checks the limit itself.

<!-- example: slot/slotted-disabled-button.tsx -->
```tsx
import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { useState } from 'react';

const limit = 3;

export default function SlottedDisabledButton() {
  const [used, setUsed] = useState(3);
  const blocked = used >= limit;

  const createProject = () => {
    if (blocked) return;
    setUsed(used + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type='button' aria-disabled={blocked} onClick={createProject}>
              New project
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            {blocked ? `Your plan includes ${limit} projects` : 'Create an empty project'}
          </TooltipContent>
        </Tooltip>
        <Button type='button' variant='secondary' appearance='ghost' disabled={used === 0} onClick={() => setUsed(used - 1)}>
          Archive a project
        </Button>
      </div>
      <p role='status' style={{ margin: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {used} of {limit} projects used
      </p>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: how props are merged

On a conflict the child wins for ordinary props such as `title` and for each `style` key. `className` is concatenated, `id` keeps the first defined value (the slot's), and both refs receive the node. The list is read from the rendered DOM.

<!-- example: slot/merge-rules.tsx -->
```tsx
import { useEffect, useRef, useState } from 'react';
import { Slot } from '@vega-ui/react';

export default function MergeRules() {
  const slotRef = useRef<HTMLElement>(null);
  const childRef = useRef<HTMLAnchorElement>(null);
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    const node = childRef.current;
    if (node === null) return;

    setResult([
      `id: ${node.id}`,
      `class: ${node.className}`,
      `title: ${node.title}`,
      `style: ${node.getAttribute('style')}`,
      `both refs point to the same node: ${slotRef.current === node}`,
    ]);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <Slot
        ref={slotRef}
        id='from-slot'
        className='from-slot'
        title='from slot'
        style={{ color: 'var(--color-primary-500)', fontWeight: 600 }}
      >
        <a
          ref={childRef}
          href='/changelog'
          id='from-child'
          className='from-child'
          title='from child'
          style={{ fontWeight: 400 }}
        >
          Changelog
        </a>
      </Slot>
      <ul aria-label='Rendered attributes' style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)', color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', fontFamily: 'var(--code-font-family)', overflowWrap: 'anywhere' }}>
        {result.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </div>
  );
}
```
<!-- /example -->

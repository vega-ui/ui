# Slot Patterns

## Polymorphic Trigger

When to use:

- a low-level trigger primitive should render as a consumer-chosen element

Composition notes:

- guarantee exactly one child
- preserve the correct semantic element for the task

Trade-offs:

- flexible
- easier to misuse than fixed rendering

<!-- example: slot/polymorphic-trigger.tsx -->
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
import { KeyboardIcon, XIcon } from '@vega-ui/icons';

export default function PolymorphicTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton variant='secondary' appearance='ghost' aria-label='Keyboard shortcuts'>
          <Icon><KeyboardIcon /></Icon>
        </IconButton>
      </DialogTrigger>
      <DialogContent aria-labelledby='shortcuts-title'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='shortcuts-title' as='h2' size={4} fontWeight={600}>Keyboard shortcuts</Heading>
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
        <Text size={3}>Ctrl+K opens search, Ctrl+/ toggles the sidebar.</Text>
        <DialogClose asChild>
          <Button style={{ marginBlockStart: 'var(--spacing-12)' }}>Got it</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Styled Link Action

When to use:

- navigation should keep link semantics but borrow button styling

Composition notes:

- choose an `<a>` element intentionally
- keep navigation semantics explicit

Trade-offs:

- preserves link behavior
- easy to overuse when a plain link would be clearer

<!-- example: slot/styled-link-action.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { BookOpenIcon } from '@vega-ui/icons';

export default function StyledLinkAction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>Create API key</Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='/docs/api/authentication'>
          <Icon size='sm'><BookOpenIcon /></Icon>
          Read the API guide
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Low-Level Wrapper Authoring

When to use:

- design-system internals need to merge behavior into one child

Composition notes:

- test event-handler merging carefully
- keep semantics explicit in the chosen child

Trade-offs:

- foundational for polymorphism
- easy to create subtle semantic regressions

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

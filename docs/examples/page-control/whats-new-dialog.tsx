import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  PageControl,
  PageControlItem,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useId, useState } from 'react';

const updates = [
  { title: 'Dark mode everywhere', text: 'Every screen now follows your system theme, including exported PDFs.' },
  { title: 'Faster search', text: 'Results appear as you type and include archived projects.' },
  { title: 'Keyboard shortcuts', text: 'Press ? anywhere to see the full list of shortcuts.' },
];

export default function WhatsNewDialog() {
  const prefix = useId();
  const [active, setActive] = useState(0);
  const isLast = active === updates.length - 1;

  return (
    <Dialog onChangeOpen={(open) => open && setActive(0)}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={`${prefix}-title`} style={{ display: 'grid', gap: 'var(--spacing-10)' }}>
        <div
          role='tabpanel'
          id={`${prefix}-panel`}
          aria-labelledby={`${prefix}-tab-${active}`}
          style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-3)', minHeight: 88 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${prefix}-title`} as='h2' size={4} fontWeight={600}>{updates[active].title}</Heading>
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
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>{updates[active].text}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <PageControl active={active} onChangeActive={setActive} aria-label='Updates'>
            {updates.map((update, index) => (
              <PageControlItem
                key={update.title}
                index={index}
                id={`${prefix}-tab-${index}`}
                aria-controls={`${prefix}-panel`}
                aria-label={update.title}
              />
            ))}
          </PageControl>
          {isLast ? (
            <DialogClose asChild>
              <Button size='sm'>Got it</Button>
            </DialogClose>
          ) : (
            <Button size='sm' onClick={() => setActive(active + 1)}>Next</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

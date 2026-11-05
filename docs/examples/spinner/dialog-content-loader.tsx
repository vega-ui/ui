import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useEffect, useId, useState } from 'react';

export default function DialogContentLoader() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;

    const timer = setTimeout(() => setLoaded(true), 1200);

    return () => clearTimeout(timer);
  }, [open, loaded]);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setLoaded(false);
  };

  return (
    <Dialog open={open} onChangeOpen={changeOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
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
        <div aria-busy={!loaded} style={{ display: 'grid', minHeight: 120, marginBlockStart: 'var(--spacing-8)' }}>
          {!loaded && (
            <Spinner size={6} aria-label='Loading order details' style={{ placeSelf: 'center' }} />
          )}
          {loaded && (
            <div style={{ display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' }}>
              <Text size={3}>2 × Linen shirt, 1 × Canvas tote</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shipped on 28 October via DHL Express</Text>
              <Text size={3} fontWeight={600}>Total $148.00</Text>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

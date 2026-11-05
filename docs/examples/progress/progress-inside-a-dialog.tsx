import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Progress,
  ProgressTrack,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useEffect, useId, useState } from 'react';

const total = 1240;

export default function ProgressInsideADialog() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState(0);

  const running = open && exported < total;

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setExported((current) => Math.min(current + 62, total));
    }, 150);

    return () => clearInterval(timer);
  }, [running]);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) setExported(0);
  };

  return (
    <Dialog open={open} onChangeOpen={changeOpen}>
      <DialogTrigger asChild>
        <Button>Export invoices</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Exporting invoices</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Progress
            value={exported}
            max={total}
            valueText={`${exported} of ${total} invoices`}
            aria-labelledby={titleId}
            fullWidth
          >
            <ProgressTrack />
          </Progress>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
            {running ? `${exported} of ${total} invoices exported` : 'invoices-2026-q3.csv is ready'}
          </Text>
        </div>
        <DialogClose asChild>
          <Button variant='secondary' appearance='ghost' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>
            {running ? 'Cancel export' : 'Done'}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

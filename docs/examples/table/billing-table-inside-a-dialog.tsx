import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useId } from 'react';

const charges = Array.from({ length: 18 }, (_, index) => ({
  date: `Oct ${index + 1}`,
  description: index % 3 === 0 ? 'Build minutes overage' : 'API requests',
  amount: 4 + ((index * 7) % 23),
}));

export default function BillingTableInsideADialog() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>View October charges</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>October usage charges</Heading>
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
        <div role='region' aria-labelledby={titleId} tabIndex={0} style={{ maxHeight: 280, overflowY: 'auto' }}>
          <Table fullWidth>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Date</TableHeading>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Description</TableHeading>
                <TableHeading scope='col' style={{ position: 'sticky', insetBlockStart: 0, background: 'var(--surface-primary)' }}>Amount</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {charges.map((charge) => (
                <TableRow key={charge.date}>
                  <TableData>{charge.date}</TableData>
                  <TableData>{charge.description}</TableData>
                  <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>${charge.amount}.00</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

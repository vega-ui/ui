# Collapsible Patterns

## Advanced Filters Block

When to use:

- One secondary form block should stay hidden until needed.

Composition notes:

- Keep the trigger explicit about what becomes available after expansion.
- Treat hidden form errors carefully if the section can be collapsed.

Trade-offs:

- Keeps the main form compact.
- Can hide complexity or validation too effectively if labels are weak.

<!-- example: collapsible/advanced-filters.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';

export default function AdvancedFilters() {
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState('');
  const [tag, setTag] = useState('');

  const activeCount = [owner, tag].filter((value) => value.trim() !== '').length;

  let summary = 'No advanced filters applied';
  if (activeCount === 1) summary = '1 advanced filter applied';
  if (activeCount > 1) summary = `${activeCount} advanced filters applied`;

  const clear = () => {
    setOwner('');
    setTag('');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 420 }}>
      <Collapsible open={open} onChangeOpen={setOpen}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>
              {open ? 'Hide advanced filters' : 'Show advanced filters'}
            </Button>
          </CollapsibleTrigger>
          {activeCount > 0 && (
            <Button size='sm' variant='secondary' appearance='ghost' onClick={clear}>Clear</Button>
          )}
        </div>
        <CollapsibleContent>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-owner'>Owner</Label>
              <TextField>
                <TextFieldInput id='filter-owner' value={owner} onChange={(event) => setOwner(event.target.value)} />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='filter-tag'>Tag</Label>
              <TextField>
                <TextFieldInput id='filter-tag' value={tag} onChange={(event) => setTag(event.target.value)} />
              </TextField>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {summary}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Inline Help Details

When to use:

- One secondary explanation block should stay close to the current content.

Composition notes:

- Keep the hidden content short enough that the trigger still feels like an inline disclosure.
- Prefer `Collapsible` over `Popover` when the explanation should stay in document flow.

Trade-offs:

- Preserves reading flow and layout continuity.
- Weaker fit for richly interactive or task-heavy content.

<!-- example: collapsible/price-breakdown.tsx -->
```tsx
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function PriceBreakdown() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Price breakdown</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            {lines.map((line) => (
              <div key={line.label} style={{ display: 'contents' }}>
                <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
                <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Secondary Details In Overlays

When to use:

- A drawer or dialog contains one optional detail block that should stay hidden by default.

Composition notes:

- Keep the collapsible content clearly secondary to the main task.
- Test dynamic height with realistic overlay content.

Trade-offs:

- Adds progressive disclosure without introducing another overlay.
- Can make dense panels harder to scan if overused.

<!-- example: collapsible/error-details-dialog.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
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

const stackTrace = `ExportError: Request timed out after 30000 ms
    at fetchRows (exports/worker.ts:118:11)
    at async buildCsv (exports/csv.ts:42:20)
    at async runExport (exports/run.ts:77:5)
    at async Queue.process (queue/index.ts:203:9)
Request ID: 7f3c9a1e-52b4-4f0e-9d8a-0c61b2e4a913`;

export default function ErrorDetailsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Show failed export</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='export-error-title' aria-describedby='export-error-description' style={{ maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='export-error-title' as='h2' size={4} fontWeight={600}>Export failed</Heading>
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
        <Text id='export-error-description' size={3} asChild>
          <p style={{ marginBlock: 'var(--spacing-4) var(--spacing-6)', color: 'var(--label-secondary)' }}>The CSV export of 48 210 rows did not finish. Try again with a shorter date range.</p>
        </Text>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Technical details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre style={{ margin: 0, marginBlockStart: 'var(--spacing-4)', maxHeight: 160, overflow: 'auto', fontSize: 'var(--font-size-1)', lineHeight: 1.6, padding: 'var(--spacing-6)', borderRadius: 'var(--radius-3)', background: 'var(--fills-tertiary)', color: 'var(--label-secondary)' }}>
              {stackTrace}
            </pre>
          </CollapsibleContent>
        </Collapsible>
        <form method='dialog' style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' variant='secondary' appearance='ghost'>Close</Button>
          <Button type='submit'>Try again</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

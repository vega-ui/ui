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

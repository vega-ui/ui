import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const webhook = 'https://hooks.northwind.dev/integrations/v2/workspaces/8f3a9c1e-42b7-4d0a-9e61-b5c7d2f40a18/events?signature=sha256';

export default function LongContent() {
  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Webhook URL</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Webhook URL'>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 'min(320px, calc(100vw - 48px))' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Events are sent to</Text>
          <Text size={3} style={{ overflowWrap: 'anywhere', fontFamily: 'monospace' }}>{webhook}</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}

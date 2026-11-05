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

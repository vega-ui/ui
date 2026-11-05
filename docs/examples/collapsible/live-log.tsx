import { useEffect, useState } from 'react';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const routes = ['GET /api/health', 'POST /api/orders', 'GET /api/orders/10482', 'PATCH /api/users/42'];

export default function LiveLog() {
  const [hidden, setHidden] = useState(true);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (hidden) return;
    const timer = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      setLines((current) => {
        const route = routes[current.length % routes.length];
        return [...current.slice(-19), `${time}  ${route}  200`];
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [hidden]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 480 }}>
      <Collapsible onChangeHidden={setHidden}>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center' }}>
          <CollapsibleTrigger asChild>
            <Button size='sm' variant='secondary' appearance='ghost'>Request log</Button>
          </CollapsibleTrigger>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
            {hidden ? `Paused · ${lines.length} lines` : `Streaming · ${lines.length} lines`}
          </Text>
        </div>
        <CollapsibleContent>
          <pre aria-label='Request log' tabIndex={0} style={{ margin: 0, height: 160, overflow: 'auto', fontSize: 'var(--font-size-1)', lineHeight: 1.6, fontVariantNumeric: 'tabular-nums', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-3)', background: 'var(--fills-tertiary)', color: 'var(--label-secondary)' }}>
            {lines.join('\n')}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

import { useState } from 'react';
import { Button, Card, Heading, Text } from '@vega-ui/react';

const allKeys = Array.from({ length: 240 }, (_, index) => `sk_live_${String(index + 1).padStart(4, '0')}`);

export default function EmptyAndMany() {
  const [keys, setKeys] = useState<string[]>([]);

  const toggle = () => {
    if (keys.length === 0) {
      setKeys(allKeys);
      return;
    }
    setKeys([]);
  };

  return (
    <Card aria-labelledby='api-keys-title' style={{ width: '100%', maxWidth: 360, gap: 'var(--spacing-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', alignSelf: 'stretch' }}>
        <Heading id='api-keys-title' as='h3' size={3} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>API keys ({keys.length})</Heading>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={toggle}>
          {keys.length === 0 ? 'Load 240 keys' : 'Clear'}
        </Button>
      </div>
      {keys.length === 0 && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>No API keys yet. Create one to call the API from your servers.</Text>
      )}
      {keys.length > 0 && (
        <ul
          tabIndex={0}
          aria-label='API keys'
          style={{ margin: 0, padding: 0, listStyle: 'none', maxHeight: 200, overflowY: 'auto', alignSelf: 'stretch' }}
        >
          {keys.map((key) => (
            <li key={key} style={{ paddingBlock: 'var(--spacing-2)' }}>
              <Text size={2} style={{ fontFamily: 'var(--code-font-family)' }}>{key}</Text>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

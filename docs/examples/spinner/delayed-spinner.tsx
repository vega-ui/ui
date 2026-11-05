import { Button, Spinner, Text } from '@vega-ui/react';
import { useEffect, useState } from 'react';

export default function DelayedSpinner() {
  const [pending, setPending] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!pending) return;

    const timer = setTimeout(() => setShowSpinner(true), 400);

    return () => clearTimeout(timer);
  }, [pending]);

  const search = (latency: number) => {
    setPending(true);
    setShowSpinner(false);
    setResult('');
    setTimeout(() => {
      setPending(false);
      setShowSpinner(false);
      setResult(`Found 24 results in ${latency} ms`);
    }, latency);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => search(150)} disabled={pending}>
          Fast search (150 ms)
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => search(2000)} disabled={pending}>
          Slow search (2 s)
        </Button>
      </div>
      <div aria-live='polite' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 'var(--spacing-12)' }}>
        {showSpinner && <Spinner size={3} aria-label='Searching' />}
        {showSpinner && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Searching…</Text>}
        {result && <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{result}</Text>}
      </div>
    </div>
  );
}

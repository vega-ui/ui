import { useState } from 'react';
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle, Button, Text } from '@vega-ui/react';

const record = 'vega-site-verification=8c1f0b6e2d9a4f7b93e5c2a1d0f4e6b8a7c3d9e1f2b4a6c8d0e2f4a6b8c0d2e4';

export default function DomainVerification() {
  const [message, setMessage] = useState('');

  const copy = async () => {
    await navigator.clipboard.writeText(record);
    setMessage('Copied to clipboard.');
  };

  const check = () => {
    setMessage('Checking DNS…');
    setTimeout(() => setMessage('Record not found yet. Try again in a few minutes.'), 1000);
  };

  return (
    <Alert variant='warning' style={{ width: '100%', maxWidth: 560 }}>
      <AlertIcon />
      <AlertMain style={{ minWidth: 0, gap: 'var(--spacing-4)' }}>
        <AlertTitle style={{ overflowWrap: 'anywhere' }}>Verify northwind-logistics-international.example.com</AlertTitle>
        <AlertContent>Add this TXT record at your DNS provider. Changes can take up to 48 hours to apply.</AlertContent>
        <Text size={1} asChild>
          <code style={{ display: 'block', fontFamily: 'var(--code-font-family)', wordBreak: 'break-all', padding: 'var(--spacing-4) var(--spacing-6)', borderRadius: 'var(--radius-2)', background: 'var(--fills-tertiary)', color: 'var(--label-primary)' }}>{record}</code>
        </Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', alignItems: 'center', marginBlockStart: 'var(--spacing-2)' }}>
          <Button size='sm' onClick={copy}>Copy record</Button>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={check}>Check again</Button>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{message}</Text>
        </div>
      </AlertMain>
    </Alert>
  );
}

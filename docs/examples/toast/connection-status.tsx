import { useEffect, useId, useState, type CSSProperties } from 'react';
import { Button, Text, Toast, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

interface ConnectionNotice {
  title: string
  description: string
}

const connectionToasts = createToastQueue<ConnectionNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };

const announceOnline = () => connectionToasts.add({ title: 'Back online', description: 'Your changes are synced.' }, { timeout: 3000 });

function ConnectionToast() {
  const { content } = useToastContext<ConnectionNotice>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'grid', paddingBlock: 'var(--spacing-6)', paddingInlineEnd: 'var(--spacing-8)' }}>
      <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
      <Text size={2} style={muted}>{content.description}</Text>
    </Toast>
  );
}

export default function ConnectionStatus() {
  const [online, setOnline] = useState(true);

  const disconnect = () => setOnline(false);

  const reconnect = () => {
    setOnline(true);
    announceOnline();
  };

  useEffect(() => {
    if (online) return;

    const offline = connectionToasts.add({ title: 'You are offline', description: 'Changes are kept on this device until the connection is back.' });
    return () => connectionToasts.close(offline);
  }, [online]);

  useEffect(() => {
    const goOffline = () => setOnline(false);
    const goOnline = () => {
      setOnline(true);
      announceOnline();
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
      for (const toast of connectionToasts.toasts) connectionToasts.close(toast.key);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 400,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
        <Text size={2} fontWeight={500}>Launch plan</Text>
        <Text size={2} style={muted}>{online ? 'Saved to the cloud' : 'Saved on this device'}</Text>
      </div>
      {online ? (
        <Button size='xs' variant='secondary' appearance='ghost' onClick={disconnect}>Go offline</Button>
      ) : (
        <Button size='xs' variant='primary' appearance='ghost' onClick={reconnect}>Go online</Button>
      )}
      <ToastRegion queue={connectionToasts} aria-label='Connection'>
        <ConnectionToast />
      </ToastRegion>
    </div>
  );
}

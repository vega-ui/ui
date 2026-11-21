import { useEffect, type CSSProperties } from 'react';
import { Button, Text, Toast, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

const copyToasts = createToastQueue<string>();

const link = 'https://vega.example/s/launch-plan';
const embed = `<iframe src="${link}/embed" width="640" height="360"></iframe>`;

const field: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: 'var(--spacing-3) var(--spacing-6)',
  background: 'var(--fills-tertiary)',
  borderRadius: 'var(--radius-3)',
  fontFamily: 'var(--code-font-family)',
};

function CopiedToast() {
  const { content } = useToastContext<string>();

  return (
    <Toast style={{ paddingBlock: 'var(--spacing-5)', paddingInlineEnd: 'var(--spacing-8)' }}>
      <Text size={2} fontWeight={500}>{content}</Text>
    </Toast>
  );
}

const copy = (text: string, copied: string) => {
  navigator.clipboard.writeText(text).then(
    () => copyToasts.add(copied, { timeout: 2000 }),
    () => copyToasts.add('Could not copy. Select the text and copy it', { timeout: 4000 }),
  );
};

export default function CopiedAtBottom() {
  useEffect(() => () => {
    for (const toast of copyToasts.toasts) copyToasts.close(toast.key);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-2)' }}>
        <Text size={2} fontWeight={500}>Link</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={2} style={{ ...field, flex: 1, minWidth: 0 }}>{link}</Text>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => copy(link, 'Link copied')}>Copy</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-2)' }}>
        <Text size={2} fontWeight={500}>Embed code</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <Text size={2} style={{ ...field, flex: 1, minWidth: 0 }}>{embed}</Text>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => copy(embed, 'Embed code copied')}>Copy</Button>
        </div>
      </div>
      <ToastRegion queue={copyToasts} aria-label='Notifications' placement='bottom' limit={1}>
        <CopiedToast />
      </ToastRegion>
    </div>
  );
}

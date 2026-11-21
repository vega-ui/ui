import { Button, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

const toasts = createToastQueue<string>();

function Message() {
  const { content } = useToastContext<string>();

  return (
    <Toast style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
      <Text size={2} fontWeight={500}>{content}</Text>
      <ToastClose asChild>
        <Button size='xs' variant='secondary' appearance='ghost'>Dismiss</Button>
      </ToastClose>
    </Toast>
  );
}

export default function MinimalComposition() {
  return (
    <>
      <Button size='xs' onClick={() => toasts.add('Changes saved', { timeout: 5000 })}>Save changes</Button>
      <ToastRegion queue={toasts} aria-label='Notifications'>
        <Message />
      </ToastRegion>
    </>
  );
}

import { useEffect, useId, useRef, type CSSProperties } from 'react';
import { Button, Icon, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const FOCUSABLE = 'button:not(:disabled), [href], input:not(:disabled), [tabindex]:not([tabindex="-1"])';

interface Reminder {
  title: string
  time: string
}

const reminders = createToastQueue<Reminder>();

function ReminderToast() {
  const { content } = useToastContext<Reminder>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{content.time}</Text>
      </div>
      <ToastClose asChild>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Join</Button>
      </ToastClose>
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label='Dismiss'
          variant='secondary'
          appearance='ghost'
          style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

export default function Hotkey() {
  const region = useRef<HTMLElement>(null);

  useEffect(() => {
    const focusNewest = (event: KeyboardEvent) => {
      if (event.key !== 'F8') return;

      const newest = region.current?.querySelector('[data-front="true"]');
      const target = newest?.querySelector<HTMLElement>(FOCUSABLE);
      if (!target) return;

      event.preventDefault();
      target.focus();
    };

    document.addEventListener('keydown', focusNewest);
    return () => document.removeEventListener('keydown', focusNewest);
  }, []);

  return (
    <>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button size='xs' onClick={() => reminders.add({ title: 'Design review', time: 'Starts in 5 minutes' }, { timeout: 10000 })}>
          Remind me
        </Button>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Press <kbd>F8</kbd> to move to the newest notification
        </Text>
      </div>
      <ToastRegion ref={region} queue={reminders} aria-label='Notifications, F8'>
        <ReminderToast />
      </ToastRegion>
    </>
  );
}

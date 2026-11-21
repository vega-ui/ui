import { useEffect, useId, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import {
  Button,
  Icon,
  Spinner,
  Text,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
  type ToastRegionProps,
} from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, FileTextIcon, InfoIcon, TriangleAlertIcon, XIcon } from '@vega-ui/icons';

type Tone = 'success' | 'info' | 'warning' | 'error' | 'loading'

export interface Notice {
  title: string
  description?: string
  tone?: Tone
  action?: { label: string, onAction: () => void }
}

export const notices = createToastQueue<Notice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;
const topCorner: CSSProperties = { alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)' };

const tones: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  info: { icon: <InfoIcon />, color: 'var(--color-blue-accent-500)' },
  warning: { icon: <TriangleAlertIcon />, color: 'var(--color-amber-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
};

const smallIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, height: 'var(--spacing-16)' };
const largeIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' };

function ToneIcon({ tone, large }: { tone: Tone, large: boolean }) {

  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={large ? largeIcon : smallIcon}>
        <Spinner size={3} />
      </span>
    );
  }

  return (
    <span aria-hidden='true' style={{ ...(large ? largeIcon : smallIcon), color: tones[tone].color }}>
      <Icon size='sm'>{tones[tone].icon}</Icon>
    </span>
  );
}

function MyToast({ dismissLabel }: { dismissLabel: string }) {
  const { content } = useToastContext<Notice>();
  const titleId = useId();
  const action = content.action && (
    <ToastClose asChild onClick={content.action.onAction}>
      <Button
        size='xs'
        variant='primary'
        appearance='ghost'
        style={{ flexShrink: 0, justifySelf: 'start', marginBlockStart: content.description ? 'var(--spacing-4)' : undefined }}
      >
        {content.action.label}
      </Button>
    </ToastClose>
  );

  return (
    <Toast
      role={content.tone === 'error' ? 'alert' : 'status'}
      aria-labelledby={titleId}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
    >
      {content.tone && <ToneIcon tone={content.tone} large={Boolean(content.description)} />}
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={muted}>{content.description}</Text>}
        {content.description && action}
      </div>
      {!content.description && action}
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label={dismissLabel}
          variant='secondary'
          appearance='ghost'
          style={content.description ? { ...closeStyle, ...topCorner } : closeStyle}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

interface MyToastRegionProps extends Omit<ToastRegionProps<Notice>, 'queue' | 'children'> {
  dismissLabel: string
}

export function MyToastRegion({ dismissLabel, ...props }: MyToastRegionProps) {
  return (
    <ToastRegion queue={notices} {...props}>
      <MyToast dismissLabel={dismissLabel} />
    </ToastRegion>
  );
}

export default function Recipe() {
  const [trashed, setTrashed] = useState(false);
  const publishing = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(publishing.current), []);

  const moveToTrash = () => {
    setTrashed(true);
    notices.add(
      { title: 'Moved to Trash', description: 'Launch plan', action: { label: 'Undo', onAction: () => setTrashed(false) } },
      { timeout: 6000 },
    );
  };

  const publish = () => {
    const progress = notices.add({ title: 'Publishing Launch plan…', tone: 'loading' });
    publishing.current = setTimeout(() => {
      notices.close(progress);
      notices.add({
        title: 'Could not publish',
        description: 'You are offline. Your changes are kept on this device.',
        tone: 'error',
        action: { label: 'Try again', onAction: publish },
      });
    }, 1500);
  };

  return (
    <>
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
        <Icon size='lg' style={muted}><FileTextIcon /></Icon>
        <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
          <Text size={3} fontWeight={500}>Launch plan</Text>
          <Text size={2} style={muted}>{trashed ? 'In Trash' : 'Edited 5 min ago'}</Text>
        </div>
        {trashed ? (
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setTrashed(false)}>Restore</Button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={moveToTrash}>Move to Trash</Button>
            <Button size='xs' onClick={publish}>Publish</Button>
          </div>
        )}
      </div>
      <MyToastRegion aria-label='Notifications' dismissLabel='Dismiss' />
    </>
  );
}

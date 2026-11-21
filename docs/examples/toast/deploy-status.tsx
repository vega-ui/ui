import { useEffect, useId, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import { Badge, Button, Icon, Spinner, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, GitCommitHorizontalIcon, RocketIcon, RotateCwIcon, XIcon } from '@vega-ui/icons';

type Status = 'building' | 'ready' | 'failed';

interface Deployment {
  id: string
  commit: string
  message: string
  status: Status
  time: string
  toast?: string
}

const pending = [
  { commit: '3f2a9c1', message: 'Add the pricing page', fails: false },
  { commit: 'a71d0e4', message: 'Update the search index', fails: true },
  { commit: 'c58b2f7', message: 'Fix the footer links', fails: false },
];

const live: Deployment = { id: 'live', commit: '8b1e0d4', message: 'Translate the changelog', status: 'ready', time: '2h ago' };

type Tone = 'loading' | 'success' | 'error';

interface DeployNotice {
  tone: Tone
  title: string
  description?: string
  action?: { label: string, onAction: () => void }
}

const deployToasts = createToastQueue<DeployNotice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const mono: CSSProperties = { fontFamily: 'var(--code-font-family)' };

const icons: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
};

const iconBox: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' };

function ToneIcon({ tone }: { tone: Tone }) {
  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={iconBox}>
        <Spinner size={3} />
      </span>
    );
  }

  return (
    <span aria-hidden='true' style={{ ...iconBox, color: icons[tone].color }}>
      <Icon size='sm'>{icons[tone].icon}</Icon>
    </span>
  );
}

function DeployToast() {
  const { content } = useToastContext<DeployNotice>();
  const titleId = useId();

  return (
    <Toast
      role={content.tone === 'error' ? 'alert' : 'status'}
      aria-labelledby={titleId}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
    >
      <ToneIcon tone={content.tone} />
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={muted}>{content.description}</Text>}
        {content.action && (
          <ToastClose asChild onClick={content.action.onAction}>
            <Button size='xs' variant='primary' appearance='ghost' style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}>
              {content.action.label}
            </Button>
          </ToastClose>
        )}
      </div>
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label='Dismiss'
          variant='secondary'
          appearance='ghost'
          style={{ flexShrink: 0, alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)', '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

const badges: Record<Status, { label: string, variant: 'info' | 'success' | 'error' }> = {
  building: { label: 'Building', variant: 'info' },
  ready: { label: 'Ready', variant: 'success' },
  failed: { label: 'Failed', variant: 'error' },
};

export default function DeployStatus() {
  const [deployments, setDeployments] = useState<Deployment[]>([live]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const building = deployments.some((deployment) => deployment.status === 'building');
  const next = pending[(deployments.length - 1) % pending.length];

  useEffect(() => () => {
    for (const timer of timers.current) clearTimeout(timer);
    for (const toast of deployToasts.toasts) deployToasts.close(toast.key);
  }, []);

  const finish = (id: string, status: Status, toast?: string) => {
    setDeployments((current) => current.map((deployment) => (
      deployment.id === id ? { ...deployment, status, time: 'Just now', toast } : deployment
    )));
  };

  const build = (id: string, commit: string, fails: boolean) => {
    const progress = deployToasts.add({ tone: 'loading', title: `Deploying ${commit} to production`, description: 'Building and running the tests…' });

    timers.current.push(setTimeout(() => {
      deployToasts.close(progress);

      if (!fails) {
        deployToasts.add({ tone: 'success', title: 'Deployed to production', description: `vega-docs.app now serves ${commit}.` }, { timeout: 6000 });
        finish(id, 'ready');
        return;
      }

      const failure = deployToasts.add({
        tone: 'error',
        title: 'Deployment failed',
        description: `1 test failed in ${commit}. Production still serves the last ready build.`,
        action: { label: 'Retry', onAction: () => retry(id, commit) },
      });
      finish(id, 'failed', failure);
    }, 2400));
  };

  const retry = (id: string, commit: string) => {
    const deployment = deployments.find((item) => item.id === id);
    if (deployment?.toast) deployToasts.close(deployment.toast);

    setDeployments((current) => current.map((item) => (item.id === id ? { ...item, status: 'building', time: 'Just now', toast: undefined } : item)));
    build(id, commit, false);
  };

  const deploy = () => {
    const id = `${next.commit}-${deployments.length}`;
    setDeployments((current) => [{ id, commit: next.commit, message: next.message, status: 'building', time: 'Just now' }, ...current]);
    build(id, next.commit, next.fails);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', boxSizing: 'border-box', width: '100%', maxWidth: 440 }}>
      <section
        aria-label='Deployments'
        style={{ display: 'grid', background: 'var(--surface-primary)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-5)', overflow: 'hidden' }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--spacing-6)',
            padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
            borderBottom: '1px solid var(--separator-opaque)',
          }}
        >
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={2} fontWeight={600}>Production</Text>
            <Text size={1} style={{ ...muted, ...oneLine }}>vega-docs.app · main</Text>
          </div>
          <Button size='xs' disabled={building} style={{ flexShrink: 0, gap: 'var(--spacing-2)' }} onClick={deploy}>
            <Icon size='xs'><RocketIcon /></Icon>
            Deploy
          </Button>
        </header>
        <ul style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', margin: 0, padding: 0, listStyle: 'none' }}>
          {deployments.slice(0, 4).map((deployment, index) => (
            <li
              key={deployment.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-6)',
                padding: 'var(--spacing-5) var(--spacing-4) var(--spacing-5) var(--spacing-8)',
                borderTop: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
              }}
            >
              <Icon size='sm' aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}><GitCommitHorizontalIcon /></Icon>
              <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                <Text size={2} fontWeight={500} style={oneLine}>{deployment.message}</Text>
                <Text size={1} style={{ ...muted, ...oneLine }}>
                  <span style={mono}>{deployment.commit}</span> · {deployment.time}
                </Text>
              </div>
              {deployment.status === 'failed' && (
                <Button
                  square
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Retry ${deployment.commit}`}
                  style={{ flexShrink: 0 }}
                  onClick={() => retry(deployment.id, deployment.commit)}
                >
                  <Icon size='sm'><RotateCwIcon /></Icon>
                </Button>
              )}
              <Badge size='sm' variant={badges[deployment.status].variant} style={{ flexShrink: 0 }}>{badges[deployment.status].label}</Badge>
            </li>
          ))}
        </ul>
      </section>
      <ToastRegion queue={deployToasts} aria-label='Notifications'>
        <DeployToast />
      </ToastRegion>
    </div>
  );
}

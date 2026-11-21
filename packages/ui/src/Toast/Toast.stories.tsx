import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, type CSSProperties, type ReactElement } from 'react';

import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon, XIcon } from '@vega-ui/icons';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { createToastQueue, Toast, ToastClose, ToastRegion, useToastContext } from '.';

type Tone = 'success' | 'info' | 'warning' | 'error' | 'loading'

interface Notice {
  tone?: Tone
  title: string
  description?: string
  action?: string
}

const notices = createToastQueue<Notice>()

const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties
const topCorner: CSSProperties = { alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)' }

const tones: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  info: { icon: <InfoIcon />, color: 'var(--color-blue-accent-500)' },
  warning: { icon: <TriangleAlertIcon />, color: 'var(--color-amber-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
}

const smallIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, height: 'var(--spacing-16)' }
const largeIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' }

function ToneIcon({ tone, large }: { tone: Tone, large: boolean }) {

  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={large ? largeIcon : smallIcon}>
        <Spinner size={3} />
      </span>
    )
  }

  return (
    <span aria-hidden='true' style={{ ...(large ? largeIcon : smallIcon), color: tones[tone].color }}>
      <Icon size='sm'>{tones[tone].icon}</Icon>
    </span>
  )
}

const Action = ({ label, style }: { label: string, style?: CSSProperties }) => (
  <ToastClose asChild>
    <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0, ...style }}>{label}</Button>
  </ToastClose>
)

const Notification = () => {
  const { content } = useToastContext<Notice>()
  const titleId = useId()
  const actionBelow = content.description ? content.action : undefined
  const actionAside = content.description ? undefined : content.action

  return (
    <Toast role={content.tone === 'error' ? 'alert' : 'status'} aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {content.tone && <ToneIcon tone={content.tone} large={Boolean(content.description)} />}
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={{ color: 'var(--label-secondary)' }}>{content.description}</Text>}
        {actionBelow && <Action label={actionBelow} style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }} />}
      </div>
      {actionAside && <Action label={actionAside} />}
      <ToastClose asChild>
        <Button
          square
          size='xs'
          variant='secondary'
          appearance='ghost'
          aria-label='Dismiss'
          style={content.description ? { ...closeStyle, ...topCorner } : closeStyle}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  )
}

const meta = {
  title: 'Feedback/Toast',
  component: ToastRegion,
  parameters: {
    layout: 'centered',
  },
  args: {
    queue: notices,
    'aria-label': 'Notifications',
    children: <Notification />,
  },
  argTypes: {
    limit: { control: { type: 'number', min: 1, max: 6 } },
    placement: { control: 'radio', options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'] },
    queue: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof ToastRegion<Notice>>;

export default meta;
type Story = StoryObj<typeof meta>;

const senders: { label: string, notice: Notice, timeout?: number }[] = [
  { label: 'Save', notice: { tone: 'success', title: 'Changes saved', description: 'Your profile is up to date.' }, timeout: 5000 },
  { label: 'Archive', notice: { title: 'Message archived', action: 'Undo' }, timeout: 6000 },
  { label: 'Update', notice: { tone: 'info', title: 'A new version is available', description: 'Reload to get the latest changes.', action: 'Reload' } },
  { label: 'Storage', notice: { tone: 'warning', title: 'Storage almost full', description: '9.2 GB of 10 GB used. Uploads stop at 10 GB.' }, timeout: 8000 },
  { label: 'Upload', notice: { tone: 'error', title: 'Could not upload', description: 'The file is larger than 10 MB. Pick a smaller one and try again.' } },
  { label: 'Sync', notice: { tone: 'loading', title: 'Syncing 24 files…' }, timeout: 4000 },
]

const Senders = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {senders.map(({ label, notice, timeout }) => (
      <Button key={label} size='sm' onClick={() => notices.add(notice, { timeout })}>{label}</Button>
    ))}
  </div>
)

export const Playground: Story = {
  render: (args) => (
    <>
      <Senders />
      <ToastRegion {...args} />
    </>
  ),
};

export const OverDialog: Story = {
  render: (args) => (
    <>
      <Dialog>
        <DialogTrigger asChild><Button size='sm'>Open dialog</Button></DialogTrigger>
        <DialogContent aria-label='Settings' closedBy='any'>
          <Senders />
        </DialogContent>
      </Dialog>
      <ToastRegion {...args} />
    </>
  ),
};

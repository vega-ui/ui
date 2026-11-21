import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Icon,
  Progress,
  ProgressTrack,
  Text,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
} from '@vega-ui/react';
import { CircleAlertIcon, FileImageIcon, FileSpreadsheetIcon, FileTextIcon, RotateCwIcon, UploadIcon, XIcon } from '@vega-ui/icons';

type Status = 'waiting' | 'uploading' | 'done' | 'failed';

interface Upload {
  name: string
  size: string
  kind: 'text' | 'sheet' | 'image'
  progress: number
  status: Status
  failAt?: number
  toast?: string
}

const files: Upload[] = [
  { name: 'Brand guidelines.pdf', size: '4.2 MB', kind: 'text', progress: 0, status: 'waiting' },
  { name: 'Budget 2027.xlsx', size: '1.1 MB', kind: 'sheet', progress: 0, status: 'waiting', failAt: 60 },
  { name: 'Team photo.jpg', size: '2.8 MB', kind: 'image', progress: 0, status: 'waiting' },
];

const kinds = {
  text: { icon: <FileTextIcon />, color: 'var(--color-red-accent-500)' },
  sheet: { icon: <FileSpreadsheetIcon />, color: 'var(--color-green-accent-500)' },
  image: { icon: <FileImageIcon />, color: 'var(--color-amber-accent-500)' },
};

interface UploadError {
  file: string
  retry: () => void
}

const uploadToasts = createToastQueue<UploadError>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const oneLine: CSSProperties = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
const quiet = { variant: 'secondary', appearance: 'transparent' } as const;

function UploadErrorToast() {
  const { content } = useToastContext<UploadError>();
  const titleId = useId();

  return (
    <Toast role='alert' aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <span
        aria-hidden='true'
        style={{
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          alignSelf: 'flex-start',
          height: 'var(--spacing-12)',
          marginBlock: 'var(--spacing-2)',
          marginInlineEnd: 'var(--spacing-2)',
          color: 'var(--color-red-accent-500)',
        }}
      >
        <Icon size='sm'><CircleAlertIcon /></Icon>
      </span>
      <div style={{ display: 'grid', gap: 'var(--spacing-4)', flex: 1, minWidth: 0, paddingBlockStart: 'var(--spacing-2)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          <Text id={titleId} size={2} fontWeight={500}>{content.file} was not uploaded</Text>
          <Text size={2} style={muted}>The connection dropped. Your other files are uploaded.</Text>
        </div>
        <ToastClose asChild onClick={content.retry}>
          <Button size='xs' variant='primary' appearance='ghost' style={{ justifySelf: 'start' }}>
            Try again
          </Button>
        </ToastClose>
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

const advance = (upload: Upload): Upload => {
  if (upload.status !== 'uploading') return upload;

  const progress = Math.min(100, upload.progress + 8);
  if (upload.failAt !== undefined && progress >= upload.failAt) return { ...upload, progress: upload.failAt, status: 'failed', failAt: undefined };
  if (progress === 100) return { ...upload, progress, status: 'done' };

  return { ...upload, progress };
};

const retrying = (name: string) => (current: Upload[]) => current.map((upload): Upload => (
  upload.name === name ? { ...upload, status: 'uploading', toast: undefined } : upload
));

const statusText = (upload: Upload) => {
  if (upload.status === 'waiting') return `${upload.size} · Waiting`;
  if (upload.status === 'done') return `${upload.size} · Uploaded`;
  if (upload.status === 'failed') return `Failed at ${upload.progress}% · Connection lost`;

  return `${upload.size} · ${upload.progress}%`;
};

export default function UploadErrorExample() {
  const [uploads, setUploads] = useState(files);
  const busy = uploads.some((upload) => upload.status === 'uploading');
  const fresh = uploads.every((upload) => upload.status === 'waiting');

  const retry = (upload: Upload) => {
    if (upload.toast) uploadToasts.close(upload.toast);
    setUploads(retrying(upload.name));
  };

  useEffect(() => {
    if (!busy) return;

    const timer = setTimeout(() => {
      const next = uploads.map(advance).map((upload, index) => {
        if (upload.status !== 'failed' || uploads[index].status === 'failed') return upload;

        return { ...upload, toast: uploadToasts.add({ file: upload.name, retry: () => setUploads(retrying(upload.name)) }) };
      });
      setUploads(next);
    }, 140);

    return () => clearTimeout(timer);
  }, [busy, uploads]);

  const start = () => {
    for (const upload of uploads) if (upload.toast) uploadToasts.close(upload.toast);
    setUploads(files.map((upload) => ({ ...upload, status: 'uploading' })));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <section
        aria-label='Project files'
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
            <Text size={2} fontWeight={600}>Project files</Text>
            <Text size={1} style={muted}>3 files · 8.1 MB</Text>
          </div>
          <Button size='xs' disabled={busy} style={{ flexShrink: 0, gap: 'var(--spacing-2)' }} onClick={start}>
            <Icon size='xs'><UploadIcon /></Icon>
            {fresh ? 'Upload 3 files' : 'Upload again'}
          </Button>
        </header>
        <ul style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', margin: 0, padding: 0, listStyle: 'none' }}>
          {uploads.map((upload, index) => {
            const failed = upload.status === 'failed';
            const kind = kinds[upload.kind];

            return (
              <li
                key={upload.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-6)',
                  padding: 'var(--spacing-6) var(--spacing-4) var(--spacing-6) var(--spacing-8)',
                  borderTop: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
                }}
              >
                <span
                  aria-hidden='true'
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 'var(--radius-3)',
                    color: kind.color,
                    background: `color-mix(in oklch, ${kind.color} 14%, transparent)`,
                  }}
                >
                  <Icon size='sm'>{kind.icon}</Icon>
                </span>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'grid' }}>
                    <Text size={2} fontWeight={500} style={oneLine}>{upload.name}</Text>
                    <Text size={1} style={{ ...oneLine, fontVariantNumeric: 'tabular-nums', color: failed ? 'var(--color-error)' : 'var(--label-secondary)' }}>
                      {statusText(upload)}
                    </Text>
                  </div>
                  <Progress
                    value={upload.progress}
                    valueText={failed ? `Failed at ${upload.progress}%` : `${upload.progress}%`}
                    aria-label={upload.name}
                    size='sm'
                    fullWidth
                    style={failed ? { '--progress-track-color': 'var(--color-error)' } as CSSProperties : undefined}
                  >
                    <ProgressTrack />
                  </Progress>
                </div>
                <div style={{ display: 'grid', placeItems: 'center', flexShrink: 0, width: 32 }}>
                  {failed && (
                    <Button square size='xs' {...quiet} aria-label={`Retry ${upload.name}`} onClick={() => retry(upload)}>
                      <Icon size='sm'><RotateCwIcon /></Icon>
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <ToastRegion queue={uploadToasts} aria-label='Notifications'>
        <UploadErrorToast />
      </ToastRegion>
    </div>
  );
}

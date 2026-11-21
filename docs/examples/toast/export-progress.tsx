import { useEffect, useId, useSyncExternalStore, type CSSProperties } from 'react';
import { Button, Progress, ProgressTrack, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

interface ExportJob {
  id: string
  name: string
  progress: number
  status: 'running' | 'done' | 'canceled'
}

const jobs = new Map<string, ExportJob>();
const listeners = new Set<() => void>();
const timers = new Map<string, ReturnType<typeof setInterval>>();
let version = 0;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const update = (job: ExportJob) => {
  jobs.set(job.id, job);
  version += 1;
  for (const listener of listeners) listener();
};

interface ExportNotice {
  kind: 'running' | 'ready'
  jobId: string
}

const exportToasts = createToastQueue<ExportNotice>();

const download = (job: ExportJob) => {
  const url = URL.createObjectURL(new Blob(['Region,Revenue\nEMEA,1200\nAPAC,980\n'], { type: 'text/csv' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${job.name}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
};

const cancel = (jobId: string) => {
  clearInterval(timers.get(jobId));
  const job = jobs.get(jobId);
  if (job) update({ ...job, status: 'canceled' });
};

const startExport = (name: string) => {
  const id = `${name}-${Date.now()}`;
  update({ id, name, progress: 0, status: 'running' });
  const running = exportToasts.add({ kind: 'running', jobId: id });

  timers.set(id, setInterval(() => {
    const job = jobs.get(id);
    if (!job) return;

    const progress = Math.min(100, job.progress + 8 + Math.round(Math.random() * 10));
    if (progress < 100) {
      update({ ...job, progress });
      return;
    }

    clearInterval(timers.get(id));
    update({ ...job, progress, status: 'done' });
    exportToasts.close(running);
    exportToasts.add({ kind: 'ready', jobId: id }, { timeout: 8000 });
  }, 300));
};

const muted: CSSProperties = { color: 'var(--label-secondary)' };

function ExportToast() {
  const { content } = useToastContext<ExportNotice>();
  const job = useSyncExternalStore(subscribe, () => jobs.get(content.jobId), () => undefined);
  const titleId = useId();
  if (!job) return null;

  if (content.kind === 'ready') {
    return (
      <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Export ready</Text>
          <Text size={2} style={muted}>{job.name}.csv</Text>
        </div>
        <ToastClose asChild onClick={() => download(job)}>
          <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Download</Button>
        </ToastClose>
      </Toast>
    );
  }

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
          <Text id={titleId} size={2} fontWeight={500}>Exporting {job.name}</Text>
          <Text size={2} aria-hidden style={{ ...muted, fontVariantNumeric: 'tabular-nums' }}>{job.progress}%</Text>
        </div>
        <Progress value={job.progress} size='sm' fullWidth aria-labelledby={titleId}>
          <ProgressTrack />
        </Progress>
      </div>
      <ToastClose asChild onClick={() => cancel(job.id)}>
        <Button size='xs' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>Cancel</Button>
      </ToastClose>
    </Toast>
  );
}

const reports = ['Q3 revenue', 'Active customers'];

export default function ExportProgress() {
  useSyncExternalStore(subscribe, () => version, () => 0);
  const finished = [...jobs.values()].filter((job) => job.status === 'done').reverse();

  useEffect(() => () => {
    for (const timer of timers.values()) clearInterval(timer);
    timers.clear();
    for (const toast of exportToasts.toasts) exportToasts.close(toast.key);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', boxSizing: 'border-box', width: '100%', maxWidth: 420 }}>
      <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
        {reports.map((report) => (
          <li key={report} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
            <Text size={2} fontWeight={500}>{report}</Text>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={() => startExport(report)}>Export CSV</Button>
          </li>
        ))}
      </ul>
      {finished.length > 0 && (
        <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Text size={2} fontWeight={500} style={muted}>Recent exports</Text>
          <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
            {finished.map((job) => (
              <li key={job.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
                <Text size={2}>{job.name}.csv</Text>
                <Button size='xs' variant='primary' appearance='ghost' onClick={() => download(job)}>Download</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ToastRegion queue={exportToasts} aria-label='Exports'>
        <ExportToast />
      </ToastRegion>
    </div>
  );
}

import {
  Button,
  HelperText,
  Spinner,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

type Status = 'loading' | 'error' | 'ready';

const columns = ['Deploy', 'Branch', 'Duration'];

const deploys = [
  { id: '#4182', branch: 'main', duration: '3m 12s' },
  { id: '#4181', branch: 'fix/invoice-rounding', duration: '2m 47s' },
  { id: '#4180', branch: 'main', duration: '3m 05s' },
];

export default function FailedToLoadRows() {
  const [status, setStatus] = useState<Status>('loading');
  const [attempt, setAttempt] = useState(1);

  useEffect(() => {
    if (status !== 'loading') return;

    const timer = setTimeout(() => setStatus(attempt === 1 ? 'error' : 'ready'), 1000);

    return () => clearTimeout(timer);
  }, [status, attempt]);

  const retry = () => {
    setAttempt(attempt + 1);
    setStatus('loading');
  };

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded aria-busy={status === 'loading'} style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => <TableHeading key={column} scope='col'>{column}</TableHeading>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {status === 'loading' && (
            <TableRow>
              <TableData colSpan={columns.length} dataAlign='center' style={{ height: 'var(--spacing-52)' }}>
                <Spinner size={3} aria-label='Loading deploys' style={{ marginInline: 'auto' }} />
              </TableData>
            </TableRow>
          )}
          {status === 'error' && (
            <TableRow>
              <TableData colSpan={columns.length} dataAlign='center' style={{ height: 'var(--spacing-52)' }}>
                <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center' }}>
                  <HelperText error role='alert'>Could not load deploys: the request timed out.</HelperText>
                  <Button size='sm' variant='secondary' appearance='ghost' onClick={retry}>Retry</Button>
                </div>
              </TableData>
            </TableRow>
          )}
          {status === 'ready' && deploys.map((deploy) => (
            <TableRow key={deploy.id}>
              <TableData>{deploy.id}</TableData>
              <TableData>{deploy.branch}</TableData>
              <TableData>{deploy.duration}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

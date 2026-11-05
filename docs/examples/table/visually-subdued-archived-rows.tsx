import {
  Badge,
  Button,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const projects = [
  { id: 'p1', name: 'Mobile app redesign', owner: 'Maya Chen', archived: false },
  { id: 'p2', name: 'Spring campaign 2025', owner: 'Omar Haddad', archived: true },
  { id: 'p3', name: 'Billing migration', owner: 'Lena Fischer', archived: false },
  { id: 'p4', name: 'Legacy API docs', owner: 'Tomás Ruiz', archived: true },
];

export const layout = 'wide';

export default function VisuallySubduedArchivedRows() {
  return (
    <div role='region' aria-label='Projects' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Project</TableHeading>
            <TableHeading scope='col'>Owner</TableHeading>
            <TableHeading scope='col'>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} style={project.archived ? { color: 'var(--label-secondary)' } : undefined}>
              <TableData>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                  {project.name}
                  {project.archived && <Badge size='sm' appearance='surface'>Archived</Badge>}
                </span>
              </TableData>
              <TableData style={{ whiteSpace: 'nowrap' }}>{project.owner}</TableData>
              <TableData>
                <Button size='sm' variant='secondary' appearance='ghost' disabled={project.archived} aria-label={`Edit ${project.name}`}>
                  Edit
                </Button>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

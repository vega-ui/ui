import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { useState } from 'react';

const members = Array.from({ length: 23 }, (_, index) => ({
  id: index,
  name: ['Maya Chen', 'Omar Haddad', 'Lena Fischer', 'Tomás Ruiz', 'Aiko Tanaka'][index % 5],
  role: index % 4 === 0 ? 'Admin' : 'Member',
}));

const pageSize = 5;

export default function DenseFooterControls() {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(members.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = members.slice(start, start + pageSize);

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Name</TableHeading>
            <TableHeading scope='col'>Role</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {visible.map((member) => (
            <TableRow key={member.id}>
              <TableData>{member.name}</TableData>
              <TableData>{member.role}</TableData>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableData colSpan={2} style={{ paddingBlock: 'var(--spacing-3)' }}>
              <nav aria-label='Members pages' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination size='sm' variant='secondary' style={{ alignItems: 'center', gap: 'var(--spacing-2)' }}>
                  <PaginationText size={2} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {start + 1}–{start + visible.length} of {members.length}
                  </PaginationText>
                  <PaginationListItem>
                    <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                      <Icon><ChevronLeft /></Icon>
                    </PaginationTriggerIconButton>
                  </PaginationListItem>
                  <PaginationListItem>
                    <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setPage(page + 1)}>
                      <Icon><ChevronRight /></Icon>
                    </PaginationTriggerIconButton>
                  </PaginationListItem>
                </Pagination>
              </nav>
            </TableData>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}

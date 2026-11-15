import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
  Text,
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
              <Pagination
                aria-label='Members pages'
                size='sm'
                variant='secondary'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-8)' }}
              >
                <Text size={2} fontWeight={500} aria-live='polite' style={{ color: 'var(--color-secondary-500)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                  {start + 1}–{start + visible.length} of {members.length}
                </Text>
                <PaginationList>
                  <PaginationItem>
                    <PaginationLink asChild>
                      <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                        <Icon><ChevronLeft /></Icon>
                      </button>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink asChild>
                      <button type='button' aria-label='Next page' disabled={page === pageCount} onClick={() => setPage(page + 1)}>
                        <Icon><ChevronRight /></Icon>
                      </button>
                    </PaginationLink>
                  </PaginationItem>
                </PaginationList>
              </Pagination>
            </TableData>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}

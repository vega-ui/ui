import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MinimalComposition() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <Pagination aria-label='Pagination'>
      <PaginationList>
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
              <Icon><ChevronLeftIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
        {pages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink asChild current={item === page}>
              <button type='button' onClick={() => setPage(item)}>{item}</button>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink asChild>
            <button type='button' aria-label='Next page' disabled={page === pages.length} onClick={() => setPage(page + 1)}>
              <Icon><ChevronRightIcon /></Icon>
            </button>
          </PaginationLink>
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

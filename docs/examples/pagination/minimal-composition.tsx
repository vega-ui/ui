import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

export default function MinimalComposition() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3];

  return (
    <nav aria-label='Pagination'>
      <Pagination>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        {pages.map((item) => (
          <PaginationListItem key={item}>
            <PaginationItem current={item === page} onClick={() => setPage(item)}>{item}</PaginationItem>
          </PaginationListItem>
        ))}
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page' disabled={page === pages.length} onClick={() => setPage(page + 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}

import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationListItem,
  PaginationText,
  PaginationTriggerIconButton,
} from '@vega-ui/react';
import { useState } from 'react';

export default function SecondaryPaginationText() {
  const total = 20;
  const [page, setPage] = useState(3);

  return (
    <nav aria-label='Gallery pages'>
      <Pagination variant='secondary' style={{ alignItems: 'center' }}>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
            <Icon><ChevronLeft /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
        <PaginationText aria-live='polite'>Page {page} of {total}</PaginationText>
        <PaginationListItem>
          <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
            <Icon><ChevronRight /></Icon>
          </PaginationTriggerIconButton>
        </PaginationListItem>
      </Pagination>
    </nav>
  );
}

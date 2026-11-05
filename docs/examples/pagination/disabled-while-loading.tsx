import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Spinner,
  Text,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

const total = 5;

export const layout = 'wide';

export default function DisabledWhileLoading() {
  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState<number | null>(null);

  useEffect(() => {
    if (loadingPage === null) return;

    const timer = setTimeout(() => {
      setPage(loadingPage);
      setLoadingPage(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loadingPage]);

  const loading = loadingPage !== null;
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <fieldset disabled={loading} style={{ margin: 0, padding: 0, border: 'none', minInlineSize: 0 }}>
        <nav aria-label='Invoice pages'>
          <Pagination>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setLoadingPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setLoadingPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === total} onClick={() => setLoadingPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
      </fieldset>
      <div role='status' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', minHeight: 'var(--spacing-12)' }}>
        {loading && <Spinner size={2} aria-hidden='true' />}
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{loading ? `Loading page ${loadingPage}…` : `Page ${page} of ${total}`}</Text>
      </div>
    </div>
  );
}

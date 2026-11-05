import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  HelperText,
  Icon,
  Label,
  Pagination,
  PaginationItem,
  PaginationListItem,
  PaginationTriggerIconButton,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const firstNames = ['Maya', 'Omar', 'Lena', 'Tomás', 'Aiko', 'Priya', 'Jonas', 'Sofia'];
const lastNames = ['Chen', 'Haddad', 'Fischer', 'Ruiz', 'Tanaka', 'Nair', 'Berg'];
const customers = firstNames.flatMap((first) => lastNames.map((last) => `${first} ${last}`));
const pageSize = 12;

export const layout = 'wide';

export default function StalePageHintAfterFilterChange() {
  const fieldId = useId();
  const hintId = useId();
  const [query, setQuery] = useState('');
  const [requestedPage, setRequestedPage] = useState(5);

  const matches = customers.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));
  const pageCount = Math.max(Math.ceil(matches.length / pageSize), 1);
  const stale = requestedPage > pageCount;
  const page = stale ? pageCount : requestedPage;
  const visible = matches.slice((page - 1) * pageSize, page * pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>Filter customers</Label>
        <TextField>
          <TextFieldInput id={fieldId} type='search' value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Try “ber”' />
        </TextField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {visible.length > 0 ? visible.join(', ') : 'No customers match this filter.'}
      </Text>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <nav aria-label='Customer pages' aria-describedby={stale ? hintId : undefined}>
          <Pagination size='sm'>
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Previous page' disabled={page === 1} onClick={() => setRequestedPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
            {pages.map((item) => (
              <PaginationListItem key={item}>
                <PaginationItem current={item === page} aria-label={`Page ${item}`} onClick={() => setRequestedPage(item)}>
                  {item}
                </PaginationItem>
              </PaginationListItem>
            ))}
            <PaginationListItem>
              <PaginationTriggerIconButton aria-label='Next page' disabled={page === pageCount} onClick={() => setRequestedPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </PaginationTriggerIconButton>
            </PaginationListItem>
          </Pagination>
        </nav>
        {stale && (
          <HelperText id={hintId} error role='status' style={{ textAlign: 'center', textWrap: 'balance' }}>
            Page {requestedPage} no longer exists for this filter. Showing page {page} of {pageCount}.
          </HelperText>
        )}
      </div>
    </div>
  );
}

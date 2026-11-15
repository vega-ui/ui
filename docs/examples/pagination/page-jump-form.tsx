import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  Button,
  Icon,
  Label,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

type PageItem = number | 'start-ellipsis' | 'end-ellipsis';

function range(from: number, to: number) {
  return [...Array(to - from + 1).keys()].map((offset) => from + offset);
}

function getPageItems(page: number, total: number, siblings: number): PageItem[] {
  const slots = siblings * 2 + 5;

  if (total <= slots) {
    return range(1, total);
  }
  if (page - siblings <= 3) {
    return [...range(1, slots - 2), 'end-ellipsis', total];
  }
  if (page + siblings >= total - 2) {
    return [1, 'start-ellipsis', ...range(total - slots + 3, total)];
  }
  return [1, 'start-ellipsis', ...range(page - siblings, page + siblings), 'end-ellipsis', total];
}

export const layout = 'wide';

export default function PageJumpForm() {
  const fieldId = useId();
  const total = 48;
  const [page, setPage] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPage(Number(data.get('page')));
    event.currentTarget.reset();
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-8)' }}>
      <Pagination aria-label='Catalog pages'>
        <PaginationList>
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Previous page' disabled={page === 1} onClick={() => setPage(page - 1)}>
                <Icon><ChevronLeft /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
          {getPageItems(page, total, 1).map((item) => {
            if (typeof item === 'string') {
              return <PaginationEllipsis key={item} />;
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink asChild current={item === page}>
                  <button type='button' aria-label={`Page ${item}`} onClick={() => setPage(item)}>
                    {item}
                  </button>
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationLink asChild>
              <button type='button' aria-label='Next page' disabled={page === total} onClick={() => setPage(page + 1)}>
                <Icon><ChevronRight /></Icon>
              </button>
            </PaginationLink>
          </PaginationItem>
        </PaginationList>
      </Pagination>
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={fieldId} size='sm'>Go to page (1–{total})</Label>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <TextField size='sm' style={{ width: 'var(--spacing-40)' }}>
            <TextFieldInput id={fieldId} name='page' type='number' inputMode='numeric' min={1} max={total} step={1} required />
          </TextField>
          <Button type='submit' size='sm' variant='secondary' appearance='ghost'>Go</Button>
        </div>
      </form>
    </div>
  );
}

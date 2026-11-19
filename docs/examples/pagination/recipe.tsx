import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  Icon,
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  type PaginationProps,
} from '@vega-ui/react';
import { useEffect, useState } from 'react';

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

interface MyPaginationProps extends PaginationProps {
  page: number
  total: number
  getHref: (page: number) => string
  siblings?: number
  previousLabel: string
  nextLabel: string
}

export function MyPagination({ page, total, getHref, siblings = 1, previousLabel, nextLabel, ...props }: MyPaginationProps) {
  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <Pagination {...props}>
      <PaginationList>
        <PaginationItem>
          {isFirst ? (
            <PaginationLink aria-label={previousLabel} aria-disabled='true'><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page - 1)} rel='prev' aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
        {getPageItems(page, total, siblings).map((item) => {
          if (typeof item === 'string') {
            return <PaginationEllipsis key={item} />;
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink href={getHref(item)} current={item === page}>{item}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          {isLast ? (
            <PaginationLink aria-label={nextLabel} aria-disabled='true'><Icon><ChevronRightIcon /></Icon></PaginationLink>
          ) : (
            <PaginationLink href={getHref(page + 1)} rel='next' aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></PaginationLink>
          )}
        </PaginationItem>
      </PaginationList>
    </Pagination>
  );
}

const total = 24;

function getHref(page: number) {
  return `?page=${page}`;
}

export const layout = 'wide';

export default function Recipe() {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fromUrl = Number(new URLSearchParams(window.location.search).get('page'));
    if (Number.isInteger(fromUrl) && fromUrl >= 1 && fromUrl <= total) {
      setPage(fromUrl);
    }
  }, []);

  return (
    <MyPagination
      aria-label='Blog archive pages'
      size='sm'
      page={page}
      total={total}
      getHref={getHref}
      siblings={0}
      previousLabel='Previous page'
      nextLabel='Next page'
    />
  );
}

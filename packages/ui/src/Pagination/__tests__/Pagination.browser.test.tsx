import { AnchorHTMLAttributes, FC } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Pagination } from '../Pagination';
import { PaginationEllipsis, PaginationItem, PaginationLink, PaginationList } from '../components';

afterEach(cleanup);

const RouterLink: FC<AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({ to, ...props }) => <a href={to} {...props} />

const getLink = (r: RenderResult, name: string) => r.getByRole('link', { name });

describe('Pagination', () => {
  describe('Critical User Paths', () => {
    it('marks only the current page', async () => {
      const r = render(
        <Pagination aria-label='Pages'>
          <PaginationList>
            <PaginationItem><PaginationLink href='?page=1'>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href='?page=2' current>2</PaginationLink></PaginationItem>
          </PaginationList>
        </Pagination>
      );

      await expect.element(getLink(r, '2')).toHaveAttribute('aria-current', 'page');
      await expect.element(getLink(r, '1')).not.toHaveAttribute('aria-current');
    });

    it('renders a router link with asChild, keeping its address and the current page', async () => {
      const r = render(
        <Pagination aria-label='Pages'>
          <PaginationList>
            <PaginationItem>
              <PaginationLink asChild current className='custom'>
                <RouterLink to='/page/5'>5</RouterLink>
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      );

      const link = getLink(r, '5');
      await expect.element(link).toHaveAttribute('href', '/page/5');
      await expect.element(link).toHaveAttribute('aria-current', 'page');
      await expect.element(link).toHaveClass('custom');
    });
  });

  describe('Edge Cases', () => {
    it('takes size and variant from the root, and a link overrides them and its appearance', async () => {
      const r = render(
        <Pagination aria-label='Pages' size='sm' variant='secondary'>
          <PaginationList>
            <PaginationItem><PaginationLink href='?page=1' current>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href='?page=2' size='lg' variant='primary' appearance='ghost'>2</PaginationLink></PaginationItem>
          </PaginationList>
        </Pagination>
      );

      await expect.element(getLink(r, '1')).toHaveAttribute('data-size', 'sm');
      await expect.element(getLink(r, '1')).toHaveAttribute('data-variant', 'secondary');
      await expect.element(getLink(r, '1')).toHaveAttribute('data-appearance', 'fill');
      await expect.element(getLink(r, '2')).toHaveAttribute('data-size', 'lg');
      await expect.element(getLink(r, '2')).toHaveAttribute('data-variant', 'primary');
      await expect.element(getLink(r, '2')).toHaveAttribute('data-appearance', 'ghost');
    });
  });

  describe('Accessibility', () => {
    it('hides the ellipsis from assistive technologies', async () => {
      const r = render(
        <Pagination aria-label='Pages'>
          <PaginationList>
            <PaginationItem><PaginationLink href='?page=1'>1</PaginationLink></PaginationItem>
            <PaginationEllipsis data-testid='ellipsis' />
            <PaginationItem><PaginationLink href='?page=20'>20</PaginationLink></PaginationItem>
          </PaginationList>
        </Pagination>
      );

      await expect.element(r.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true');
      expect(r.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});

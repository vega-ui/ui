import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Pagination } from '../Pagination';
import {
  PaginationEllipsis,
  PaginationItem,
  PaginationText,
  PaginationTriggerIconButton,
  PaginationListItem,
} from '../components';
import { Icon } from '../../Icon';
import { MoveLeft, MoveRight } from '@vega-ui/icons';

afterEach(cleanup);

const TESTID_ROOT = 'pagination';
const TESTID_PREV = 'prev';
const TESTID_NEXT = 'next';

const TESTID_ITEM_111 = 'item-111';
const TESTID_ITEM_112 = 'item-112';
const TESTID_ITEM_113 = 'item-113';

const TESTID_ELLIPSIS = 'ellipsis';

const PaginationTest: FC<Partial<ComponentProps<typeof Pagination>>> = (props) => {
  return (
    <Pagination data-testid={TESTID_ROOT} {...props}>
      <PaginationListItem>
        <PaginationTriggerIconButton data-testid={TESTID_PREV} aria-label='Previous page'>
          <Icon>
            <MoveLeft />
          </Icon>
        </PaginationTriggerIconButton>
      </PaginationListItem>
      
      <PaginationListItem>
        <PaginationItem data-testid={TESTID_ITEM_111}>111</PaginationItem>
      </PaginationListItem>
      
      <PaginationListItem>
        <PaginationItem data-testid={TESTID_ITEM_112}>112</PaginationItem>
      </PaginationListItem>
      
      <PaginationListItem>
        <PaginationEllipsis data-testid={TESTID_ELLIPSIS} />
      </PaginationListItem>
      
      <PaginationListItem>
        <PaginationItem data-testid={TESTID_ITEM_113}>113</PaginationItem>
      </PaginationListItem>
      
      <PaginationListItem>
        <PaginationTriggerIconButton data-testid={TESTID_NEXT} aria-label='Next page'>
          <Icon>
            <MoveRight />
          </Icon>
        </PaginationTriggerIconButton>
      </PaginationListItem>
      
      <PaginationText data-testid='text'>Page 1 of 20</PaginationText>
    </Pagination>
  );
};

const getNext = (r: RenderResult) => r.getByTestId(TESTID_NEXT);

const getItem112 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_112);

const getEllipsis = (r: RenderResult) => r.getByTestId(TESTID_ELLIPSIS);

describe('Pagination', () => {
  describe('Accessibility', () => {
    it('marks only the current page', async () => {
      const r = render(
        <Pagination>
          <PaginationListItem><PaginationItem current>1</PaginationItem></PaginationListItem>
          <PaginationListItem><PaginationItem>2</PaginationItem></PaginationListItem>
        </Pagination>
      );

      await expect.element(r.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page');
      await expect.element(r.getByRole('button', { name: '2' })).not.toHaveAttribute('aria-current');
    });
  });

  describe('Edge Cases', () => {
    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <PaginationTest />
        </form>
      );

      await userEvent.click(getNext(r));
      await userEvent.click(getItem112(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('hides ellipsis from assistive tech', async () => {
        const r = render(<PaginationTest />);
        await expect.element(getEllipsis(r)).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});

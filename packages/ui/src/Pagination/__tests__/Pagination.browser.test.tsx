import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

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

const getRoot = (r: RenderResult) => r.getByTestId(TESTID_ROOT);

const getPrev = (r: RenderResult) => r.getByTestId(TESTID_PREV);
const getNext = (r: RenderResult) => r.getByTestId(TESTID_NEXT);

const getItem111 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_111);
const getItem112 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_112);
const getItem113 = (r: RenderResult) => r.getByTestId(TESTID_ITEM_113);

const getEllipsis = (r: RenderResult) => r.getByTestId(TESTID_ELLIPSIS);

describe('Pagination', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<PaginationTest />);
    });
    
    it('renders root', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
    
    it('renders items', async () => {
      await expect.element(getItem111(r)).toBeInTheDocument();
      await expect.element(getItem112(r)).toBeInTheDocument();
      await expect.element(getItem113(r)).toBeInTheDocument();
      
      await expect.element(getItem111(r)).toHaveTextContent('111');
      await expect.element(getItem112(r)).toHaveTextContent('112');
      await expect.element(getItem113(r)).toHaveTextContent('113');
    });
    
    it('renders trigger buttons', async () => {
      await expect.element(getPrev(r)).toBeInTheDocument();
      await expect.element(getNext(r)).toBeInTheDocument();
      await expect.element(getPrev(r)).toHaveRole('button');
      await expect.element(getNext(r)).toHaveRole('button');
    });
    
    it('renders ellipsis', async () => {
      await expect.element(getEllipsis(r)).toBeInTheDocument();
      await expect.element(getEllipsis(r)).toHaveTextContent('...');
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without optional Pagination props', async () => {
      const r = render(<PaginationTest />);
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('hides ellipsis from assistive tech', async () => {
        const r = render(<PaginationTest />);
        await expect.element(getEllipsis(r)).toHaveAttribute('aria-hidden', 'true');
      });
      
      it('exposes icon buttons via aria-label', async () => {
        const r = render(<PaginationTest />);
        await expect.element(getPrev(r)).toHaveAttribute('aria-label', 'Previous page');
        await expect.element(getNext(r)).toHaveAttribute('aria-label', 'Next page');
      });
    });
    
    describe('roles', () => {
      it('renders list items with listitem role', async () => {
        const r = render(<PaginationTest />);
        const items = r.getAllByRole('listitem');
        expect(items.length).toBeGreaterThan(0);
      });
      
      it('renders items and triggers as buttons', async () => {
        const r = render(<PaginationTest />);
        await expect.element(getPrev(r)).toHaveRole('button');
        await expect.element(getNext(r)).toHaveRole('button');
        await expect.element(getItem111(r)).toHaveRole('button');
        await expect.element(getItem112(r)).toHaveRole('button');
        await expect.element(getItem113(r)).toHaveRole('button');
      });
    });
  });
});
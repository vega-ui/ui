import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, within } from '@testing-library/react';

import { CalendarBase } from '../CalendarBase';
import {
  CalendarBaseHeader,
  CalendarBaseNextButton,
  CalendarBasePickerButton,
  CalendarBasePrevButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
} from '../components';

afterEach(cleanup);

const CalendarBaseTest = (props: ComponentProps<typeof CalendarBase>) => {
  const { children, ...rest } = props;
  
  return (
    <CalendarBase {...rest} data-testid='root'>
      {children ?? (
        <>
          <CalendarBaseHeader data-testid='header'>
            <CalendarBasePrevButton data-testid='prev'>Prev</CalendarBasePrevButton>
            
            <div data-testid='picker-group'>
              <CalendarBasePickerButton data-testid='month-btn'>Month</CalendarBasePickerButton>
              <CalendarBasePickerButton data-testid='year-btn'>Year</CalendarBasePickerButton>
            </div>
            
            <CalendarBaseNextButton data-testid='next'>Next</CalendarBaseNextButton>
          </CalendarBaseHeader>
          
          <div data-testid='body'>
            <CalendarBaseWeekLabels data-testid='week-labels'>
              <CalendarBaseWeekLabel data-testid='week-label'>Mon</CalendarBaseWeekLabel>
              <CalendarBaseWeekLabel data-testid='week-label'>Tue</CalendarBaseWeekLabel>
              <CalendarBaseWeekLabel data-testid='week-label'>Wed</CalendarBaseWeekLabel>
            </CalendarBaseWeekLabels>
          </div>
        </>
      )}
    </CalendarBase>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId('root');
const getHeader = (r: RenderResult) => r.getByTestId('header');
const getPrev = (r: RenderResult) => r.getByTestId('prev') as HTMLButtonElement;
const getNext = (r: RenderResult) => r.getByTestId('next') as HTMLButtonElement;

const getMonthBtn = (r: RenderResult) => r.getByTestId('month-btn') as HTMLButtonElement;
const getYearBtn = (r: RenderResult) => r.getByTestId('year-btn') as HTMLButtonElement;

const getWeekLabels = (r: RenderResult) => r.getByTestId('week-labels');

describe('CalendarBase', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<CalendarBaseTest />);
    });
    
    it('renders root', async () => {
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
    
    it('renders header', async () => {
      await expect.element(getHeader(r)).toBeInTheDocument();
    });
    
    it('renders header actions', async () => {
      await expect.element(getPrev(r)).toBeInTheDocument();
      await expect.element(getNext(r)).toBeInTheDocument();
    });
    
    it('renders picker buttons', async () => {
      await expect.element(getMonthBtn(r)).toBeInTheDocument();
      await expect.element(getYearBtn(r)).toBeInTheDocument();
    });
    
    it('renders week labels container', async () => {
      await expect.element(getWeekLabels(r)).toBeInTheDocument();
    });
    
    it('default data-compact is absent', async () => {
      await expect.element(getRoot(r)).not.toHaveAttribute('data-compact');
    });
    
    it('applies compact=true to data-compact', async () => {
      r.rerender(<CalendarBaseTest compact />);
      await expect.element(getRoot(r)).toHaveAttribute('data-compact', 'true');
    });
    
    it('supports size/variant props without breaking nested controls', async () => {
      r.rerender(<CalendarBaseTest size='md' variant='primary' />);
      
      await expect.element(getPrev(r)).toBeInTheDocument();
      await expect.element(getNext(r)).toBeInTheDocument();
      await expect.element(getMonthBtn(r)).toBeInTheDocument();
      await expect.element(getYearBtn(r)).toBeInTheDocument();
    });
    
    it('supports custom children composition', async () => {
      r.rerender(
        <CalendarBaseTest>
          <CalendarBaseHeader data-testid='header'>
            <CalendarBasePrevButton data-testid='prev'>Prev</CalendarBasePrevButton>
          </CalendarBaseHeader>
          
          <CalendarBaseWeekLabels data-testid='week-labels'>
            <CalendarBaseWeekLabel data-testid='week-label'>Mon</CalendarBaseWeekLabel>
          </CalendarBaseWeekLabels>
        </CalendarBaseTest>,
      );
      
      await expect.element(getHeader(r)).toBeInTheDocument();
      await expect.element(getPrev(r)).toBeInTheDocument();
      await expect.element(getWeekLabels(r)).toBeInTheDocument();
    });
  });
  
  describe('Error Handling', () => {
    it('renders with no children (no crash)', async () => {
      const r = render(<CalendarBase />);
      await expect.element(r.container.firstElementChild as HTMLElement).toBeInTheDocument();
    });
    
    it('CalendarBaseWeekLabels renders without children (no crash)', async () => {
      const r = render(
        <CalendarBaseTest>
          <CalendarBaseWeekLabels data-testid='week-labels' />
        </CalendarBaseTest>,
      );
      
      await expect.element(getWeekLabels(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('supports multiple instances (scoped queries)', async () => {
      const r = render(
        <>
          <CalendarBaseTest />
          <CalendarBaseTest />
        </>,
      );
      
      const allHeaders = r.getAllByTestId('header');
      expect(allHeaders).toHaveLength(2);
      
      const first = within(allHeaders[0]);
      const second = within(allHeaders[1]);
      
      await expect.element(first.getByTestId('prev')).toBeInTheDocument();
      await expect.element(second.getByTestId('prev')).toBeInTheDocument();
    });
    
    it('passes HTMLAttributes through CalendarBaseHeader', async () => {
      const r = render(
        <CalendarBaseTest>
          <CalendarBaseHeader data-testid='header' title='hdr' />
        </CalendarBaseTest>,
      );
      
      await expect.element(getHeader(r)).toHaveAttribute('title', 'hdr');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarBaseTest />);
      });
      
      it('CalendarBaseWeekLabels has role=row', async () => {
        await expect.element(getWeekLabels(r)).toHaveRole('row');
      });
      
      it('CalendarBaseWeekLabel has role=columnheader', async () => {
        const labels = r.getAllByTestId('week-label');
        await expect.element(labels[0]).toHaveRole('columnheader');
        await expect.element(labels[1]).toHaveRole('columnheader');
        await expect.element(labels[2]).toHaveRole('columnheader');
      });
    });
    
    describe('focus', () => {
      it('month picker button is focusable', async () => {
        const r = render(<CalendarBaseTest />);
        getMonthBtn(r).focus();
        await expect.element(getMonthBtn(r)).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('Enter triggers click on picker button', async () => {
        const onClick = vi.fn();
        const r = render(
          <CalendarBaseTest>
            <CalendarBaseHeader data-testid='header'>
              <CalendarBasePickerButton data-testid='month-btn' onClick={onClick}>
                Month
              </CalendarBasePickerButton>
            </CalendarBaseHeader>
          </CalendarBaseTest>,
        );
        
        const button = getMonthBtn(r);
        button.focus();
        await expect.element(button).toHaveFocus();
        
        await userEvent.keyboard('{Enter}');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
      
      it('Space triggers click on picker button', async () => {
        const onClick = vi.fn();
        const r = render(
          <CalendarBaseTest>
            <CalendarBaseHeader data-testid='header'>
              <CalendarBasePickerButton data-testid='month-btn' onClick={onClick}>
                Month
              </CalendarBasePickerButton>
            </CalendarBaseHeader>
          </CalendarBaseTest>,
        );
        
        const button = getMonthBtn(r);
        button.focus();
        await expect.element(button).toHaveFocus();
        
        await userEvent.keyboard(' ');
        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
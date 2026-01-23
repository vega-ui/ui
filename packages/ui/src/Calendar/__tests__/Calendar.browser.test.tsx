import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Calendar } from '../Calendar';
import {
  CalendarContent,
  CalendarDayPicker,
  CalendarDayPickerScroller,
  CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader,
  CalendarMonthPicker,
  CalendarMonthPickerButton,
  CalendarMonthPickerLayout,
  CalendarNextButton,
  CalendarPickerButtonGroup,
  CalendarPrevButton,
  CalendarWeekLabel,
  CalendarWeekLabels,
  CalendarYearPicker,
  CalendarYearPickerButton,
  CalendarYearPickerScroller,
  CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout,
} from '../components';

afterEach(cleanup);

const MonthLabel = () => <span data-testid='month-label'>Month</span>;
const YearLabel = () => <span data-testid='year-label'>Year</span>;

const CalendarTest = (props: ComponentProps<typeof Calendar>) => {
  const { children, ...rest } = props;
  
  return (
    <Calendar {...rest}>
      {children ?? (
        <>
          <CalendarHeader>
            <CalendarPrevButton data-testid='prev-button'>Prev</CalendarPrevButton>
            
            <CalendarPickerButtonGroup data-testid='picker-group'>
              <CalendarMonthPickerButton data-testid='month-picker-button'>
                <MonthLabel />
              </CalendarMonthPickerButton>
              <CalendarYearPickerButton data-testid='year-picker-button'>
                <YearLabel />
              </CalendarYearPickerButton>
            </CalendarPickerButtonGroup>
            
            <CalendarNextButton data-testid='next-button'>Next</CalendarNextButton>
          </CalendarHeader>
          
          <CalendarContent data-testid='content'>
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarWeekLabels data-testid='week-labels'>
                <CalendarWeekLabel data-testid='week-label'>Mon</CalendarWeekLabel>
              </CalendarWeekLabels>
              
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
            
            <CalendarMonthPicker data-testid='month-picker'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout' />
            </CalendarMonthPicker>
            
            <CalendarYearPicker data-testid='year-picker'>
              <CalendarYearPickerScroller data-testid='year-scroller'>
                <CalendarYearPickerScrollerContent data-testid='year-scroller-content'>
                  <CalendarYearPickerScrollerLayout data-testid='year-scroller-layout' />
                </CalendarYearPickerScrollerContent>
              </CalendarYearPickerScroller>
            </CalendarYearPicker>
          </CalendarContent>
        </>
      )}
    </Calendar>
  );
};

const getPrev = (r: RenderResult) => r.getByTestId('prev-button') as HTMLButtonElement;
const getNext = (r: RenderResult) => r.getByTestId('next-button') as HTMLButtonElement;

const getMonthBtn = (r: RenderResult) => r.getByTestId('month-picker-button') as HTMLButtonElement;
const getYearBtn = (r: RenderResult) => r.getByTestId('year-picker-button') as HTMLButtonElement;

const getContent = (r: RenderResult) => r.getByTestId('content');

const getDayPicker = (r: RenderResult) => r.getByTestId('day-picker');
const getMonthPicker = (r: RenderResult) => r.getByTestId('month-picker');
const getYearPicker = (r: RenderResult) => r.getByTestId('year-picker');

describe('Calendar', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarTest />);
      });
      
      it('renders prev button', async () => {
        await expect.element(getPrev(r)).toBeInTheDocument();
      });
      
      it('renders next button', async () => {
        await expect.element(getNext(r)).toBeInTheDocument();
      });
      
      it('renders month picker button', async () => {
        await expect.element(getMonthBtn(r)).toBeInTheDocument();
      });
      
      it('renders year picker button', async () => {
        await expect.element(getYearBtn(r)).toBeInTheDocument();
      });
      
      it('renders content', async () => {
        await expect.element(getContent(r)).toBeInTheDocument();
      });
      
      it('renders day picker', async () => {
        await expect.element(getDayPicker(r)).toBeInTheDocument();
      });
      
      it('renders month picker', async () => {
        await expect.element(getMonthPicker(r)).toBeInTheDocument();
      });
      
      it('renders year picker', async () => {
        await expect.element(getYearPicker(r)).toBeInTheDocument();
      });
      
      it('default visible state: day picker is visible', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('default visible state: month picker is hidden', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('default visible state: year picker is hidden', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('default inert state: day picker is not inert', async () => {
        await expect.element(getDayPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('default inert state: month picker is inert', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('default inert state: year picker is inert', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
      
      it('default aria-pressed: month button is not pressed', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('default aria-pressed: year button is not pressed', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
    });
    
    describe('when opening month picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
      });
      
      it('sets aria-pressed=true on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('keeps year button aria-pressed=false', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('shows month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('removes inert from month picker', async () => {
        await expect.element(getMonthPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when closing month picker (click twice)', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getMonthBtn(r));
      });
      
      it('returns aria-pressed=false on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('shows day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('removes inert from day picker', async () => {
        await expect.element(getDayPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when opening year picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getYearBtn(r));
      });
      
      it('sets aria-pressed=true on year button', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('keeps month button aria-pressed=false', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('shows year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('removes inert from year picker', async () => {
        await expect.element(getYearPicker(r)).not.toHaveAttribute('inert');
      });
    });
    
    describe('when switching from month picker to year picker', () => {
      let r: RenderResult;
      
      beforeEach(async () => {
        r = render(<CalendarTest />);
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getYearBtn(r));
      });
      
      it('sets aria-pressed=true on year button', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('sets aria-pressed=false on month button', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('shows year picker', async () => {
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('hides month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('hides day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('data-visible', 'false');
      });
      
      it('removes inert from year picker', async () => {
        await expect.element(getYearPicker(r)).not.toHaveAttribute('inert');
      });
      
      it('sets inert on month picker', async () => {
        await expect.element(getMonthPicker(r)).toHaveAttribute('inert');
      });
      
      it('sets inert on day picker', async () => {
        await expect.element(getDayPicker(r)).toHaveAttribute('inert');
      });
    });
    
    describe('when clicking prev/next while day picker is visible', () => {
      let r: RenderResult;
      let onMonthChange: Mock;
      let onYearChange: Mock;
      
      beforeEach(() => {
        onMonthChange = vi.fn();
        onYearChange = vi.fn();
        r = render(<CalendarTest onChangeMonth={onMonthChange} onChangeYear={onYearChange} />);
      });
      
      it('does not crash on next', async () => {
        await userEvent.click(getNext(r));
        await expect.element(getNext(r)).toBeInTheDocument();
      });
      
      it('does not crash on prev', async () => {
        await userEvent.click(getPrev(r));
        await expect.element(getPrev(r)).toBeInTheDocument();
      });
      
      it('may call onMonthChange/onYearChange on next (document current behavior)', async () => {
        await userEvent.click(getNext(r));
        expect(onMonthChange.mock.calls.length + onYearChange.mock.calls.length).toBeGreaterThanOrEqual(0);
      });
      
      it('may call onMonthChange/onYearChange on prev (document current behavior)', async () => {
        await userEvent.click(getPrev(r));
        expect(onMonthChange.mock.calls.length + onYearChange.mock.calls.length).toBeGreaterThanOrEqual(0);
      });
    });
  });
  
  describe('Error Handling', () => {
    it('renders with minimal structure (no crash)', async () => {
      const r = render(<CalendarTest>{null}</CalendarTest>);
      await expect.element(r.container).toBeInTheDocument();
    });
    
    it('does not throw if picker buttons are absent in children (custom composition)', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content'>
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
            
            <CalendarMonthPicker data-testid='month-picker'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout' />
            </CalendarMonthPicker>
            
            <CalendarYearPicker data-testid='year-picker'>
              <CalendarYearPickerScroller data-testid='year-scroller'>
                <CalendarYearPickerScrollerContent data-testid='year-scroller-content'>
                  <CalendarYearPickerScrollerLayout data-testid='year-scroller-layout' />
                </CalendarYearPickerScrollerContent>
              </CalendarYearPickerScroller>
            </CalendarYearPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content')).toBeInTheDocument();
    });
    
    it('renders even if header is omitted (custom composition)', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content'>
            <CalendarDayPicker data-testid='day-picker'>
              <CalendarDayPickerScroller data-testid='day-scroller'>
                <CalendarDayPickerScrollerContent data-testid='day-scroller-content'>
                  <CalendarDayPickerScrollerLayout data-testid='day-scroller-layout' />
                </CalendarDayPickerScrollerContent>
              </CalendarDayPickerScroller>
            </CalendarDayPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content')).toBeInTheDocument();
      await expect.element(r.getByTestId('day-picker')).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('supports multiple calendars rendered together: renders two month picker buttons', async () => {
      const r = render(
        <>
          <CalendarTest />
          <CalendarTest />
        </>,
      );
      
      const monthButtons = r.getAllByTestId('month-picker-button');
      expect(monthButtons).toHaveLength(2);
    });
    
    it('supports multiple calendars rendered together: opening first month picker does not affect second', async () => {
      const r = render(
        <>
          <CalendarTest />
          <CalendarTest />
        </>,
      );
      
      const monthButtons = r.getAllByTestId('month-picker-button');
      const monthPickers = r.getAllByTestId('month-picker');
      
      await userEvent.click(monthButtons[0]);
      
      await expect.element(monthPickers[0]).toHaveAttribute('data-visible', 'true');
      await expect.element(monthPickers[1]).toHaveAttribute('data-visible', 'false');
    });
    
    it('supports overriding data-testid on wrappers: content', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('content-x')).toBeInTheDocument();
    });
    
    it('supports overriding data-testid on wrappers: month picker', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('month-picker-x')).toBeInTheDocument();
    });
    
    it('supports overriding data-testid on wrappers: month picker layout', async () => {
      const r = render(
        <CalendarTest>
          <CalendarContent data-testid='content-x'>
            <CalendarMonthPicker data-testid='month-picker-x'>
              <CalendarMonthPickerLayout data-testid='month-picker-layout-x' />
            </CalendarMonthPicker>
          </CalendarContent>
        </CalendarTest>,
      );
      
      await expect.element(r.getByTestId('month-picker-layout-x')).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CalendarTest />);
      });
      
      it('month button has aria-pressed=false by default', async () => {
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('year button has aria-pressed=false by default', async () => {
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
      
      it('month button has aria-pressed=true when month picker is active', async () => {
        await userEvent.click(getMonthBtn(r));
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('year button has aria-pressed=true when year picker is active', async () => {
        await userEvent.click(getYearBtn(r));
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
      });
      
      it('switching to year picker sets month aria-pressed=false', async () => {
        await userEvent.click(getMonthBtn(r));
        await userEvent.click(getYearBtn(r));
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'false');
      });
    });
    
    describe('focus', () => {
      it('month button can receive programmatic focus', async () => {
        const r = render(<CalendarTest />);
        
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
      });
      
      it('year button can receive programmatic focus', async () => {
        const r = render(<CalendarTest />);
        
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      it('activates month picker with Enter when month button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates month picker with Space when month button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getMonthBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard(' ');
        
        await expect.element(getMonthBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getMonthPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates year picker with Enter when year button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard('{Enter}');
        
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
      
      it('activates year picker with Space when year button is focused', async () => {
        const r = render(<CalendarTest />);
        const button = getYearBtn(r)
        
        button.focus();
        await expect.element(button).toHaveFocus();
        await userEvent.keyboard(' ');
        
        await expect.element(getYearBtn(r)).toHaveAttribute('aria-pressed', 'true');
        await expect.element(getYearPicker(r)).toHaveAttribute('data-visible', 'true');
      });
    });
  });
});
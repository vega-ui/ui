import { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent, type Locator } from 'vitest/browser';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Calendar } from '../Calendar';
import {
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekdays, CalendarWeekday,
  CalendarDay,
  CalendarWeeks,
  CalendarYear,
  CalendarYears,
} from '../components';
import { useCalendarContext, useCalendarDayContext } from '../contexts';
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';
import '../../../../tokens/src/index.css';

afterEach(cleanup);

const LOCALE = 'ar-EG';

const LabeledDay = () => {
  const { date } = useCalendarDayContext();
  const { locale, calendar } = useCalendarContext();

  if (date === undefined) return <CalendarDay />;

  return <CalendarDay aria-label={formatCalendarDate(calendar, date, locale, { dateStyle: 'full' })} />;
};

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

const RtlCalendar = (props: ComponentProps<typeof Calendar>) => (
  <div dir='rtl'>
    <Calendar locale={LOCALE} style={{ width: 320 }} {...props}>
      <CalendarHeader>
        <CalendarPrevButton data-testid='prev' aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='year' data-testid='year-button'>Year</CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton data-testid='next' aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays data-testid='day-picker'>
          <CalendarWeekdays data-testid='weekdays'>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <LabeledDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarYears data-testid='year-picker'>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  </div>
);

const getDay = (r: RenderResult, day: string) =>
  page.elementLocator(r.getByTestId('day-picker')).getByRole('gridcell', { name: formatCalendarDate(gregorianCalendar, day, LOCALE, { dateStyle: 'full' }), exact: true });

const getYear = (r: RenderResult, year: string) =>
  page.elementLocator(r.getByTestId('year-picker')).getByRole('gridcell', { name: formatCalendarDate(gregorianCalendar, year, LOCALE, { year: 'numeric' }), exact: true });

const getScroller = (r: RenderResult) =>
  r.getByTestId('day-picker').querySelector<HTMLElement>('[class*="scrollView"]')!;

const isPageVisible = (cell: Locator) => {
  const cellPage = cell.query()?.closest('[data-index]');
  const scroller = cellPage?.parentElement;
  if (!cellPage || !scroller) return false;

  const outer = scroller.getBoundingClientRect();
  const inner = cellPage.getBoundingClientRect();

  return inner.left >= outer.left - 1 && inner.right <= outer.right + 1;
};

describe('Calendar in a right-to-left context', () => {
  it('shows the visible month in view on mount', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);
    expect(getScroller(r).scrollLeft).toBeLessThan(0);
  });

  it('lays the week out from right to left', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);

    const week = getDay(r, '2026-03-11').element().closest('[role="row"]')!;
    const cells = Array.from(week.querySelectorAll<HTMLElement>('[role="gridcell"]'));
    const lefts = cells.map((cell) => cell.getBoundingClientRect().left);

    expect(lefts).toEqual([...lefts].sort((a, b) => b - a));

    const labels = Array.from(r.getByTestId('weekdays').children) as HTMLElement[];
    expect(labels[0].getBoundingClientRect().left).toBeGreaterThan(labels[labels.length - 1].getBoundingClientRect().left);
  });

  it('ArrowRight moves to the previous day and ArrowLeft to the next day', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' defaultValue='2026-03-10' />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);

    getDay(r, '2026-03-10').element().focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect.element(getDay(r, '2026-03-09')).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await expect.element(getDay(r, '2026-03-11')).toHaveFocus();
  });

  it('ArrowRight from the first day of the month moves to the previous month', async () => {
    const onChangeMonth = vi.fn();
    const r = render(<RtlCalendar defaultMonth='2026-03-01' defaultValue='2026-03-01' onChangeMonth={onChangeMonth} />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);
    await nextFrame();

    getDay(r, '2026-03-01').element().focus();
    await userEvent.keyboard('{ArrowRight}');

    await expect.element(getDay(r, '2026-02-28')).toHaveFocus();
    await expect.poll(() => onChangeMonth).toHaveBeenLastCalledWith('2026-02-01');
  });

  it('Next shows the next month on the left and Prev the previous month on the right', async () => {
    const onChangeMonth = vi.fn();
    const r = render(<RtlCalendar defaultMonth='2026-03-01' onChangeMonth={onChangeMonth} />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);
    await nextFrame();

    const april = getDay(r, '2026-04-15').element().closest('[data-index]')!;
    const march = getDay(r, '2026-03-15').element().closest('[data-index]')!;
    expect(april.getBoundingClientRect().left).toBeLessThan(march.getBoundingClientRect().left);

    await userEvent.click(r.getByTestId('next'));
    await expect.poll(() => onChangeMonth).toHaveBeenLastCalledWith('2026-04-01');
    await expect.poll(() => isPageVisible(getDay(r, '2026-04-15'))).toBe(true);

    await userEvent.click(r.getByTestId('prev'));
    await expect.poll(() => onChangeMonth).toHaveBeenLastCalledWith('2026-03-01');
    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);
  });

  it('swiping to the left shows the next month and to the right the previous month', async () => {
    const onChangeMonth = vi.fn();
    const r = render(<RtlCalendar defaultMonth='2026-03-01' onChangeMonth={onChangeMonth} />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-03-15'))).toBe(true);
    await nextFrame();

    const scroller = getScroller(r);

    scroller.scrollBy({ left: -scroller.clientWidth, behavior: 'instant' });
    await expect.poll(() => onChangeMonth).toHaveBeenLastCalledWith('2026-04-01');
    await nextFrame();

    scroller.scrollBy({ left: scroller.clientWidth, behavior: 'instant' });
    await expect.poll(() => onChangeMonth).toHaveBeenLastCalledWith('2026-03-01');
  });

  it('keeps reporting months while swiping past the rendered pages', async () => {
    const onChangeMonth = vi.fn();
    const r = render(<RtlCalendar defaultMonth='2026-01-01' onChangeMonth={onChangeMonth} />);

    await expect.poll(() => isPageVisible(getDay(r, '2026-01-15'))).toBe(true);
    await nextFrame();

    for (let step = 0; step < 5; step++) {
      const scroller = getScroller(r);
      scroller.scrollBy({ left: -scroller.clientWidth, behavior: 'instant' });
      await nextFrame();
    }

    await expect.poll(() => onChangeMonth.mock.calls.map(([month]) => month)).toEqual(['2026-02-01', '2026-03-01', '2026-04-01', '2026-05-01', '2026-06-01']);
    await expect.poll(() => isPageVisible(getDay(r, '2026-06-15'))).toBe(true);
  });

  it('Next shows the next page of years in the year view', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' defaultView='year' />);

    await expect.poll(() => isPageVisible(getYear(r, '2026-01-01'))).toBe(true);
    await nextFrame();

    await userEvent.click(r.getByTestId('next'));
    await expect.poll(() => isPageVisible(getYear(r, '2038-01-01'))).toBe(true);
  });

  it('mirrors the default chevrons', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' />);

    const prevIcon = r.getByTestId('prev').querySelector('svg')!;
    const nextIcon = r.getByTestId('next').querySelector('svg')!;

    expect(getComputedStyle(prevIcon).transform).toBe('matrix(-1, 0, 0, 1, 0, 0)');
    expect(getComputedStyle(nextIcon).transform).toBe('matrix(-1, 0, 0, 1, 0, 0)');
  });

  it('hides the Prev button towards the inline start', async () => {
    const r = render(<RtlCalendar defaultMonth='2026-03-01' min='2026-03-01' />);

    const prev = r.getByTestId('prev');

    await expect.element(prev).toHaveAttribute('data-visible', 'false');
    expect(new DOMMatrix(getComputedStyle(prev).transform).m41).toBeGreaterThan(0);
  });
});

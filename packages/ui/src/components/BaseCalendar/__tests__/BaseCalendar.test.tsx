import { ComponentProps } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseCalendar } from '../BaseCalendar';
import {
  BaseCalendarHeader,
  BaseCalendarNextButton,
  BaseCalendarPickerButton,
  BaseCalendarPrevButton,
  BaseCalendarWeekLabel,
  BaseCalendarWeekLabels,
} from '../components';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  formatMonth,
  getCurrentDate,
  getWeekDayNames,
} from '@vega-ui/utils';
import { Icon } from '../../Icon';
import { DayPicker, DayPickerScroller, DayPickerScrollerContent, DayPickerScrollerLayout } from '../../DayPicker';

const renderBaseCalendar = (props?: Partial<ComponentProps<typeof BaseCalendar>>) => {
  return render(
    <BaseCalendar {...props}>
      <BaseCalendarHeader>
        <BaseCalendarPrevButton aria-label='Previous month'>
          <Icon>
            <ChevronLeft />
          </Icon>
        </BaseCalendarPrevButton>
        <div style={{ display: 'flex' }}>
          <BaseCalendarPickerButton>
            {formatMonth(getCurrentDate().getMonth())}
          </BaseCalendarPickerButton>
          <BaseCalendarPickerButton>
            {getCurrentDate().getFullYear()}
          </BaseCalendarPickerButton>
        </div>
        <BaseCalendarNextButton aria-label='Next month'>
          <Icon>
            <ChevronRight />
          </Icon>
        </BaseCalendarNextButton>
      </BaseCalendarHeader>
      <div>
        <DayPicker>
          <BaseCalendarWeekLabels>
            {getWeekDayNames(navigator.language, 'short').map((name) => (
              <BaseCalendarWeekLabel key={name}>{name}</BaseCalendarWeekLabel>
            ))}
          </BaseCalendarWeekLabels>
          <DayPickerScroller>
            <DayPickerScrollerContent>
              <DayPickerScrollerLayout />
            </DayPickerScrollerContent>
          </DayPickerScroller>
        </DayPicker>
      </div>
    </BaseCalendar>,
  );
};

describe('BaseCalendar', () => {
  it('renders header controls and week labels', () => {
    renderBaseCalendar();
    
    // prev / next buttons from header
    expect(
      screen.getByRole('button', { name: /previous month/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next month/i }),
    ).toBeInTheDocument();
    
    // two picker buttons (month + year)
    const pickerButtons = screen.getAllByRole('button');
    expect(pickerButtons.length).toBeGreaterThanOrEqual(3);
    
    // week labels row and 7 column headers
    const headerRow = screen.getAllByRole('row');
    expect(headerRow[0]).toBeInTheDocument();
    
    const weekHeaders = screen.getAllByRole('columnheader');
    expect(weekHeaders.length).toBe(7);
  });
  
  it('applies compact attribute to the root container when compact is true', () => {
    const { container } = renderBaseCalendar({ compact: true });
    
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root).toHaveAttribute('data-compact', 'true');
  });
  
  it('does not set data-compact attribute by default', () => {
    const { container } = renderBaseCalendar();
    
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root?.getAttribute('data-compact')).toBeNull();
  });
  
  it('forwards standard div props to the root element', () => {
    const { container } = renderBaseCalendar({
      id: 'base-calendar-root',
      'aria-label': 'Base calendar',
    });
    
    const root = container.firstElementChild as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root).toHaveAttribute('id', 'base-calendar-root');
    expect(root).toHaveAttribute('aria-label', 'Base calendar');
  });
});

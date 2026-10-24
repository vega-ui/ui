import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarHeader } from './CalendarHeader';
import { CalendarPrevButton } from '../CalendarPrevButton';
import { Icon } from '../../../Icon';
import { CalendarViewButtonGroup } from '../CalendarViewButtonGroup';
import { CalendarViewButton } from '../CalendarViewButton';
import { CalendarNextButton } from '../CalendarNextButton';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const monthName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { month: 'long' });
const yearName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { year: 'numeric' });

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarHeader> = {
  title: 'Data/Calendar/CalendarHeader',
  component: CalendarHeader,
  args: {
    children: (
      <>
        <CalendarPrevButton>
          <Icon><ChevronLeft /></Icon>
        </CalendarPrevButton>
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'>
            {monthName('2026-02-01')}
          </CalendarViewButton>
          <CalendarViewButton view='year'>
            {yearName('2026-01-01')}
          </CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton>
          <Icon><ChevronRight /></Icon>
        </CalendarNextButton>
      </>
    )
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
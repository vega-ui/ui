import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarViewButton } from './CalendarViewButton';
import { Calendar } from '../../Calendar';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonths } from '../CalendarMonths';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarYears } from '../CalendarYears';
import { CalendarYear } from '../CalendarYear';

const meta: Meta<typeof CalendarViewButton> = {
  title: 'Data/Calendar/CalendarViewButton',
  component: CalendarViewButton,
  argTypes: {
    view: {
      control: 'radio',
      options: ['month', 'year'],
    },
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <CalendarHeader>
          <Story />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `view="month"` opens the months; pressing it again goes back to the days.
 * It is `aria-pressed` while its view is shown.
 */
export const Default: Story = {
  args: {
    view: 'month',
    children: <CalendarMonthLabel />,
  },
};

/**
 * `view="year"` opens the years.
 */
export const Year: Story = {
  args: {
    view: 'year',
    children: <CalendarYearLabel />,
  },
};

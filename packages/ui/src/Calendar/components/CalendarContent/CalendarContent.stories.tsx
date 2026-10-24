import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarContent } from './CalendarContent';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekdays } from '../CalendarWeekdays';
import { CalendarWeekday } from '../CalendarWeekday';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonths } from '../CalendarMonths';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarYears } from '../CalendarYears';
import { CalendarYear } from '../CalendarYear';

const meta: Meta<typeof CalendarContent> = {
  title: 'Data/Calendar/CalendarContent',
  component: CalendarContent,
  args: {
    children: (
      <>
        <CalendarDays>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
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
      </>
    ),
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <Story />
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Holds the day, month and year views; only the view of the `Calendar` is
 * shown.
 */
export const Default: Story = {
  args: {},
};

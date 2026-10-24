import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays } from './CalendarDays';
import { Calendar } from '../../Calendar';
import { CalendarWeekdays } from '../CalendarWeekdays';
import { CalendarWeekday } from '../CalendarWeekday';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';

const meta: Meta<typeof CalendarDays> = {
  title: 'Data/Calendar/CalendarDays',
  component: CalendarDays,
  args: {
    children: (
      <>
        <CalendarWeekdays>
          <CalendarWeekday />
        </CalendarWeekdays>
        <CalendarWeeks>
          <CalendarDay />
        </CalendarWeeks>
      </>
    ),
  },
  decorators(Story) {
    return (
      <Calendar>
        <Story />
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The day view: weekday names above the weeks of the visible month.
 * PageUp / PageDown move to the previous / next month.
 */
export const Default: Story = {
  args: {},
};

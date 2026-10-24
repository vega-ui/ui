import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeekday } from './CalendarWeekday';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekdays } from '../CalendarWeekdays';

const meta: Meta<typeof CalendarWeekday> = {
  title: 'Data/Calendar/CalendarWeekday',
  component: CalendarWeekday,
  decorators(Story) {
    return (
      <Calendar>
        <CalendarDays>
          <CalendarWeekdays>
            <Story />
          </CalendarWeekdays>
        </CalendarDays>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The weekday name, rendered once per column of `CalendarWeekdays`. A custom
 * template reads its weekday with `useCalendarWeekdayContext()`, see the
 * `Weekends` story of `CalendarWeekdays`.
 */
export const Default: Story = {
  args: {},
};

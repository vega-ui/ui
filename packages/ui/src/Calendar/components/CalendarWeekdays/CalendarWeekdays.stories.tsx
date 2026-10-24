import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeekdays } from './CalendarWeekdays';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekday } from '../CalendarWeekday';
import { useCalendarWeekdayContext } from '../../contexts';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarWeekdays> = {
  title: 'Data/Calendar/CalendarWeekdays',
  component: CalendarWeekdays,
  decorators(Story) {
    return (
      <Calendar>
        <CalendarDays>
          <Story />
        </CalendarDays>
      </Calendar>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <CalendarWeekday />,
  },
};

const WeekendWeekday = () => {
  const { weekday } = useCalendarWeekdayContext();
  const isWeekend = weekday === 0 || weekday === 6;
  
  return <CalendarWeekday style={{ opacity: isWeekend ? 0.5 : 1 }} />;
};

export const Weekends: Story = {
  args: {
    children: <WeekendWeekday />,
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonth } from './CalendarMonth';
import { Calendar } from '../../Calendar';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonths } from '../CalendarMonths';
import { useCalendarMonthContext } from '../../contexts';

const meta: Meta<typeof CalendarMonth> = {
  title: 'Data/Calendar/CalendarMonth',
  component: CalendarMonth,
  decorators(Story) {
    return (
      <Calendar defaultView='month'>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <Story />
          </CalendarMonths>
        </CalendarContent>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The month name, rendered once per cell of `CalendarMonths`.
 */
export const Default: Story = {
  args: {},
};

const NumberedMonth = () => {
  const { label, fields } = useCalendarMonthContext();

  return <CalendarMonth>{fields?.month}. {label}</CalendarMonth>;
};

/**
 * A custom template reads its month with `useCalendarMonthContext()` and
 * passes its own content to `CalendarMonth`. Here every month shows its
 * number in the calendar system.
 */
export const CustomContent: Story = {
  render: () => <NumberedMonth />,
};

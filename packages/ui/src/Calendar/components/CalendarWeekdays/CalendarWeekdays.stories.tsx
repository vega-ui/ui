import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeekdays } from './CalendarWeekdays';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekday } from '../CalendarWeekday';
import { useCalendarWeekdayContext } from '../../contexts';

const meta: Meta<typeof CalendarWeekdays> = {
  title: 'Data/Calendar/CalendarWeekdays',
  component: CalendarWeekdays,
  argTypes: {
    format: {
      control: 'radio',
      options: ['short', 'narrow', 'long'],
    },
  },
  decorators(Story, { parameters }) {
    return (
      <Calendar locale={parameters.locale}>
        <CalendarDays>
          <Story />
        </CalendarDays>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Short weekday names in the locale of the `Calendar`, starting on the first
 * day of its week.
 */
export const Default: Story = {
  args: {
    children: <CalendarWeekday />,
  },
};

/**
 * `format="narrow"` gives one letter per weekday, for narrow calendars.
 */
export const Narrow: Story = {
  args: {
    format: 'narrow',
    children: <CalendarWeekday />,
  },
};

/**
 * The first day of the week comes from the `locale` of the `Calendar`:
 * Saturday for `ar-EG`.
 */
export const FirstDayOfWeek: Story = {
  parameters: {
    locale: 'ar-EG',
  },
  args: {
    children: <CalendarWeekday />,
  },
};

const WeekendWeekday = () => {
  const { weekday } = useCalendarWeekdayContext();
  const isWeekend = weekday === 0 || weekday === 6;

  return <CalendarWeekday style={{ opacity: isWeekend ? 0.5 : 1 }} />;
};

/**
 * The template reads its weekday with `useCalendarWeekdayContext()`. Here
 * Saturday and Sunday are dimmed.
 */
export const Weekends: Story = {
  args: {
    children: <WeekendWeekday />,
  },
};

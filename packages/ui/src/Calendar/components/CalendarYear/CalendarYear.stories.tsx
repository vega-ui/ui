import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYear } from './CalendarYear';
import { Calendar } from '../../Calendar';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarYears } from '../CalendarYears';
import { useCalendarYearContext } from '../../contexts';

const meta: Meta<typeof CalendarYear> = {
  title: 'Data/Calendar/CalendarYear',
  component: CalendarYear,
  decorators(Story) {
    return (
      <Calendar defaultView='year'>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarYears>
            <Story />
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
 * The year, rendered once per cell of `CalendarYears`.
 */
export const Default: Story = {
  args: {},
};

const LeapYear = () => {
  const { label, fields } = useCalendarYearContext();

  if (!fields) return <CalendarYear />;

  const { year } = fields;
  const isLeap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  if (!isLeap) return <CalendarYear />;

  return <CalendarYear style={{ fontWeight: 700 }}>{label}*</CalendarYear>;
};

/**
 * A custom template reads its year with `useCalendarYearContext()` and
 * passes its own content or props to `CalendarYear`. Here Gregorian leap
 * years are marked.
 */
export const CustomContent: Story = {
  render: () => <LeapYear />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDay } from './CalendarDay';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { useCalendarDayContext } from '../../contexts';

const meta: Meta<typeof CalendarDay> = {
  title: 'Data/Calendar/CalendarDay',
  component: CalendarDay,
  decorators(Story) {
    return (
      <Calendar>
        <CalendarDays>
          <CalendarWeeks>
            <Story />
          </CalendarWeeks>
        </CalendarDays>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The day number, rendered once per cell of `CalendarWeeks`.
 */
export const Default: Story = {
  args: {},
};

const MarkedDay = () => {
  const { label, fields } = useCalendarDayContext();

  if (fields?.day !== 1 && fields?.day !== 15) return <CalendarDay />;

  return <CalendarDay style={{ fontWeight: 700, textDecoration: 'underline' }}>{label}</CalendarDay>;
};

/**
 * A custom template reads its day with `useCalendarDayContext()` and passes
 * its own content or props to `CalendarDay`. Here the 1st and the 15th are
 * marked.
 */
export const CustomContent: Story = {
  render: () => <MarkedDay />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeeks } from './CalendarWeeks';
import { Calendar } from '../../Calendar';
import { CalendarDays } from '../CalendarDays';
import { CalendarDay } from '../CalendarDay';

const meta: Meta<typeof CalendarWeeks> = {
  title: 'Data/Calendar/CalendarWeeks',
  component: CalendarWeeks,
  args: {
    children: <CalendarDay />,
  },
  argTypes: {
    format: {
      control: 'radio',
      options: ['numeric', '2-digit'],
    },
  },
  decorators(Story) {
    return (
      <Calendar>
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
 * The days of the visible month, week by week. Swipe or scroll to page
 * through months.
 */
export const Default: Story = {
  args: {},
};

/**
 * `includeOverflowDays` fills the empty cells with the days of the previous
 * and next months; they cannot be selected.
 */
export const IncludeOverflowDays: Story = {
  args: {
    includeOverflowDays: true,
  },
};

/**
 * `format="2-digit"` pads the day numbers.
 */
export const TwoDigit: Story = {
  args: {
    format: '2-digit',
  },
};

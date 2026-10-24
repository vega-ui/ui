import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarMonths } from './CalendarMonths';
import { Calendar } from '../../Calendar';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonth } from '../CalendarMonth';

const meta: Meta<typeof CalendarMonths> = {
  title: 'Data/Calendar/CalendarMonths',
  component: CalendarMonths,
  args: {
    children: <CalendarMonth />,
  },
  argTypes: {
    format: {
      control: 'radio',
      options: ['long', 'short', 'narrow', 'numeric', '2-digit'],
    },
  },
  decorators(Story) {
    return (
      <Calendar defaultView='month'>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <Story />
        </CalendarContent>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The month view: the months of the visible year. Picking a month shows its
 * days; Escape goes back to the days.
 */
export const Default: Story = {
  args: {},
};

/**
 * `cols` sets the number of columns of the grid.
 */
export const Columns: Story = {
  args: {
    cols: 4,
  },
};

/**
 * `format="short"` gives abbreviated month names.
 */
export const Short: Story = {
  args: {
    format: 'short',
  },
};

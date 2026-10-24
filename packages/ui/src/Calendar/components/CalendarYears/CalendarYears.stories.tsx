import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarYears } from './CalendarYears';
import { Calendar } from '../../Calendar';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarYear } from '../CalendarYear';

const meta: Meta<typeof CalendarYears> = {
  title: 'Data/Calendar/CalendarYears',
  component: CalendarYears,
  args: {
    children: <CalendarYear />,
  },
  argTypes: {
    format: {
      control: 'radio',
      options: ['numeric', '2-digit'],
    },
  },
  decorators(Story) {
    return (
      <Calendar defaultView='year'>
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
 * The year view: pages of years, swipeable. Picking a year shows the same
 * month of it; Escape goes back to the days.
 */
export const Default: Story = {
  args: {},
};

/**
 * `format="2-digit"` keeps the last two digits of every year.
 */
export const TwoDigit: Story = {
  args: {
    format: '2-digit',
  },
};

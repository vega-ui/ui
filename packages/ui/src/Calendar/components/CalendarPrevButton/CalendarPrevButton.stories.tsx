import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarPrevButton } from './CalendarPrevButton';
import { Calendar } from '../../Calendar';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';

const meta: Meta<typeof CalendarPrevButton> = {
  title: 'Data/Calendar/CalendarPrevButton',
  component: CalendarPrevButton,
  args: {
    'aria-label': 'Previous month',
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <CalendarHeader>
          <Story />
          <span>
            <CalendarMonthLabel /> <CalendarYearLabel />
          </span>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
        </CalendarContent>
      </Calendar>
    );
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Shows the previous month. It renders a chevron, mirrored in right-to-left
 * text, so it needs an `aria-label`.
 */
export const Default: Story = {
  args: {},
};

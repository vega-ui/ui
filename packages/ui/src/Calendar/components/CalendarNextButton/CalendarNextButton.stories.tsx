import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarNextButton } from './CalendarNextButton';
import { Calendar } from '../../Calendar';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';

const meta: Meta<typeof CalendarNextButton> = {
  title: 'Data/Calendar/CalendarNextButton',
  component: CalendarNextButton,
  args: {
    'aria-label': 'Next month',
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <CalendarHeader>
          <span>
            <CalendarMonthLabel /> <CalendarYearLabel />
          </span>
          <Story />
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
 * Shows the next month. It renders a chevron, mirrored in right-to-left
 * text, so it needs an `aria-label`.
 */
export const Default: Story = {
  args: {},
};

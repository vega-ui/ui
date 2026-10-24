import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarHeader } from './CalendarHeader';
import { Calendar } from '../../Calendar';
import { CalendarPrevButton } from '../CalendarPrevButton';
import { CalendarNextButton } from '../CalendarNextButton';
import { CalendarViewButtonGroup } from '../CalendarViewButtonGroup';
import { CalendarViewButton } from '../CalendarViewButton';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeekdays } from '../CalendarWeekdays';
import { CalendarWeekday } from '../CalendarWeekday';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonths } from '../CalendarMonths';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarYears } from '../CalendarYears';
import { CalendarYear } from '../CalendarYear';

const meta: Meta<typeof CalendarHeader> = {
  title: 'Data/Calendar/CalendarHeader',
  component: CalendarHeader,
  args: {
    children: (
      <>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'>
            <CalendarMonthLabel />
          </CalendarViewButton>
          <CalendarViewButton view='year'>
            <CalendarYearLabel />
          </CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </>
    ),
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <Story />
        <CalendarContent>
          <CalendarDays>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
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
 * The previous and next buttons around the month and year view buttons.
 */
export const Default: Story = {
  args: {},
};

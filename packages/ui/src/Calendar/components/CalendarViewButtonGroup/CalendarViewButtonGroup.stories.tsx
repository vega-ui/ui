import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarViewButtonGroup } from './CalendarViewButtonGroup';
import { Calendar } from '../../Calendar';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarViewButton } from '../CalendarViewButton';
import { CalendarMonthLabel } from '../CalendarMonthLabel';
import { CalendarYearLabel } from '../CalendarYearLabel';
import { CalendarContent } from '../CalendarContent';
import { CalendarDays } from '../CalendarDays';
import { CalendarWeeks } from '../CalendarWeeks';
import { CalendarDay } from '../CalendarDay';
import { CalendarMonths } from '../CalendarMonths';
import { CalendarMonth } from '../CalendarMonth';
import { CalendarYears } from '../CalendarYears';
import { CalendarYear } from '../CalendarYear';

const meta: Meta<typeof CalendarViewButtonGroup> = {
  title: 'Data/Calendar/CalendarViewButtonGroup',
  component: CalendarViewButtonGroup,
  args: {
    children: (
      <>
        <CalendarViewButton view='month'>
          <CalendarMonthLabel />
        </CalendarViewButton>
        <CalendarViewButton view='year'>
          <CalendarYearLabel />
        </CalendarViewButton>
      </>
    ),
  },
  decorators(Story) {
    return (
      <Calendar compact>
        <CalendarHeader>
          <Story />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
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
 * The month and year view buttons side by side.
 */
export const Default: Story = {
  args: {},
};

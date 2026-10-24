import type { Meta, StoryObj } from '@storybook/react-vite';

import { DateFieldCalendar } from './DateFieldCalendar';
import {
  CalendarContent,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarMonth,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekdays, CalendarWeekday,
  CalendarDay,
  CalendarWeeks,
  CalendarYearLabel,
  CalendarYear,
  CalendarYears,
} from '../../../Calendar';

const meta = {
  title: 'Form/Fields/DateField/DateFieldCalendar',
  component: DateFieldCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <CalendarHeader>
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
        </CalendarHeader>
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
      </>
    ),
  },
} satisfies Meta<typeof DateFieldCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

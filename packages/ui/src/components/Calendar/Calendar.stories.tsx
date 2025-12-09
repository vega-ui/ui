import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from './Calendar';
import {
  CalendarContent, CalendarDayPicker, CalendarDayPickerItem, CalendarDayPickerRow,
  CalendarDayPickerRowGroup, CalendarDayPickerScroller, CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout,
  CalendarHeader,
  CalendarMonthPicker, CalendarMonthPickerButton,
  CalendarMonthPickerLayout, CalendarNextButton, CalendarPickerButtonGroup, CalendarPrevButton,
  CalendarWeekLabel,
  CalendarWeekLabels, CalendarYearPicker,
  CalendarYearPickerButton, CalendarYearPickerScroller, CalendarYearPickerScrollerContent,
  CalendarYearPickerScrollerLayout
} from './components';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import {
  formatDay,
  formatMonth,
  formatYear,
  getCurrentDate,
  getFirstDayOfWeek,
  getNextDate,
  getWeekDayNames
} from '@vega-ui/utils';
import { useCalendarContext } from './hooks';
import { createDayPickerGrid } from '../DayPicker';
import { useIndexesSnapScrollerContext } from '../IndexedSnapScroller';
import { Badge } from '../Badge';
import { FC, Fragment } from 'react';

const MonthLabel = () => {
  const { month } = useCalendarContext()
  return formatMonth(month, navigator.language, 'long')
}

const YearLabel = () => {
  const { year } = useCalendarContext()
  return formatYear(year, navigator.language, 'numeric')
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Calendar> = {
  title: 'Data/Calendar/Calendar',
  component: Calendar,
  args: {
    children: (
      <>
        <CalendarHeader>
          <CalendarPrevButton>
            <Icon><ChevronLeft /></Icon>
          </CalendarPrevButton>
          <CalendarPickerButtonGroup>
            <CalendarMonthPickerButton>
              <MonthLabel />
            </CalendarMonthPickerButton>
            <CalendarYearPickerButton>
              <YearLabel />
            </CalendarYearPickerButton>
          </CalendarPickerButtonGroup>
          <CalendarNextButton>
            <Icon><ChevronRight /></Icon>
          </CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDayPicker>
            <CalendarWeekLabels>
              {getWeekDayNames(navigator.language, 'short').map((name) => (
                <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
              ))}
            </CalendarWeekLabels>
            <CalendarDayPickerScroller>
              <CalendarDayPickerScrollerContent>
                <CalendarDayPickerScrollerLayout />
              </CalendarDayPickerScrollerContent>
            </CalendarDayPickerScroller>
          </CalendarDayPicker>
          <CalendarMonthPicker>
            <CalendarMonthPickerLayout  />
          </CalendarMonthPicker>
          <CalendarYearPicker>
            <CalendarYearPickerScroller>
              <CalendarYearPickerScrollerContent>
                <CalendarYearPickerScrollerLayout />
              </CalendarYearPickerScrollerContent>
            </CalendarYearPickerScroller>
          </CalendarYearPicker>
        </CalendarContent>
      </>
    )
  },
  argTypes: {
    compact: {
      control: 'boolean'
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Selected: Story = {
  args: {
    selection: 'range',
    value: getCurrentDate()
  },
};

export const From: Story = {
  name: 'From 0/1/2020',
  args: {
    from: new Date(2020, 0, 1),
  },
};

export const To: Story = {
  name: 'To 0/1/2030',
  args: {
    to: new Date(2030, 0, 1),
  },
};

export const MultipleSelection: Story = {
  args: {
    selection: 'multiple',
  },
};

export const SelectedMultiple: Story = {
  args: {
    selection: 'multiple',
    value: [getNextDate(getCurrentDate(), -1), getNextDate(getCurrentDate(), 1)],
  },
};

export const RangeSelection: Story = {
  args: {
    selection: 'range',
  },
};

export const SelectedRange: Story = {
  args: {
    selection: 'range',
    value: [getNextDate(getCurrentDate(), -1), getNextDate(getCurrentDate(), 1)],
  },
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};

export const CompactSm: Story = {
  args: {
    size: 'sm',
    compact: true,
  },
};

export const CompactMd: Story = {
  args: {
    size: 'md',
    compact: true,
  },
};

const DateBadge: FC<{ day?: number }> = ({ day }) => {
  if (!day) return <Fragment />
  
  if (day % 6 === 0) return <Badge size='xs'>30$</Badge>
  if (day % 5 === 0) return <Badge variant='info' size='xs'>39$</Badge>
  if (day % 2 === 0) return <Badge variant='error' size='xs'>120$</Badge>
  if (day % 2 !== 0) return <Badge variant='warning' size='xs'>50$</Badge>
}

const CustomDatesGrid = () => {
  const { year, month } = useCalendarContext()
  const { index } = useIndexesSnapScrollerContext()
  
  return (
    <>
      {createDayPickerGrid({
        year,
        month,
        offset: index,
        includeOverflowDays: true,
        weekStartsOn: getFirstDayOfWeek(navigator.language as string)
      }).map(({ row, data }) => (
        <CalendarDayPickerRow row={row} key={row}>
          {data.map(({ col, day, year, month, inCurrentMonth }, index) => (
            <CalendarDayPickerItem
              style={{ display: 'flex', flexDirection: 'column', gap: 4, minHeight: 'min-content', paddingBlock: 12 }}
              disabled={!inCurrentMonth}
              excluded={!inCurrentMonth}
              col={col}
              value={day !== undefined ? new Date(year, month, day).getTime() : undefined}
              key={index}
            >
              <span>{day !== undefined ? formatDay(day, month, year, navigator.language, 'numeric') : undefined}</span>
              <DateBadge day={day} />
            </CalendarDayPickerItem>
          ))}
        </CalendarDayPickerRow>
      ))}
    </>
  )
}

export const CompactWithCustomDatesItems: Story = {
  args: {
    children: (
      <>
        <CalendarHeader>
          <CalendarPrevButton>
            <Icon><ChevronLeft /></Icon>
          </CalendarPrevButton>
          <CalendarPickerButtonGroup>
            <CalendarMonthPickerButton>
              <MonthLabel />
            </CalendarMonthPickerButton>
            <CalendarYearPickerButton>
              <YearLabel />
            </CalendarYearPickerButton>
          </CalendarPickerButtonGroup>
          <CalendarNextButton>
            <Icon><ChevronRight /></Icon>
          </CalendarNextButton>
        </CalendarHeader>
        <CalendarContent>
          <CalendarDayPicker>
            <CalendarWeekLabels>
              {getWeekDayNames(navigator.language, 'short').map((name) => (
                <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
              ))}
            </CalendarWeekLabels>
            <CalendarDayPickerScroller>
              <CalendarDayPickerScrollerContent>
                <CalendarDayPickerRowGroup>
                  <CustomDatesGrid />
                </CalendarDayPickerRowGroup>
              </CalendarDayPickerScrollerContent>
            </CalendarDayPickerScroller>
          </CalendarDayPicker>
          <CalendarMonthPicker>
            <CalendarMonthPickerLayout  />
          </CalendarMonthPicker>
          <CalendarYearPicker>
            <CalendarYearPickerScroller>
              <CalendarYearPickerScrollerContent>
                <CalendarYearPickerScrollerLayout />
              </CalendarYearPickerScrollerContent>
            </CalendarYearPickerScroller>
          </CalendarYearPicker>
        </CalendarContent>
      </>
    )
  },
};
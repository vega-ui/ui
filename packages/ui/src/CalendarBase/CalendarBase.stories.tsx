import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBase } from './CalendarBase';
import {
  CalendarBaseHeader, CalendarBasePickerButton,
  CalendarBaseControlIconButton, CalendarBaseWeekLabel, CalendarBaseWeekLabels
} from './components';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { getCurrentDate, formatISODate } from '@vega-ui/utils';
import { formatCalendarDate, gregorianCalendar, getWeekDayNames } from '@vega-ui/i18n';
import { DayPicker, DayPickerScroller, DayPickerScrollerContent, DayPickerCell, DayPickerScrollerLayout } from '../DayPicker';

const monthName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { month: 'long' });
const yearName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { year: 'numeric' });

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBase> = {
  title: 'Data/CalendarBase/CalendarBase',
  component: CalendarBase,
  args: {
    children: (
      <>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <div style={{ display: 'flex' }}>
            <CalendarBasePickerButton>
              {monthName(formatISODate(getCurrentDate()))}
            </CalendarBasePickerButton>
            <CalendarBasePickerButton>
              {yearName(formatISODate(getCurrentDate()))}
            </CalendarBasePickerButton>
          </div>
          <CalendarBaseControlIconButton>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <div>
          <DayPicker>
            <CalendarBaseWeekLabels>
              {getWeekDayNames(navigator.language, 'short').map((name) => (
                <CalendarBaseWeekLabel key={name}>{name}</CalendarBaseWeekLabel>
              ))}
            </CalendarBaseWeekLabels>
            <DayPickerScroller>
              <DayPickerScrollerContent>
                <DayPickerScrollerLayout>
                  <DayPickerCell />
                </DayPickerScrollerLayout>
              </DayPickerScrollerContent>
            </DayPickerScroller>
          </DayPicker>
        </div>
      </>
    )
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
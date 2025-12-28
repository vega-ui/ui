import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBase } from './CalendarBase';
import {
  CalendarBaseHeader, CalendarBaseNextButton, CalendarBasePickerButton,
  CalendarBasePrevButton, CalendarBaseWeekLabel, CalendarBaseWeekLabels
} from './components';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatMonth, getCurrentDate, getWeekDayNames } from '@vega-ui/utils';
import { DayPicker, DayPickerScroller, DayPickerScrollerContent, DayPickerScrollerLayout } from '../DayPicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBase> = {
  title: 'Data/CalendarBase/CalendarBase',
  component: CalendarBase,
  args: {
    children: (
      <>
        <CalendarBaseHeader>
          <CalendarBasePrevButton>
            <Icon><ChevronLeft /></Icon>
          </CalendarBasePrevButton>
          <div style={{ display: 'flex' }}>
            <CalendarBasePickerButton>
              {formatMonth(getCurrentDate().getMonth())}
            </CalendarBasePickerButton>
            <CalendarBasePickerButton>
              {formatMonth(getCurrentDate().getFullYear())}
            </CalendarBasePickerButton>
          </div>
          <CalendarBaseNextButton>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseNextButton>
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
                <DayPickerScrollerLayout />
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
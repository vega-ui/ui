import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseCalendar } from './BaseCalendar';
import {
  BaseCalendarHeader, BaseCalendarNextButton, BaseCalendarPickerButton,
  BaseCalendarPrevButton, BaseCalendarWeekLabel, BaseCalendarWeekLabels
} from './components';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatMonth, getCurrentDate, getWeekDayNames } from '@vega-ui/utils';
import { DayPicker, DayPickerScroller, DayPickerScrollerContent, DayPickerScrollerLayout } from '../DayPicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BaseCalendar> = {
  title: 'Data/BaseCalendar/BaseCalendar',
  component: BaseCalendar,
  args: {
    children: (
      <>
        <BaseCalendarHeader>
          <BaseCalendarPrevButton>
            <Icon><ChevronLeft /></Icon>
          </BaseCalendarPrevButton>
          <div style={{ display: 'flex' }}>
            <BaseCalendarPickerButton>
              {formatMonth(getCurrentDate().getMonth())}
            </BaseCalendarPickerButton>
            <BaseCalendarPickerButton>
              {formatMonth(getCurrentDate().getFullYear())}
            </BaseCalendarPickerButton>
          </div>
          <BaseCalendarNextButton>
            <Icon><ChevronRight /></Icon>
          </BaseCalendarNextButton>
        </BaseCalendarHeader>
        <div>
          <DayPicker>
            <BaseCalendarWeekLabels>
              {getWeekDayNames(navigator.language, 'short').map((name) => (
                <BaseCalendarWeekLabel key={name}>{name}</BaseCalendarWeekLabel>
              ))}
            </BaseCalendarWeekLabels>
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
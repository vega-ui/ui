import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarContent } from './CalendarContent.tsx';
import { CalendarWeekLabels } from '../CalendarWeekLabels';
import { CalendarWeekLabel } from '../CalendarWeekLabel';
import {
  CalendarDayPicker,
  CalendarDayPickerScroller,
  CalendarDayPickerScrollerContent,
  CalendarDayPickerScrollerLayout
} from '../CalendarDayPicker';
import { getWeekDayNames } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarContent> = {
  title: 'Data/Calendar/CalendarContent',
  component: CalendarContent,
  args: {
    children: (
      <>
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
      </>
    )
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
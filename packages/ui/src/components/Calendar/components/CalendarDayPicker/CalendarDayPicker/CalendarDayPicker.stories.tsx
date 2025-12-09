import type { Meta, StoryObj } from '@storybook/react-vite';
import { getWeekDayNames } from '@vega-ui/utils';
import { CalendarDayPickerScroller } from '../CalendarDayPickerScroller';
import { CalendarDayPickerScrollerContent } from '../CalendarDayPickerScrollerContent';
import { CalendarDayPickerScrollerLayout } from '../CalendarDayPickerScrollerLayout';
import { CalendarDayPicker } from './CalendarDayPicker.tsx';
import { CalendarWeekLabels } from '../../CalendarWeekLabels';
import { CalendarWeekLabel } from '../../CalendarWeekLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPicker> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPicker',
  component: CalendarDayPicker,
  args: {
    children: (
      <>
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
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScroller } from './DayPickerScroller.tsx';
import { DayPickerScrollerContent } from '../DayPickerScrollerContent';
import { DayPickerScrollerLayout } from '../DayPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerScroller> = {
  title: 'Data/Pickers/DayPicker/DayPickerScroller',
  component: DayPickerScroller,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DayPickerScrollerContent>
        <DayPickerScrollerLayout />
      </DayPickerScrollerContent>
    )
  },
};
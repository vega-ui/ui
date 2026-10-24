import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScroller } from './DayPickerScroller';
import { DayPickerScrollerContent } from '../DayPickerScrollerContent';
import { DayPickerScrollerLayout } from '../DayPickerScrollerLayout';
import { DayPickerCell } from '../DayPickerCell';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerScroller> = {
  title: 'Data/DayPicker/DayPickerScroller',
  component: DayPickerScroller,
  tags: ['autodocs'],
  argTypes: {
    start: {
      type: 'number',
    }
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DayPickerScrollerContent>
        <DayPickerScrollerLayout>
          <DayPickerCell />
        </DayPickerScrollerLayout>
      </DayPickerScrollerContent>
    )
  },
};

export const WithDefaultMonth: Story = {
  args: {
    defaultMonth: '2025-02-01',
    children: (
      <DayPickerScrollerContent>
        <DayPickerScrollerLayout>
          <DayPickerCell />
        </DayPickerScrollerLayout>
      </DayPickerScrollerContent>
    )
  },
};
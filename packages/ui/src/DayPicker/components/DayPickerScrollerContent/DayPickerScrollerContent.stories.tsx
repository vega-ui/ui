import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScrollerContent } from './DayPickerScrollerContent';
import { DayPickerScrollerLayout } from '../DayPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerScrollerContent> = {
  title: 'Data/Pickers/DayPicker/DayPickerScrollerContent',
  component: DayPickerScrollerContent,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DayPickerScrollerLayout />
    )
  },
};
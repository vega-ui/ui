import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerScrollerLayout } from './DayPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DayPickerScrollerLayout> = {
  title: 'Data/Pickers/DayPicker/DayPickerScrollerLayout',
  component: DayPickerScrollerLayout,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
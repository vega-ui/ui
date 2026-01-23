import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerLayout } from './MonthPickerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MonthPickerLayout> = {
  title: 'Data/MonthPicker/MonthPickerLayout',
  component: MonthPickerLayout,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerScrollerLayout } from './YearPickerScrollerLayout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerScrollerLayout> = {
  title: 'Data/YearPicker/YearPickerScrollerLayout',
  component: YearPickerScrollerLayout,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
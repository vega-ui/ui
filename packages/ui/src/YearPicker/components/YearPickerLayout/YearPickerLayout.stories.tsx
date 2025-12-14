import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerLayout } from './YearPickerLayout.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerLayout> = {
  title: 'Data/Pickers/YearPicker/YearPickerLayout',
  component: YearPickerLayout,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
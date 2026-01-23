import type { Meta, StoryObj } from '@storybook/react-vite';
import { YearPickerItem } from './YearPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof YearPickerItem> = {
  title: 'Data/YearPicker/YearPickerItem',
  component: YearPickerItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 2025
  },
};
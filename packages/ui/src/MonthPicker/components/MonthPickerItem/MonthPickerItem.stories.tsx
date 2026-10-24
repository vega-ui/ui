import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPickerItem } from './MonthPickerItem';

const meta: Meta<typeof MonthPickerItem> = {
  title: 'Data/MonthPicker/MonthPickerItem',
  component: MonthPickerItem,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'January',
  },
};

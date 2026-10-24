import type { Meta, StoryObj } from '@storybook/react-vite';
import { DayPickerItem } from './DayPickerItem';

const meta: Meta<typeof DayPickerItem> = {
  title: 'Data/DayPicker/DayPickerItem',
  component: DayPickerItem,
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
    children: 1,
  },
};

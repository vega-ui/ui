import type { Meta, StoryObj } from '@storybook/react-vite';
import { getCurrentDate } from '@vega-ui/utils';
import { CalendarDayPickerItem } from './CalendarDayPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarDayPickerItem> = {
  title: 'Data/Calendar/CalendarDayPicker/CalendarDayPickerItem',
  component: CalendarDayPickerItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: getCurrentDate().getDate()
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    range: {
      control: 'radio',
      options: ['start', 'between', 'end']
    }
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
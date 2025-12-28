import type { Meta, StoryObj } from '@storybook/react-vite';
import { getCurrentDate } from '@vega-ui/utils';
import { CalendarYearPickerItem } from './CalendarYearPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerItem> = {
  title: 'Data/Calendar/CalendarYearPicker/CalendarYearPickerItem',
  component: CalendarYearPickerItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: getCurrentDate().getFullYear()
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
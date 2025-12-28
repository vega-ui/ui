import type { Meta, StoryObj } from '@storybook/react-vite';
import { formatYear, getCurrentDate } from '@vega-ui/utils';
import { CalendarYearPickerButton } from './CalendarYearPickerButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarYearPickerButton> = {
  title: 'Data/Calendar/CalendarYearPickerButton',
  component: CalendarYearPickerButton,
  args: {
    children: formatYear(getCurrentDate().getFullYear())
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
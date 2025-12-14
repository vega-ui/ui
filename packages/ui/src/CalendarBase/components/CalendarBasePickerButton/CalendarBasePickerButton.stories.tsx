import type { Meta, StoryObj } from '@storybook/react-vite';
import { formatYear, getCurrentDate } from '@vega-ui/utils';
import { CalendarBasePickerButton } from './CalendarBasePickerButton.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBasePickerButton> = {
  title: 'Data/CalendarBase/CalendarBasePickerButton',
  component: CalendarBasePickerButton,
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
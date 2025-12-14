import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeekLabel } from './CalendarWeekLabel.tsx';
import { getWeekDayNames } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarWeekLabel> = {
  title: 'Data/Calendar/CalendarWeekLabel',
  component: CalendarWeekLabel,
  args: {
    children: getWeekDayNames()[0]
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
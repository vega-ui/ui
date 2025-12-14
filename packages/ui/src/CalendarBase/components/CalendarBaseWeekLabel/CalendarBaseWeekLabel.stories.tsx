import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseWeekLabel } from './CalendarBaseWeekLabel.tsx';
import { getWeekDayNames } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBaseWeekLabel> = {
  title: 'Data/CalendarBase/CalendarBaseWeekLabel',
  component: CalendarBaseWeekLabel,
  args: {
    children: getWeekDayNames(navigator.language, 'long', 0)[0]
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
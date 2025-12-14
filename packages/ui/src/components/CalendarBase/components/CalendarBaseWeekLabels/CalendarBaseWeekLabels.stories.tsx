import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseWeekLabels } from './CalendarBaseWeekLabels.tsx';
import { getWeekDayNames } from '@vega-ui/utils';
import { CalendarBaseWeekLabel } from '../CalendarBaseWeekLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBaseWeekLabels> = {
  title: 'Data/CalendarBase/CalendarBaseWeekLabels',
  component: CalendarBaseWeekLabels,
  args: {
    children: getWeekDayNames().map(label => <CalendarBaseWeekLabel key={label}>{label}</CalendarBaseWeekLabel>),
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
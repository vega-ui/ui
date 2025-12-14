import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarWeekLabels } from './CalendarWeekLabels.tsx';
import { getWeekDayNames } from '@vega-ui/utils';
import { CalendarWeekLabel } from '../CalendarWeekLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarWeekLabels> = {
  title: 'Data/Calendar/CalendarWeekLabels',
  component: CalendarWeekLabels,
  args: {
    children: getWeekDayNames().map(label => <CalendarWeekLabel key={label}>{label}</CalendarWeekLabel>),
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
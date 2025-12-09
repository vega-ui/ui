import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseCalendarWeekLabels } from './BaseCalendarWeekLabels';
import { getWeekDayNames } from '@vega-ui/utils';
import { BaseCalendarWeekLabel } from '../BaseCalendarWeekLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BaseCalendarWeekLabels> = {
  title: 'Data/BaseCalendar/BaseCalendarWeekLabels',
  component: BaseCalendarWeekLabels,
  args: {
    children: getWeekDayNames().map(label => <BaseCalendarWeekLabel key={label}>{label}</BaseCalendarWeekLabel>),
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
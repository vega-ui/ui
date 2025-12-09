import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseCalendarWeekLabel } from './BaseCalendarWeekLabel';
import { getWeekDayNames } from '@vega-ui/utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BaseCalendarWeekLabel> = {
  title: 'Data/BaseCalendar/BaseCalendarWeekLabel',
  component: BaseCalendarWeekLabel,
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
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseWeekLabels } from './CalendarBaseWeekLabels';
import { CalendarBaseWeekLabel } from '../CalendarBaseWeekLabel';
import { getWeekDayNames } from '@vega-ui/i18n';

const meta: Meta<typeof CalendarBaseWeekLabels> = {
  title: 'Data/CalendarBase/CalendarBaseWeekLabels',
  component: CalendarBaseWeekLabels,
  args: {
    children: getWeekDayNames('en-US', 'short').map((label) => (
      <CalendarBaseWeekLabel key={label}>{label}</CalendarBaseWeekLabel>
    )),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A row of seven weekday headers.
 */
export const Default: Story = {
  args: {},
};

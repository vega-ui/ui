import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseWeekLabel } from './CalendarBaseWeekLabel';
import { getWeekDayNames } from '@vega-ui/i18n';

const meta: Meta<typeof CalendarBaseWeekLabel> = {
  title: 'Data/CalendarBase/CalendarBaseWeekLabel',
  component: CalendarBaseWeekLabel,
  args: {
    children: getWeekDayNames('en-US', 'short')[0],
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A weekday column header in the text size of the surrounding `CalendarBase`.
 */
export const Default: Story = {
  args: {},
};

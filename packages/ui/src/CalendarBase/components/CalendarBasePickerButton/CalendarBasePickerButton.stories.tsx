import type { Meta, StoryObj } from '@storybook/react-vite';
import { getCurrentDate, formatISODate } from '@vega-ui/utils';
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarBasePickerButton } from './CalendarBasePickerButton';

const yearName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { year: 'numeric' });

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBasePickerButton> = {
  title: 'Data/CalendarBase/CalendarBasePickerButton',
  component: CalendarBasePickerButton,
  args: {
    children: yearName(formatISODate(getCurrentDate()))
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
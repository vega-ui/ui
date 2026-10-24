import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseHeader } from './CalendarBaseHeader';
import { CalendarBaseControlIconButton } from '../CalendarBaseControlIconButton';
import { Icon } from '../../../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarBasePickerButton } from '../CalendarBasePickerButton';

const monthName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { month: 'long' });
const yearName = (date: string) => formatCalendarDate(gregorianCalendar, date, navigator.language, { year: 'numeric' });

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBaseHeader> = {
  title: 'Data/CalendarBase/CalendarBaseHeader',
  component: CalendarBaseHeader,
  args: {
    children: (
      <>
        <CalendarBaseControlIconButton>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <CalendarBasePickerButton>
            {monthName('2026-02-01')}
          </CalendarBasePickerButton>
          <CalendarBasePickerButton>
            {yearName('2026-01-01')}
          </CalendarBasePickerButton>
        </div>
        <CalendarBaseControlIconButton>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </>
    )
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
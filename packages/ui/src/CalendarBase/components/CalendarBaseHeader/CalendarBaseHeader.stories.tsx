import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseHeader } from './CalendarBaseHeader';
import { CalendarBaseControlIconButton } from '../CalendarBaseControlIconButton';
import { Icon } from '../../../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatMonth, formatYear } from '@vega-ui/utils';
import { CalendarBasePickerButton } from '../CalendarBasePickerButton';

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
            {formatMonth(1)}
          </CalendarBasePickerButton>
          <CalendarBasePickerButton>
            {formatYear(2026)}
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
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseHeader } from './CalendarBaseHeader';
import { CalendarBaseControlIconButton } from '../CalendarBaseControlIconButton';
import { CalendarBasePickerButton } from '../CalendarBasePickerButton';
import { Icon } from '../../../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';

const meta: Meta<typeof CalendarBaseHeader> = {
  title: 'Data/CalendarBase/CalendarBaseHeader',
  component: CalendarBaseHeader,
  args: {
    children: (
      <>
        <CalendarBaseControlIconButton aria-label='Previous'>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton>March</CalendarBasePickerButton>
        <CalendarBaseControlIconButton aria-label='Next'>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Spreads its children along the top row of the calendar.
 */
export const Default: Story = {
  args: {},
};

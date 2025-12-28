import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarBaseHeader } from './CalendarBaseHeader';
import { CalendarBasePrevButton } from '../CalendarBasePrevButton';
import { Icon } from '../../../Icon';
import { CalendarBaseNextButton } from '../CalendarBaseNextButton';
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
        <CalendarBasePrevButton>
          <Icon><ChevronLeft /></Icon>
        </CalendarBasePrevButton>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <CalendarBasePickerButton>
            {formatMonth(1)}
          </CalendarBasePickerButton>
          <CalendarBasePickerButton>
            {formatYear(2026)}
          </CalendarBasePickerButton>
        </div>
        <CalendarBaseNextButton>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseNextButton>
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
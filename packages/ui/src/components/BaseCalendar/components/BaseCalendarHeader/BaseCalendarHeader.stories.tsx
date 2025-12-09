import type { Meta, StoryObj } from '@storybook/react-vite';
import { BaseCalendarHeader } from './BaseCalendarHeader';
import { BaseCalendarPrevButton } from '../BaseCalendarPrevButton';
import { Icon } from '../../../Icon';
import { BaseCalendarNextButton } from '../BaseCalendarNextButton';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { formatMonth, formatYear } from '@vega-ui/utils';
import { BaseCalendarPickerButton } from '../BaseCalendarPickerButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof BaseCalendarHeader> = {
  title: 'Data/BaseCalendar/BaseCalendarHeader',
  component: BaseCalendarHeader,
  args: {
    children: (
      <>
        <BaseCalendarPrevButton>
          <Icon><ChevronLeft /></Icon>
        </BaseCalendarPrevButton>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <BaseCalendarPickerButton>
            {formatMonth(1)}
          </BaseCalendarPickerButton>
          <BaseCalendarPickerButton>
            {formatYear(2026)}
          </BaseCalendarPickerButton>
        </div>
        <BaseCalendarNextButton>
          <Icon><ChevronRight /></Icon>
        </BaseCalendarNextButton>
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
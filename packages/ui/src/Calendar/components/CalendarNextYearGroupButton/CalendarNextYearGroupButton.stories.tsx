import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight } from '@vega-ui/icons';
import { CalendarNextYearGroupButton } from './CalendarNextYearGroupButton';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarNextYearGroupButton> = {
  title: 'Data/Calendar/CalendarNextYearGroupButton',
  component: CalendarNextYearGroupButton,
  args: {
    children: (<Icon><ChevronRight /></Icon>)
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
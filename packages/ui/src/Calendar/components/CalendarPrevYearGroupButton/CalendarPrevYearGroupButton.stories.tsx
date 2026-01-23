import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowLeft } from '@vega-ui/icons';
import { CalendarPrevYearGroupButton } from './CalendarPrevYearGroupButton';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarPrevYearGroupButton> = {
  title: 'Data/Calendar/CalendarPrevYearGroupButton',
  component: CalendarPrevYearGroupButton,
  args: {
    children: (<Icon><ArrowLeft /></Icon>)
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
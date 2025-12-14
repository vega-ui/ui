import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronRight } from '@vega-ui/icons';
import { CalendarPrevButton } from './CalendarPrevButton.tsx';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarPrevButton> = {
  title: 'Data/Calendar/CalendarPrevButton',
  component: CalendarPrevButton,
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
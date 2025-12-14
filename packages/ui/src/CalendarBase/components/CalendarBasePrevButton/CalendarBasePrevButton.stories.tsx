import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft } from '@vega-ui/icons';
import { CalendarBasePrevButton } from './CalendarBasePrevButton.tsx';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBasePrevButton> = {
  title: 'Data/CalendarBase/CalendarBasePrevButton',
  component: CalendarBasePrevButton,
  args: {
    children: (<Icon><ChevronLeft /></Icon>)
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
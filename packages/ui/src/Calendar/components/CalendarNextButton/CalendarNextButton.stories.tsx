import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft } from '@vega-ui/icons';
import { CalendarNextButton } from './CalendarNextButton';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarNextButton> = {
  title: 'Data/Calendar/CalendarNextButton',
  component: CalendarNextButton,
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
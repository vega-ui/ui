import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft } from '@vega-ui/icons';
import { CalendarBaseControlIconButton } from './CalendarBaseControlIconButton';
import { Icon } from '../../../Icon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CalendarBaseControlIconButton> = {
  title: 'Data/CalendarBase/CalendarBaseControlIconButton',
  component: CalendarBaseControlIconButton,
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
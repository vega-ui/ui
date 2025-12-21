import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogCloseButton } from './DialogCloseButton';
import { Icon } from '../../../Icon';
import { CircleX } from '@vega-ui/icons';

const meta = {
  title: 'Overlay/Dialog/DialogCloseButton',
  component: DialogCloseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DialogCloseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const CustomIcon: Story = {
  args: {
    children: <Icon><CircleX /></Icon>
  },
}
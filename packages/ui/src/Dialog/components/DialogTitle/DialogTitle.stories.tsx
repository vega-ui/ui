import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogTitle } from './DialogTitle';

const meta = {
  title: 'Overlay/Dialog/DialogTitle',
  component: DialogTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: 'Title'
  },
} satisfies Meta<typeof DialogTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
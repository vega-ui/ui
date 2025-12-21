import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogBackdrop } from './DialogBackdrop';

const meta = {
  title: 'Overlay/Dialog/DialogBackdrop',
  component: DialogBackdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DialogBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
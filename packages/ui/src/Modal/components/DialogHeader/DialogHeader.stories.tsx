import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogHeader } from './DialogHeader.tsx';

const meta = {
  title: 'Overlay/Dialog/DialogHeader',
  component: DialogHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof DialogHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Dialog',
    style: {
      minWidth: '200px'
    }
  },
}
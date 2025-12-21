import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogHeader } from './DialogHeader.tsx';
import { DialogTitle } from '../DialogTitle';
import { DialogCloseButton } from '../DialogCloseButton';

const meta = {
  title: 'Overlay/Dialog/DialogHeader',
  component: DialogHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: [
      <DialogTitle key={0}>Title</DialogTitle>,
      <DialogCloseButton key={1} />
    ]
  },
} satisfies Meta<typeof DialogHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    style: {
      minWidth: 300
    }
  },
}
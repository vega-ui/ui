import type { Meta, StoryObj } from '@storybook/react';
import { ModalHeader } from './ModalHeader.tsx';

const meta = {
  title: 'UI-Core/Modal/ModalHeader',
  component: ModalHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Modal',
    style: {
      minWidth: '200px'
    }
  },
}
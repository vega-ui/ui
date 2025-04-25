import type { Meta, StoryObj } from '@storybook/react';
import { PinFieldSeparator } from './PinFieldSeparator.tsx';

const meta = {
  title: 'UI-Core/PinField/PinFieldSeparator',
  component: PinFieldSeparator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PinFieldSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
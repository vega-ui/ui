import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetBackdrop } from './SheetBackdrop';

const meta = {
  title: 'Overlay/Sheet/SheetBackdrop',
  component: SheetBackdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
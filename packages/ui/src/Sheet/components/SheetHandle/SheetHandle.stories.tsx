import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetHandle } from './SheetHandle';

const meta = {
  title: 'Overlay/Sheet/SheetHandle',
  component: SheetHandle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetHandle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
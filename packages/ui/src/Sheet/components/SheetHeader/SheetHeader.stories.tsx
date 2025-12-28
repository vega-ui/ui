import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetHeader } from './SheetHeader';
import { Text } from '../../../Text';

const meta = {
  title: 'Overlay/Sheet/SheetHeader',
  component: SheetHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <Text size={4} fontWeight={500}>Title</Text>
    )
  },
}
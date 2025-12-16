import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroupCount } from './AvatarGroupCount';

const meta = {
  title: 'Display/AvatarGroup/AvatarGroupCount',
  component: AvatarGroupCount,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarGroupCount>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: '+7'
  }
}
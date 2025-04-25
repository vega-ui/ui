import type { Meta, StoryObj } from '@storybook/react';
import { AvatarFallback } from './AvatarFallback.tsx';
import { Avatar } from '../../Avatar.tsx';

const meta = {
  title: 'UI-Core/Avatar/AvatarFallback',
  component: AvatarFallback,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'JS',
  },
  render(props) {
    return (
      <Avatar>
        <AvatarFallback {...props} />
      </Avatar>
    )
  }
}
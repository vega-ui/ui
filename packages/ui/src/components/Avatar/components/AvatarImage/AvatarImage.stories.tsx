import type { Meta, StoryObj } from '@storybook/react';
import { AvatarImage } from './AvatarImage.tsx';
import { Avatar } from '../../Avatar.tsx';

const meta = {
  title: 'UI-Core/Avatar/AvatarImage',
  component: AvatarImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const url = 'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    src: url
  },
  render(props) {
    return (
      <Avatar>
        <AvatarImage {...props} />
      </Avatar>
    )
  }
}
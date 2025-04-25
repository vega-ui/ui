import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroupItem } from './AvatarGroupItem.tsx';
import { AvatarFallback, AvatarImage } from '../../../Avatar';

const meta = {
  title: 'UI-Core/AvatarGroup/AvatarGroupItem',
  component: AvatarGroupItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarGroupItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const url = 'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <AvatarGroupItem {...props}>
        <AvatarFallback>BC</AvatarFallback>,
        <AvatarImage src={url} />
      </AvatarGroupItem>
    )
  }
}
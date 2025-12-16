import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroupStackItem } from './AvatarGroupStackItem.tsx';
import { AvatarFallback, AvatarImage } from '../../../Avatar';

const meta = {
  title: 'Display/AvatarGroup/AvatarGroupStackItem',
  component: AvatarGroupStackItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarGroupStackItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const url = 'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render(props) {
    return (
      <AvatarGroupStackItem {...props}>
        <AvatarFallback>BC</AvatarFallback>,
        <AvatarImage src={url} />
      </AvatarGroupStackItem>
    )
  }
}
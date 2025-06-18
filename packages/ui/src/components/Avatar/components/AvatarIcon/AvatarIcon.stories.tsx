import type { Meta, StoryObj } from '@storybook/react';
import { AvatarIcon } from './AvatarIcon.tsx';
import { Avatar } from '../../Avatar.tsx';
import { HeartPlus } from '@vega-ui/icons';

const meta = {
  title: 'Display/Avatar/AvatarIcon',
  component: AvatarIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AvatarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <HeartPlus />
  },
  render(props) {
    return (
      <Avatar>
        <AvatarIcon {...props} />
      </Avatar>
    )
  }
}
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroupPopoverTriggerIcon } from './AvatarGroupPopoverTriggerIcon';
import { AvatarGroupPopoverTrigger } from '../AvatarGroupPopoverTrigger';
import { AvatarGroupPopover } from '../AvatarGroupPopover';
import { ArrowDown } from '@vega-ui/icons';

const meta = {
  title: 'Display/AvatarGroup/AvatarGroupPopoverTriggerIcon',
  component: AvatarGroupPopoverTriggerIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <AvatarGroupPopover>
        <AvatarGroupPopoverTrigger>
          <Story />
        </AvatarGroupPopoverTrigger>
      </AvatarGroupPopover>
    )
  }
} satisfies Meta<typeof AvatarGroupPopoverTriggerIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}

export const Custom: Story = {
  args: {
    children: <ArrowDown />
  }
}
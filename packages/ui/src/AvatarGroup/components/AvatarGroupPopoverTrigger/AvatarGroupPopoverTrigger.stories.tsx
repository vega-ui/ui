import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroupPopoverTrigger } from './AvatarGroupPopoverTrigger';
import { AvatarGroupPopover } from '../AvatarGroupPopover';
import { AvatarGroupPopoverTriggerIcon } from '../AvatarGroupPopoverTriggerIcon';
import { AvatarGroupCount } from '../AvatarGroupCount';
import { ArrowDown } from '@vega-ui/icons';

const meta = {
  title: 'Display/AvatarGroup/AvatarGroupPopoverTrigger',
  component: AvatarGroupPopoverTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <AvatarGroupPopover>
        <Story />
      </AvatarGroupPopover>
    )
  }
} satisfies Meta<typeof AvatarGroupPopoverTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <AvatarGroupCount>+7</AvatarGroupCount>,
      <AvatarGroupPopoverTriggerIcon />
    ]
  }
}

export const WithCustomIcon: Story = {
  args: {
    children: [
      <AvatarGroupCount>+7</AvatarGroupCount>,
      <AvatarGroupPopoverTriggerIcon>
        <ArrowDown />
      </AvatarGroupPopoverTriggerIcon>
    ]
  }
}

export const WithCustomText: Story = {
  args: {
    children: [
      <AvatarGroupCount>Show more (100+)</AvatarGroupCount>,
      <AvatarGroupPopoverTriggerIcon>
        <ArrowDown />
      </AvatarGroupPopoverTriggerIcon>
    ]
  }
}
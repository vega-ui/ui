import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from './AvatarGroup.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '../Avatar';
import {
  AvatarGroupCount,
  AvatarGroupPopover, AvatarGroupPopoverContent,
  AvatarGroupPopoverTrigger, AvatarGroupPopoverTriggerIcon,
  AvatarGroupStack,
  AvatarGroupStackItem
} from './components';

const meta = {
  title: 'Display/AvatarGroup/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4176&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' }
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' }
    }
  },
  args: {},
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = [
  'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'BC',
  'LA',
  'https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=2967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=3647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1636041246170-9278569b9c36?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'AK',
  'https://images.unsplash.com/photo-1689193505855-4728db981696?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1603771550805-abcf98e420e7?q=80&w=3652&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=3315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: avatars.map((avatar, index) => (
      <AvatarGroupStackItem key={index}>
        <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
        {avatar.startsWith('http') && <AvatarImage src={avatar} />}
      </AvatarGroupStackItem>
    ))
  },
};

export const Limit: Story = {
  args: {
    children: [
      <AvatarGroupStack key={0}>
        {avatars.map((avatar, index) => (
          <AvatarGroupStackItem key={index}>
            <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
            {avatar.startsWith('http') && <AvatarImage src={avatar} />}
          </AvatarGroupStackItem>
        ))}
      </AvatarGroupStack>,
      <AvatarGroupCount key={1}>+3</AvatarGroupCount>
    ]
  },
};

export const WithPopover: Story = {
  args: {
    children: [
      <AvatarGroupStack key={0}>
        {avatars.slice(0, 4).map((avatar, index) => (
          <AvatarGroupStackItem key={index}>
            <AvatarFallback>{avatar.length === 2 ? avatar : 'BC'}</AvatarFallback>
            {avatar.startsWith('http') && <AvatarImage src={avatar} />}
          </AvatarGroupStackItem>
        ))}
      </AvatarGroupStack>,
      <AvatarGroupPopover>
        <AvatarGroupPopoverTrigger>
          <AvatarGroupCount key={1}>+7</AvatarGroupCount>
          <AvatarGroupPopoverTriggerIcon />
        </AvatarGroupPopoverTrigger>
        <AvatarGroupPopoverContent>
          {avatars.slice(4).map((src, index) => (
            <Avatar key={index}>
              <AvatarImage src={src} />
            </Avatar>
          ))}
        </AvatarGroupPopoverContent>
      </AvatarGroupPopover>
    ]
  },
};
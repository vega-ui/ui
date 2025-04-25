import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar.tsx';
import { AvatarFallback, AvatarIcon, AvatarImage } from './components';

const meta = {
  title: 'UI-Core/Avatar/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
const variants = ['primary', 'secondary'] as const;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      <AvatarFallback key={0}>BC</AvatarFallback>,
      <AvatarImage key={1} src={'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
    ]
  },
};

export const Sizes: Story = {
  render(...props) {
    return (
      <div style={{display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center'}}>
        {sizes.map((size) => (
          <Avatar {...props} size={size} key={size}>
            <AvatarFallback key={0}>BC</AvatarFallback>
            <AvatarImage key={1}
                         src={'https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}/>
          </Avatar>
        ))}
      </div>
    )
  }
};

export const Initials: Story = {
  render(...props) {
    return (
      <div style={{display: 'flex', gap: '24px', flexDirection: 'column'}}>
        {variants.map((variant) => (
          <div key={variant} style={{display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center'}}>
            {sizes.map((size) => (
              <Avatar {...props} variant={variant} size={size} key={size}>
                <AvatarFallback key={0}>BC</AvatarFallback>
              </Avatar>
            ))}
          </div>
        ))
        }
      </div>
    )
  }
};

export const WithIcon: Story = {
  render(...props) {
    return (
      <div style={{display: 'flex', gap: '24px', flexDirection: 'column'}}>
        {variants.map((variant) => (
          <div key={variant} style={{display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center'}}>
            {sizes.map((size) => (
              <Avatar {...props} variant={variant} size={size} key={size}>
                <AvatarIcon name='support' />
              </Avatar>
            ))}
          </div>
        ))
        }
      </div>
    )
  }
};
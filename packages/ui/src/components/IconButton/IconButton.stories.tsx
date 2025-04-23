import type { Meta, StoryObj } from '@storybook/react';

import { IconButton, IconButtonProps } from './IconButton.tsx';

const meta = {
  title: 'UI-Core/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: IconButtonProps['variant'][] = ['primary', 'secondary']
const appearances: IconButtonProps['appearance'][] = ['fill', 'outline', 'ghost', 'transparent']
const sizes: IconButtonProps['size'][] = ['small', 'medium', 'large']

export const Primary: Story = {
  args: {
    name: 'globe'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    name: 'globe'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'globe'
  }
};

export const AsChild: Story = {
  render(...props) {
    return (
      <IconButton {...props} asChild name='support'>
        <a href='#' />
      </IconButton>
    )
  }
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {variants.map(variant => (
        <div key={variant}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${sizes.length}, 1fr)`,
              gap: '12px',
            }}
          >
            {appearances.map(appearance =>
              sizes.map(size => (
                <IconButton
                  key={`${variant}-${appearance}-${size}`}
                  variant={variant}
                  appearance={appearance}
                  size={size}
                  name='support'
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${sizes.length}, auto)`,
        gap: '16px',
        alignItems: 'center',
      }}
    >
      {sizes.map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton variant='primary' appearance='fill' size={size} name='support' />
        </div>
      ))}
    </div>
  ),
}
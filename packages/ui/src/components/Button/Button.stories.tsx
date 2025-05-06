import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button.tsx';

const meta = {
  title: 'UI-Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4826&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: ButtonProps['variant'][] = ['primary', 'secondary']
const appearances: ButtonProps['appearance'][] = ['fill', 'outline', 'ghost', 'transparent']
const sizes: ButtonProps['size'][] = ['small', 'medium', 'large']

export const Primary: Story = {
  args: {
    children: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Button'
  }
}

export const AsChild: Story = {
  render(...props) {
    return (
      <Button {...props} asChild>
        <a href='#'>Button</a>
      </Button>
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
                <Button
                  key={`${variant}-${appearance}-${size}`}
                  variant={variant}
                  appearance={appearance}
                  size={size}
                >
                  {`${appearance} / ${size}`}
                </Button>
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
          <Button variant='primary' appearance='fill' size={size}>
            button / {size}
          </Button>
        </div>
      ))}
    </div>
  ),
}
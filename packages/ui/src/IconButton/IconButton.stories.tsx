import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton, IconButtonProps } from './IconButton';
import { GlobeIcon, Heart, MinusIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-5550&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary']
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'outline', 'ghost', 'transparent']
    }
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: IconButtonProps['variant'][] = ['primary', 'secondary']
const appearances: IconButtonProps['appearance'][] = ['fill', 'outline', 'ghost', 'transparent']
const sizes: IconButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']

export const Primary: Story = {
  args: {
    children: <Icon><GlobeIcon /></Icon>
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: <Icon><MinusIcon /></Icon>
  }
};

export const Sizes: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {sizes.map((size) => <IconButton size={size} {...props}><Icon><GlobeIcon /></Icon></IconButton>)}
      </div>
    )
  }
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'secondary',
    appearance: 'ghost',
    children: (
      <Icon>
        <svg stroke='var(--color-red-accent-500)' fill='var(--color-red-accent-500)' stroke-width='0' viewBox='0 0 512 512'
             xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'></path>
        </svg>
      </Icon>
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: <Icon><GlobeIcon/></Icon>
  }
};

export const AsChild: Story = {
  render(...props) {
    return (
      <IconButton {...props} asChild>
        <a href='#'>
          <GlobeIcon />
        </a>
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
                >
                  <Icon><GlobeIcon /></Icon>
                </IconButton>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
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
          <IconButton variant='primary' appearance='fill' size={size}>
            <Icon><Heart /></Icon>
          </IconButton>
        </div>
      ))}
    </div>
  ),
}
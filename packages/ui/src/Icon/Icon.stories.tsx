import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, IconProps } from './Icon';
import { Server } from '@vega-ui/icons';

const sizes: IconProps['size'][] = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Display/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    strokeWidth: {
      control: 'number',
    },
  },
  args: {
    children: <Server />,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {sizes.map((size) => (
        <Icon key={size} size={size}>
          <Server />
        </Icon>
      ))}
    </div>
  ),
};

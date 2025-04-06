import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeProps } from './Badge.tsx';

const variants: Exclude<BadgeProps['variant'], undefined>[] = ['info', 'error', 'success', 'warning']
const appearance: BadgeProps['appearance'][] = ['ghost', 'outline', 'fill']
const sizes: BadgeProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl']

const meta = {
  title: 'UI-Core/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const All: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, min-content)', gridAutoFlow: 'row', alignItems: 'center', gap: '24px' }}>
        {variants.map((variant) => (
          appearance.map((app) => (
            sizes.map((size) => (
              <Badge key={size + variant + app} size={size} appearance={app} variant={variant}>Badge</Badge>
            ))
          ))
        ))}
      </div>
    )
  }
};

export const Sizes: Story = {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px' }}>
        {sizes.map((size) => (
          <Badge size={size} key={size}>Badge</Badge>
        ))}
      </div>
    )
  }
};

export const Variants: Story = {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variants.map((variant) => (
          <Badge title={`I'm a ${variant} variant`} variant={variant}>Badge</Badge>
        ))}
      </div>
    )
  }
};

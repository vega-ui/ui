import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card, CardProps } from './Card.tsx';
import { Text } from '../Text';

const sizes: CardProps['size'][] = ['small', 'medium', 'large']
const appearance: CardProps['appearance'][] = ['outline', 'transparent']

const meta = {
  title: 'UI-Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-595&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: (
      <Text>I'm a card!</Text>
    ),
  },
};

export const AllVariants: Story = {
  args: {
    children: (
      <Text>I'm a card!</Text>
    ),
  },
  render() {
    return (
      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: `repeat(${sizes.length}, 1fr)`, alignItems: 'center' }}>
        {appearance.map((app) => (
          sizes.map((size) => (
            <Card appearance={app} size={size}>
              <Text>I'm a card!</Text>
            </Card>
          ))
        ))}
      </div>
    )
  }
}

export const Sizes: Story = {
  args: {
    children: (
      <Text>I'm a card!</Text>
    ),
  },
  render() {
    return (
      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'center' }}>
        {sizes.map((size) => (
          <Card size={size}>
            <Text>I'm a card!</Text>
          </Card>
        ))}
      </div>
    )
  }
};

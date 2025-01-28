import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from './Card.tsx';
import { Text } from '../Text';

const sizes = ['small', 'medium', 'large'] as const

const meta = {
  title: 'UI-Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
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

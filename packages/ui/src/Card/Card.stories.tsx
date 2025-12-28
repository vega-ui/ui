import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Card } from './Card';
import { Text } from '../Text';
import { CardAppearance, CardSize } from './types';

const sizes: CardSize[] = ['sm', 'md', 'lg']
const appearance: CardAppearance[] = ['outline', 'transparent']

const meta = {
  title: 'Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-595&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    appearance: {
      control: 'radio',
      options: ['outline', 'transparent'],
    },
  },
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

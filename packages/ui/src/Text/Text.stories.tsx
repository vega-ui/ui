import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text, TextProps } from './Text';

const meta = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1470&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: TextProps['size'][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sizes.map((size) => (
        <Text key={size} {...args} size={size}>{`${size}: ${args.children}`}</Text>
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';
import { HeadingSize } from './types';

const sizes: HeadingSize[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1521&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'radio',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    fontWeight: {
      control: 'radio',
      options: [400, 500, 600, 700, 900],
    },
  },
  args: {
    children: 'Heading',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {sizes.map((size) => (
        <Heading key={size} as='h2' size={size}>{`Heading / ${size}`}</Heading>
      ))}
    </div>
  ),
};

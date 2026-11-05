import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner, SpinnerProps } from './Spinner';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2433&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    'aria-label': 'Loading',
    size: 7,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: SpinnerProps['variant'][] = ['primary', 'secondary'];
const sizes: SpinnerProps['size'][] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {variants.map((variant) => sizes.map((size) => (
        <Spinner key={`${variant}-${size}`} variant={variant} size={size} aria-label={`${variant} / ${size}`} />
      )))}
    </div>
  ),
};

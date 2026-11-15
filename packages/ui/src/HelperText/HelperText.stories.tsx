import type { Meta, StoryObj } from '@storybook/react-vite';

import { HelperText } from './HelperText';
import { HelperTextSize } from './types';

const sizes: HelperTextSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Form/Layout/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4369&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    invalid: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Required',
  },
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {[false, true].map((invalid) => sizes.map((size) => (
        <HelperText key={`${invalid}-${size}`} size={size} invalid={invalid}>
          {`${size}${invalid ? ' / invalid' : ''}`}
        </HelperText>
      )))}
    </div>
  ),
};

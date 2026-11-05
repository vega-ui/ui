import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonProps } from './Button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4826&t=2RYEGgF9z3n5SpP5-4',
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
      options: ['primary', 'secondary'],
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'outline', 'ghost', 'transparent'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: ButtonProps['variant'][] = ['primary', 'secondary'];
const appearances: ButtonProps['appearance'][] = ['fill', 'outline', 'ghost', 'transparent'];
const sizes: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const rows = variants.flatMap((variant) => appearances.flatMap((appearance) => [false, true].map((disabled) => ({ variant, appearance, disabled }))));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => (
        <Button key={`${row.variant}-${row.appearance}-${row.disabled}-${size}`} {...row} size={size}>
          {`${row.variant} / ${row.appearance}${row.disabled ? ' / disabled' : ''} / ${size}`}
        </Button>
      )))}
    </div>
  ),
};

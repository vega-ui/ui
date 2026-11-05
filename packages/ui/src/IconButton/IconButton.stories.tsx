import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconButton, IconButtonProps } from './IconButton';
import { GlobeIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-5550&t=2RYEGgF9z3n5SpP5-4',
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
    'aria-label': {
      control: 'text',
    },
  },
  args: {
    'aria-label': 'Change language',
    children: <Icon><GlobeIcon /></Icon>,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: IconButtonProps['variant'][] = ['primary', 'secondary'];
const appearances: IconButtonProps['appearance'][] = ['fill', 'outline', 'ghost', 'transparent'];
const sizes: IconButtonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const rows = variants.flatMap((variant) => appearances.flatMap((appearance) => [false, true].map((disabled) => ({ variant, appearance, disabled }))));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => (
        <IconButton
          key={`${row.variant}-${row.appearance}-${row.disabled}-${size}`}
          {...row}
          size={size}
          aria-label={`${row.variant} / ${row.appearance}${row.disabled ? ' / disabled' : ''} / ${size}`}
        >
          <Icon><GlobeIcon /></Icon>
        </IconButton>
      )))}
    </div>
  ),
};

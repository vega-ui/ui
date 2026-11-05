import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio, RadioProps } from './Radio';

const meta = {
  title: 'Form/Selectors/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=2110-5896&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    'aria-label': 'Radio',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: RadioProps['variant'][] = ['primary', 'secondary'];
const sizes: RadioProps['size'][] = ['sm', 'md', 'lg'];
const rows = variants.flatMap((variant) => [false, true].flatMap((checked) => [false, true].map((disabled) => ({ variant, checked, disabled }))));

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => {
        const name = `${row.variant}${row.checked ? ' / checked' : ''}${row.disabled ? ' / disabled' : ''} / ${size}`;

        return (
          <Radio
            key={name}
            aria-label={name}
            variant={row.variant}
            size={size}
            defaultChecked={row.checked}
            disabled={row.disabled}
          />
        );
      }))}
    </div>
  ),
};

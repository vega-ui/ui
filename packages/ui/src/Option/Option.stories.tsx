import type { Meta, StoryObj } from '@storybook/react-vite';

import { Option, OptionProps } from './Option';

const meta = {
  title: 'Form/Selectors/Option',
  component: Option,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1720&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div role='listbox' aria-label='Options'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    selected: {
      control: 'boolean',
    },
    active: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    children: 'Option',
  },
} satisfies Meta<typeof Option>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: OptionProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const rows = [false, true].flatMap((selected) => [false, true].flatMap((active) => [false, true].map((disabled) => ({ selected, active, disabled }))));

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => {
        const label = `${size}${row.selected ? ' / selected' : ''}${row.active ? ' / active' : ''}${row.disabled ? ' / disabled' : ''}`;

        return (
          <Option key={label} {...row} size={size}>
            {label}
          </Option>
        );
      }))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberField, NumberFieldProps } from './NumberField';
import { NumberFieldDecrementButton, NumberFieldIncrementButton, NumberFieldInput } from './components';

const meta = {
  title: 'Form/Fields/NumberField',
  component: NumberField,
  subcomponents: {
    NumberFieldInput,
    NumberFieldDecrementButton,
    NumberFieldIncrementButton,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4515&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {},
  render: (args) => (
    <NumberField {...args}>
      <NumberFieldDecrementButton aria-label='Decrease' />
      <NumberFieldInput aria-label='Quantity' placeholder='0' />
      <NumberFieldIncrementButton aria-label='Increase' />
    </NumberField>
  ),
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: NumberFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];
const states = [
  { label: 'default', disabled: false, error: false },
  { label: 'disabled', disabled: true, error: false },
  { label: 'error', disabled: false, error: true },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => states.map((state) => (
        <NumberField key={`${size}-${state.label}`} size={size} disabled={state.disabled} error={state.error}>
          <NumberFieldDecrementButton aria-label='Decrease' />
          <NumberFieldInput aria-label='Quantity' placeholder={`${size} / ${state.label}`} />
          <NumberFieldIncrementButton aria-label='Increase' />
        </NumberField>
      )))}
    </div>
  ),
};

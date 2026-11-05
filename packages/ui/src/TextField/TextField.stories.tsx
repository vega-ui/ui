import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField, TextFieldProps } from './TextField';
import { TextFieldInput } from './components';

const sizes: TextFieldProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta = {
  title: 'Form/Fields/TextField',
  component: TextField,
  subcomponents: {
    TextFieldInput,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1782&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: sizes },
    error: { control: 'boolean' },
  },
  args: {},
  render: (args) => (
    <TextField {...args}>
      <TextFieldInput aria-label='Text' placeholder='Type something…' />
    </TextField>
  ),
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

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
        <TextField key={`${size}-${state.label}`} size={size} error={state.error}>
          <TextFieldInput aria-label='Text' disabled={state.disabled} placeholder={`${size} / ${state.label}`} />
        </TextField>
      )))}
    </div>
  ),
};

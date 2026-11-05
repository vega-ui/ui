import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea, TextAreaProps } from './TextArea';

const meta = {
  title: 'Form/Fields/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4713&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    'aria-label': 'Description',
    placeholder: 'Describe the issue',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: TextAreaProps['size'][] = ['sm', 'md', 'lg'];
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
        <TextArea
          key={`${size}-${state.label}`}
          aria-label='Description'
          size={size}
          disabled={state.disabled}
          error={state.error}
          placeholder={`${size} / ${state.label}`}
        />
      )))}
    </div>
  ),
};

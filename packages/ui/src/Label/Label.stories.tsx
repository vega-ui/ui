import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';
import { TextField, TextFieldInput } from '../TextField';
import { LabelSize } from './types';

const sizes: LabelSize[] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Form/Layout/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    children: 'Name',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <>
      <Label {...args} htmlFor='label-playground-input' />
      <TextField size={args.size}>
        <TextFieldInput id='label-playground-input' placeholder='Jane' />
      </TextField>
    </>
  ),
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {sizes.map((size) => (
        <Label key={size} size={size}>{`Name / ${size}`}</Label>
      ))}
    </div>
  ),
};

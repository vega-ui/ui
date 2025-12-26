import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label.tsx';
import { TextField, TextFieldInput } from '../TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Label> = {
  title: 'Form/Layout/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Имя'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render(props) {
    return (
      <>
        <Label {...props} htmlFor='test' />
        <TextField size={props.size}>
          <TextFieldInput id='test' placeholder='Ivan' />
        </TextField>
      </>
    )
  }
};

export const FieldInside: Story = {
  args: {},
  render(props) {
    return (
      <>
        <Label {...props}>
          Hello
          <TextField size={props.size}>
            <TextFieldInput id='test' placeholder='Ivan' />
          </TextField>
        </Label>
      </>
    )
  }
};
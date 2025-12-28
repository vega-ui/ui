import type { Meta, StoryObj } from '@storybook/react-vite';

import { HelperText } from './HelperText';
import { TextField, TextFieldInput } from '../TextField';
import { Label } from '../Label';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof HelperText> = {
  title: 'Form/Layout/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4369&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Имя'
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Required'
  },
  render(props) {
    return (
      <>
        <Label htmlFor='test'>Имя</Label>
        <TextField size={props.size}>
          <TextFieldInput id='test' placeholder='Ivan' />
        </TextField>
        <HelperText {...props} />
      </>
    )
  }
};

export const WithError: Story = {
  args: {
    children: 'Required',
    error: true,
  },
  render(props) {
    return (
      <>
        <Label htmlFor='test'>Имя</Label>
        <TextField size={props.size} error={props.error}>
          <TextFieldInput id='test' placeholder='Ivan' />
        </TextField>
        <HelperText {...props} />
      </>
    )
  }
};
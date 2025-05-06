import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label.tsx';
import { TextField } from '../TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Label> = {
  title: 'UI-Core/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-4344&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  args: {
    children: 'Имя'
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
        <TextField id='test' size={props.size} placeholder='Иван' />
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
          <TextField id='test' size={props.size} placeholder='Иван' />
        </Label>
      </>
    )
  }
};
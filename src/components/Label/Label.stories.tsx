import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label.tsx';
import { TextField } from '../TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
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
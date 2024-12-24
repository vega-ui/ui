import type { Meta, StoryObj } from '@storybook/react';

import { HelperText } from './HelperText.tsx';
import { TextField } from '../TextField';
import { Label } from '../Label';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof HelperText> = {
  title: 'UI/HelperText',
  component: HelperText,
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
  args: {
    children: 'Обязательное поле'
  },
  render(props) {
    return (
      <>
        <Label htmlFor='test'>Имя</Label>
        <TextField id='test' size={props.size} placeholder='Иван' />
        <HelperText {...props} />
      </>
    )
  }
};

export const WithError: Story = {
  args: {
    children: 'Обязательное поле',
    error: true,
  },
  render(props) {
    return (
      <>
        <Label htmlFor='test'>Имя</Label>
        <TextField id='test' size={props.size} error={props.error} placeholder='Иван' />
        <HelperText {...props} />
      </>
    )
  }
};
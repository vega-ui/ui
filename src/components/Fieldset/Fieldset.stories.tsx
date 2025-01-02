import type { Meta, StoryObj } from '@storybook/react';

import { Fieldset } from './Fieldset.tsx';
import { TextField } from '../TextField';
import { Label } from '../Label';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Fieldset> = {
  title: 'UI/Fieldset',
  component: Fieldset,
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
      <Fieldset {...props}>
        <Label htmlFor='test'>Имя</Label>
        <TextField id='test' placeholder='Иван' />
        <Label htmlFor='test2'>Фамилия</Label>
        <TextField id='test2' placeholder='Иванов' />
      </Fieldset>
    )
  }
};

export const WithLegend: Story = {
  args: {
    legend: 'Поля',
  },
  render(props) {
    return (
      <Fieldset {...props}>
        <Label htmlFor='test'>Имя</Label>
        <TextField id='test' placeholder='Иван' />
        <Label htmlFor='test2'>Фамилия</Label>
        <TextField id='test2' placeholder='Иванов' />
      </Fieldset>
    )
  }
};

export const WithSublegend: Story = {
  args: {
    legend: 'Поля',
    sublegend: 'Описание'
  },
  render(props) {
    return (
      <Fieldset {...props}>
        <Label htmlFor='test'>Имя</Label>
        <TextField id='test' placeholder='Иван' />
        <Label htmlFor='test2'>Фамилия</Label>
        <TextField id='test2' placeholder='Иванов' />
      </Fieldset>
    )
  }
};
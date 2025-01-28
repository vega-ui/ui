import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select.tsx';
import { Option } from '../Option';
import { Label } from '../Label';

const meta = {
  title: 'UI-Core/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {
  args: {
    placeholder: 'Выберите город'
  },
  render(args) {
    return (
      <Select {...args}>
        <Option value={1}>Москва</Option>
        <Option value={2}>Санкт-Петербург</Option>
        <Option value={3}>Новосибирск</Option>
      </Select>
    )
  }
};

export const Inline: Story = {
  args: {
    placeholder: 'Выберите язык',
    variant: 'inline',
    icon: 'globe',
  },
  render(args) {
    return (
      <Select {...args}>
        <Option value={1}>Русский</Option>
        <Option value={2}>Английский</Option>
        <Option value={3}>Белорусский</Option>
      </Select>
    )
  }
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Выберите язык',
    id: 'test',
  },
  render(args) {
    return (
      <>
        <Label htmlFor='test'>Label</Label>
        <Select {...args}>
          <Option value={1}>Русский</Option>
          <Option value={2}>Английский</Option>
          <Option value={3}>Белорусский</Option>
        </Select>
      </>
    )
  }
};
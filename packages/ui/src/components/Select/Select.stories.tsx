import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select.tsx';
import { Option } from '../Option';
import { Label } from '../Label';
import { Icon } from '../Icon';
import { SelectOption } from './components/SelectOption';

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
      <Select {...args} onSelect={console.log}>
        <SelectOption value='Moscow'>Москва</SelectOption>
        <SelectOption value='Saint-Petersburg'>Санкт-Петербург</SelectOption>
        <SelectOption value='Novosibirsk'>Новосибирск</SelectOption>
      </Select>
    )
  }
};

export const Inline: Story = {
  args: {
    placeholder: 'Выберите язык',
    variant: 'inline',
    startSlot: <Icon name='globe' />
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
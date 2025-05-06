import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select.tsx';
import { Label } from '../Label';
import { Icon } from '../Icon';
import { SelectOption } from './components/SelectOption';
import { GlobeIcon } from '@vega-ui/icons';

const meta = {
  title: 'UI-Core/Select/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-2262&t=2RYEGgF9z3n5SpP5-4',
    },
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
    startSlot: <Icon><GlobeIcon /></Icon>
  },
  render(args) {
    return (
      <Select {...args}>
        <SelectOption value={1}>Русский</SelectOption>
        <SelectOption value={2}>Английский</SelectOption>
        <SelectOption value={3}>Белорусский</SelectOption>
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
          <SelectOption value={1}>Русский</SelectOption>
          <SelectOption value={2}>Английский</SelectOption>
          <SelectOption value={3}>Белорусский</SelectOption>
        </Select>
      </>
    )
  }
};
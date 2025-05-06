import type { Meta, StoryObj } from '@storybook/react';

import { SheetSelect } from './SheetSelect.tsx';
import { Label } from '@vega-ui/react';
import { SheetSelectOption } from './components/SheetSelectOption';

const meta = {
  title: 'UI-Responsive/SheetSelect',
  component: SheetSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SheetSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {
  args: {
    placeholder: 'Выберите город'
  },
  render(args) {
    return (
      <SheetSelect {...args}>
        <SheetSelectOption value={1}>Москва</SheetSelectOption>
        <SheetSelectOption value={2}>Санкт-Петербург</SheetSelectOption>
        <SheetSelectOption value={3}>Новосибирск</SheetSelectOption>
      </SheetSelect>
    )
  }
};

export const Inline: Story = {
  args: {
    placeholder: 'Выберите язык',
    variant: 'inline',
  },
  render(args) {
    return (
      <SheetSelect {...args}>
        <SheetSelectOption value={1}>Русский</SheetSelectOption>
        <SheetSelectOption value={2}>Английский</SheetSelectOption>
        <SheetSelectOption value={3}>Белорусский</SheetSelectOption>
      </SheetSelect>
    )
  }
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Выберите язык',
  },
  render(args) {
    return (
      <>
        <Label htmlFor='test'>Label</Label>
        <SheetSelect {...args}>
          <SheetSelectOption value={1}>Русский</SheetSelectOption>
          <SheetSelectOption value={2}>Английский</SheetSelectOption>
          <SheetSelectOption value={3}>Белорусский</SheetSelectOption>
        </SheetSelect>
      </>
    )
  }
};
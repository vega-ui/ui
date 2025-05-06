import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveSelect } from './ResponsiveSelect.tsx';
import { Label } from '@vega-ui/react';
import { ResponsiveSelectOption } from './components';

const meta = {
  title: 'UI-Responsive/ResponsiveSelect',
  component: ResponsiveSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ResponsiveSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {
  args: {
    placeholder: 'Выберите город'
  },
  render(args) {
    return (
      <ResponsiveSelect {...args}>
        <ResponsiveSelectOption value={1}>Москва</ResponsiveSelectOption>
        <ResponsiveSelectOption value={2}>Санкт-Петербург</ResponsiveSelectOption>
        <ResponsiveSelectOption value={3}>Новосибирск</ResponsiveSelectOption>
      </ResponsiveSelect>
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
      <ResponsiveSelect {...args}>
        <ResponsiveSelectOption value={1}>Русский</ResponsiveSelectOption>
        <ResponsiveSelectOption value={2}>Английский</ResponsiveSelectOption>
        <ResponsiveSelectOption value={3}>Белорусский</ResponsiveSelectOption>
      </ResponsiveSelect>
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
        <ResponsiveSelect {...args}>
          <ResponsiveSelectOption value={1}>Русский</ResponsiveSelectOption>
          <ResponsiveSelectOption value={2}>Английский</ResponsiveSelectOption>
          <ResponsiveSelectOption value={3}>Белорусский</ResponsiveSelectOption>
        </ResponsiveSelect>
      </>
    )
  }
};
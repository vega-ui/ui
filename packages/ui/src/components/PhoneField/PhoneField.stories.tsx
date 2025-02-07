import type { Meta, StoryObj } from '@storybook/react';

import { PhoneField } from './PhoneField.tsx';
import { Label } from '../Label';

const meta = {
  title: 'UI-Core/PhoneField',
  component: PhoneField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PhoneField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    country: 'RU',
    placeholder: 'Номер телефона'
  },
};

export const WithLabel: Story = {
  args: {
    country: 'KZ'
  },
  render(props) {
    return (
      <>
        <Label>
          Телефон для связи
          <PhoneField {...props} />
        </Label>
      </>
    )
  }
}
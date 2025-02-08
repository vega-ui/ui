import type { Meta, StoryObj } from '@storybook/react';

import { ResponsivePhoneSelectField } from './ResponsivePhoneSelectField.tsx';

const meta = {
  title: 'UI-Responsive/ResponsivePhoneSelectField',
  component: ResponsivePhoneSelectField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ResponsivePhoneSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {
  args: {
    placeholder: 'Введите номер телефона',
    countries: [
      {
        'iso': 'RU',
        'label': 'Россия (+7)'
      },
      {
        'iso': 'KZ',
        'label': 'Казахстан (+7)'
      },
    ],
  },
};
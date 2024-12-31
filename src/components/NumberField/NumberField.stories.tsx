import type { Meta, StoryObj } from '@storybook/react';

import { NumberField } from './NumberField.tsx';
import { Icon } from '../Icon';
import { Text } from '../Text';

const meta = {
  title: 'UI/NumberField',
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Количество',
  },
};

export const WithStartSlot: Story = {
  render(props) {
    return <NumberField {...props} placeholder='Количество процессоров' startSlot={<Icon name='chip' size='mini' />} />
  }
}

export const WithEndSlot: Story = {
  render(props) {
    return <NumberField {...props} placeholder='Количество' endSlot={<Text>шт.</Text>} />
  }
}
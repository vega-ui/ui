import type { Meta, StoryObj } from '@storybook/react';

import { NumberField } from './NumberField.tsx';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Label } from '../Label';
import { useState } from 'react';

const meta = {
  title: 'UI-Core/NumberField',
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
    onChange: console.log,
  },
};

export const Controlled: Story = {
  args: {
    placeholder: 'Количество',
  },
  render(args) {
    const [value, setValue] = useState(0)
    return (
      <NumberField {...args} onChange={(_, value) => setValue(value)} value={value} placeholder='Количество процессоров' startSlot={<Icon name='chip' size='mini' />} />
    )
  }
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

export const WithLabel: Story = {
  render(props) {
    return (
      <>
        <Label>
          Количество
          <NumberField {...props} endSlot={<Text>шт.</Text>} />
        </Label>
      </>
    )
  }
}
import type { Meta, StoryObj } from '@storybook/react';

import { PasswordField } from './PasswordField.tsx';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Label } from '../Label';
import { ChipIcon } from '@adara-cs/icons';

const meta = {
  title: 'UI-Core/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large']
    }
  },
  args: {},
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Пароль'
  },
};

export const WithStartSlot: Story = {
  render(props) {
    return <PasswordField {...props} placeholder='Количество процессоров' startSlot={<Icon size='xs'><ChipIcon /></Icon>} />
  }
}

export const WithEndSlot: Story = {
  render(props) {
    return <PasswordField {...props} placeholder='Количество' endSlot={<Text>шт.</Text>} />
  }
}

export const WithLabel: Story = {
  render(props) {
    return (
      <>
        <Label>
          Пароль
          <PasswordField {...props} endSlot={<Text>шт.</Text>} />
        </Label>
      </>
    )
  }
}
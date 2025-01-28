import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { Checkbox } from './Checkbox.tsx';

const meta = {
  title: 'UI-Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true
  },
};

export const WithLabel: Story = {
  args: {},
  render(props) {
    return (
      <Text size={2} style={{ display: 'flex', alignItems: 'center', gap: '16px' }} as='label'>
        <Checkbox {...props} />
        Just a label
      </Text>
    )
  }
};
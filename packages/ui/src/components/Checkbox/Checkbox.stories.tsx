import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text';
import { Checkbox } from './Checkbox.tsx';

const meta = {
  title: 'UI-Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-626&t=2RYEGgF9z3n5SpP5-4',
    },
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

export const Disabled: Story = {
  args: {
    disabled: true
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true
  },
};

export const Checked: Story = {
  args: {
    checked: true
  },
};

export const IndeterminateDisabled: Story = {
  args: {
    indeterminate: true,
    disabled: true
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true
  },
};

export const WithLabel: Story = {
  args: {},
  render(props) {
    return (
      <Text asChild size={2} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label>
          <Checkbox {...props} />
          Just a label
        </label>
      </Text>
    )
  }
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';

import { Text } from '../Text';
import { Checkbox } from './Checkbox';
import { CheckboxCheckedIcon, CheckboxInput, CheckboxIndeterminateIcon, CheckboxIndicator } from './components';

const parts = (input: ComponentProps<typeof CheckboxInput> = {}) => [
  <CheckboxInput key={0} {...input} />,
  <CheckboxIndicator key={1}>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
]

const meta = {
  title: 'Form/Selectors/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-626&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    children: parts()
  }
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
    children: parts({ disabled: true })
  },
};

export const Indeterminate: Story = {
  args: {
    children: parts({ indeterminate: true })
  },
};

export const Checked: Story = {
  args: {
    children: parts({ defaultChecked: true })
  },
};

export const IndeterminateDisabled: Story = {
  args: {
    children: parts({ indeterminate: true, disabled: true })
  },
};

export const CheckedDisabled: Story = {
  args: {
    children: parts({ defaultChecked: true, disabled: true })
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
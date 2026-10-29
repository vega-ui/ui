import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { CheckboxCardControlInput } from '../CheckboxCardControlInput';
import { CheckboxCardControlIndicator } from '../CheckboxCardControlIndicator';
import { CheckboxCardControlCheckedIcon } from '../CheckboxCardControlCheckedIcon';
import { CheckboxCardControlIndeterminateIcon } from '../CheckboxCardControlIndeterminateIcon';
import { CheckboxCardControl } from './CheckboxCardControl';

const parts = (input: ComponentProps<typeof CheckboxCardControlInput> = {}) => [
  <CheckboxCardControlInput key={0} {...input} />,
  <CheckboxCardControlIndicator key={1}>
    <CheckboxCardControlCheckedIcon />
    <CheckboxCardControlIndeterminateIcon />
  </CheckboxCardControlIndicator>
]

const meta = {
  title: 'Form/Selectors/CheckboxCard/CheckboxCardControl',
  component: CheckboxCardControl,
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
} satisfies Meta<typeof CheckboxCardControl>;

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
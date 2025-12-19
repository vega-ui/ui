import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../Text';
import { Checkbox } from './Checkbox';
import { CheckboxCheckedIcon, CheckboxHiddenInput, CheckboxIndeterminateIcon, CheckboxIndicator } from './components';

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
    children: [
      <CheckboxHiddenInput key={0} />,
      <CheckboxIndicator key={1}>
        <CheckboxCheckedIcon />
        <CheckboxIndeterminateIcon />
      </CheckboxIndicator>
    ]
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
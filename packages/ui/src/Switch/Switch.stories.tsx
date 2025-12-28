import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './Switch'
import { SwitchHiddenInput, SwitchIndicator } from './components';

const meta = {
  title: 'Form/Selectors/Switch/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=2110-5998&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    children: [
      <SwitchHiddenInput />,
      <SwitchIndicator />
    ]
  }
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: [
      <SwitchHiddenInput disabled />,
      <SwitchIndicator />
    ]
  },
}

export const Checked: Story = {
  args: {
    children: [
      <SwitchHiddenInput checked />,
      <SwitchIndicator />
    ]
  },
}

export const CheckedDisabled: Story = {
  args: {
    children: [
      <SwitchHiddenInput checked disabled />,
      <SwitchIndicator />
    ]
  },
}
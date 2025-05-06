import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../Text/index.ts'
import { Switch } from './Switch.tsx'

const meta = {
  title: 'UI-Core/Switch',
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
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {},
  render(props) {
    return (
      <Text
        asChild
        size={2}
        style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label>
          <Switch {...props} />
          Just a label
        </label>
      </Text>
    )
  },
}

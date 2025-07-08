import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../Text/index.ts'
import { Radio } from './Radio.tsx'

const meta = {
  title: 'Form/Selectors/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=2110-5896&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    }
  },
} satisfies Meta<typeof Radio>

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
          <Radio {...props} />
          Just a label
        </label>
      </Text>
    )
  },
}

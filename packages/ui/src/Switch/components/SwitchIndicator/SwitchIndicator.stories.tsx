import type { Meta, StoryObj } from '@storybook/react-vite'

import { SwitchIndicator } from './SwitchIndicator'
import { Switch } from '../../Switch.tsx';
import { SwitchHiddenInput } from '../SwitchHiddenInput';
import { Moon } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Selectors/Switch/SwitchIndicator',
  component: SwitchIndicator,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=2110-5998&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators(Story) {
    return (
      <Switch>
        <SwitchHiddenInput />
        <Story />
      </Switch>
    )
  },
} satisfies Meta<typeof SwitchIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Custom: Story = {
  args: {
    style: { background: 'var(--color-blue-accent-800)' }
  }
}

export const WithIcon: Story = {
  args: {
    style: { background: 'var(--color-blue-accent-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    children: (
      <Icon size='sm'><Moon stroke='white' /></Icon>
    )
  }
}
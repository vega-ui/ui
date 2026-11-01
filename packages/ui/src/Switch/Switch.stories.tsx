import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormEvent, useState } from 'react'
import { Moon } from '@vega-ui/icons'

import { Switch } from './Switch'
import { SwitchInput, SwitchIndicator } from './components';
import { Button } from '../Button'
import { Code } from '../Code'
import { Icon } from '../Icon'

const meta = {
  title: 'Form/Selectors/Switch',
  component: Switch,
  subcomponents: {
    SwitchIndicator,
    SwitchInput,
  },
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
      <SwitchInput key={0} />,
      <SwitchIndicator key={1} />
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
      <SwitchInput key={0} disabled />,
      <SwitchIndicator key={1} />
    ]
  },
}

export const Checked: Story = {
  args: {
    children: [
      <SwitchInput key={0} checked />,
      <SwitchIndicator key={1} />
    ]
  },
}

export const CheckedDisabled: Story = {
  args: {
    children: [
      <SwitchInput key={0} checked disabled />,
      <SwitchIndicator key={1} />
    ]
  },
}

export const CustomIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: '`SwitchIndicator` takes your own `style` and children, so the thumb can have its own color or hold an icon.',
      },
    },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Switch {...props}>
        <SwitchInput aria-label='Accent thumb' />
        <SwitchIndicator style={{ background: 'var(--color-blue-accent-800)' }} />
      </Switch>
      <Switch {...props}>
        <SwitchInput aria-label='Dark mode' />
        <SwitchIndicator style={{ background: 'var(--color-blue-accent-800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size='sm'><Moon stroke='white' /></Icon>
        </SwitchIndicator>
      </Switch>
    </div>
  ),
}

export const InForm: Story = {
  parameters: {
    docs: {
      description: {
        story: '`SwitchInput` is a native checkbox, so with a `name` it submits with the form.',
      },
    },
  },
  render: (props) => {
    const [submitted, setSubmitted] = useState('')

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const data = Object.fromEntries(new FormData(event.currentTarget))
      setSubmitted(JSON.stringify(data))
    }

    return (
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
        <Switch {...props}>
          <SwitchInput name='notifications' aria-label='Notifications' />
          <SwitchIndicator />
        </Switch>
        <Button type='submit'>Submit</Button>
        {submitted && <Code>{submitted}</Code>}
      </form>
    )
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordFieldHiddenIcon } from './PasswordFieldHiddenIcon';
import { LockOpen } from '@vega-ui/icons';
import { PasswordField } from '../../PasswordField';
import { PasswordFieldToggleIconButton } from '../PasswordFieldToggleIconButton';
import { PasswordFieldShownIcon } from '../PasswordFieldShownIcon';

const meta = {
  title: 'Form/Fields/PasswordField/PasswordFieldHiddenIcon',
  component: PasswordFieldHiddenIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PasswordField>
        <PasswordFieldToggleIconButton>
          <PasswordFieldShownIcon />
          <Story />
        </PasswordFieldToggleIconButton>
      </PasswordField>
    )
  }
} satisfies Meta<typeof PasswordFieldHiddenIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const Custom: Story = {
  args: {
    children: (
      <LockOpen />
    )
  },
}
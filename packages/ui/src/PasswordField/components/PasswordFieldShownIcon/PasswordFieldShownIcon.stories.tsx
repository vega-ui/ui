import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordFieldShownIcon } from './PasswordFieldShownIcon';
import { LockOpen } from '@vega-ui/icons';
import { PasswordFieldToggleIconButton } from '../PasswordFieldToggleIconButton';
import { PasswordField } from '../../PasswordField';
import { PasswordFieldHiddenIcon } from '../PasswordFieldHiddenIcon';

const meta = {
  title: 'Form/Fields/PasswordField/PasswordFieldShownIcon',
  component: PasswordFieldShownIcon,
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
          <PasswordFieldHiddenIcon />
          <Story />
        </PasswordFieldToggleIconButton>
      </PasswordField>
    )
  }
} satisfies Meta<typeof PasswordFieldShownIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const Custom: Story = {
  args: {
    children: <LockOpen />
  },
}
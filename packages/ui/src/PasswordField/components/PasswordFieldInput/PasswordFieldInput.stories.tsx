import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordFieldInput } from './PasswordFieldInput';
import { PasswordField } from '../../PasswordField';
import { PasswordFieldToggleIconButton } from '../PasswordFieldToggleIconButton';
import { PasswordFieldHiddenIcon } from '../PasswordFieldHiddenIcon';
import { PasswordFieldShownIcon } from '../PasswordFieldShownIcon';

const meta = {
  title: 'Form/Fields/PasswordField/PasswordFieldInput',
  component: PasswordFieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PasswordField>
        <Story />
        <PasswordFieldToggleIconButton>
          <PasswordFieldHiddenIcon />
          <PasswordFieldShownIcon />
        </PasswordFieldToggleIconButton>
      </PasswordField>
    )
  }
} satisfies Meta<typeof PasswordFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
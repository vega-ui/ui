import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextFieldInput } from './TextFieldInput';
import { TextField } from '../../TextField';

const meta = {
  title: 'Form/Fields/TextField/TextFieldInput',
  component: TextFieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <TextField>
        <Story />
      </TextField>
    )
  }
} satisfies Meta<typeof TextFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
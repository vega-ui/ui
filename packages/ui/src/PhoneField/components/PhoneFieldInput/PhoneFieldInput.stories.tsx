import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from './PhoneFieldInput.tsx';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldInput',
  component: PhoneFieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    placeholder: '+1',
  },
  decorators(Story) {
    return (
      <PhoneField code={'US'}>
        <Story />
      </PhoneField>
    )
  }
} satisfies Meta<typeof PhoneFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
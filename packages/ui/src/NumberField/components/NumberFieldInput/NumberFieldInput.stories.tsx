import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberFieldInput } from './NumberFieldInput';
import { NumberField } from '../../NumberField.tsx';
import { NumberFieldDecrementButton } from '../NumberFieldDecrementButton';
import { NumberFieldIncrementButton } from '../NumberFieldIncrementButton';

const meta = {
  title: 'Form/Fields/NumberField/NumberFieldInput',
  component: NumberFieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <NumberField>
        <NumberFieldDecrementButton />
        <Story />
        <NumberFieldIncrementButton />
      </NumberField>
    )
  }
} satisfies Meta<typeof NumberFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
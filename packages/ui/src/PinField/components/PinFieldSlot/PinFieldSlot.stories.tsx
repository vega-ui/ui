import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinFieldSlot } from './PinFieldSlot.tsx';
import { PinField } from '../../PinField.tsx';
import { PinFieldHiddenInput } from '../PinFieldHiddenInput';

const meta = {
  title: 'Form/Fields/PinField/PinFieldSlot',
  component: PinFieldSlot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PinFieldSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    index: 0,
  },
  decorators(Story) {
    return (
      <PinField maxLength={1}>
        <PinFieldHiddenInput />
        <Story />
      </PinField>
    )
  },
}
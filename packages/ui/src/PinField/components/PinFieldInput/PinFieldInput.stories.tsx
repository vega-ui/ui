import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinFieldInput } from './PinFieldInput';
import { PinField } from '../../PinField';
import { PinFieldSlot } from '../PinFieldSlot';

const meta = {
  title: 'Form/Fields/PinField/PinFieldInput',
  component: PinFieldInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators(Story) {
    return (
      <PinField maxLength={4}>
        <Story />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
    )
  }
} satisfies Meta<typeof PinFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}
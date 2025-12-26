import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberFieldDecrementButton } from './NumberFieldDecrementButton';
import { ArrowDown } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Fields/NumberField/NumberFieldDecrementButton',
  component: NumberFieldDecrementButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NumberFieldDecrementButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const WithCustomButton: Story = {
  args: {
    children: <Icon><ArrowDown /></Icon>
  },
}
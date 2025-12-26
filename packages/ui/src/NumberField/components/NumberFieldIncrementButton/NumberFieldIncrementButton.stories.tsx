import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberFieldIncrementButton } from './NumberFieldIncrementButton';
import { ArrowUp } from '@vega-ui/icons';
import { Icon } from '../../../Icon';

const meta = {
  title: 'Form/Fields/NumberField/NumberFieldIncrementButton',
  component: NumberFieldIncrementButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof NumberFieldIncrementButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}

export const WithCustomButton: Story = {
  args: {
    children: <Icon><ArrowUp /></Icon>
  },
}
import type { Meta, StoryObj } from '@storybook/react';
import { SelectOption } from './SelectOption.tsx';

const meta = {
  title: 'UI-Core/Select/SelectOption',
  component: SelectOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SelectOption>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    value: 'value',
    children: 'Option'
  },
}
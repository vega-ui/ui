import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectOption } from './SelectOption';

const meta = {
  title: 'Form/Selectors/Select/SelectOption',
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
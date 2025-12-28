import type { Meta, StoryObj } from '@storybook/react-vite';
import { PinFieldSeparator } from './PinFieldSeparator';

const meta = {
  title: 'Form/Fields/PinField/PinFieldSeparator',
  component: PinFieldSeparator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    }
  },
  args: {},
} satisfies Meta<typeof PinFieldSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}
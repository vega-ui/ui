import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea.tsx';

const meta = {
  title: 'UI/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: 'Опишите ситуацию',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
  render(props) {
    return <TextArea {...props} />
  }
}

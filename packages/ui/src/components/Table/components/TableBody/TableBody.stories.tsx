import type { Meta, StoryObj } from '@storybook/react';
import { TableBody } from './TableBody.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Table/TableBody',
  component: TableBody,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableBody>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableBody content</Text>
  },
}
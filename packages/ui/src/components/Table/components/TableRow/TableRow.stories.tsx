import type { Meta, StoryObj } from '@storybook/react';
import { TableRow } from './TableRow.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Table/TableRow',
  component: TableRow,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableRow content</Text>
  },
}
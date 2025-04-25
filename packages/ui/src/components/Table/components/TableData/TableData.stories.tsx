
import type { Meta, StoryObj } from '@storybook/react';
import { TableData } from './TableData.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Table/TableData',
  component: TableData,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableData>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableData content</Text>
  },
}
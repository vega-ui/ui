import type { Meta, StoryObj } from '@storybook/react';
import { TableHeading } from './TableHeading.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Table/TableHeading',
  component: TableHeading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableHeading content</Text>
  },
}
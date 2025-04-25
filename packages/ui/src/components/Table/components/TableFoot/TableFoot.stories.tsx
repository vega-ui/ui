
import type { Meta, StoryObj } from '@storybook/react';
import { TableFoot } from './TableFoot.tsx';
import { Text } from '../../../Text';

const meta = {
  title: 'UI-Core/Table/TableFoot',
  component: TableFoot,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableFoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableFoot content</Text>
  },
}
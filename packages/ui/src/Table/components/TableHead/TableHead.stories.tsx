import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableHead } from './TableHead';
import { Text } from '../../../Text';

const meta = {
  title: 'Data/Table/TableHead',
  component: TableHead,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>TableHead content</Text>
  },
}
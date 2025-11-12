import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridCell } from './DataGridCell';
import { Text } from '../../../Text'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridCell> = {
  title: 'Data/DataGrid/DataGridCell',
  component: DataGridCell,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Text size={2}>1</Text>,
    asChild: false,
  },
};
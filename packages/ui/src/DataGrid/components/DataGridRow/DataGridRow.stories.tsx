import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridRow } from './DataGridRow';
import { DataGridCell } from '../DataGridCell';
import { Text } from '../../../Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridRow> = {
  title: 'Data/DataGrid/DataGridRow',
  component: DataGridRow,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    row: 1,
    children: [
      <DataGridCell col={1}><Text size={2}>1</Text></DataGridCell>,
      <DataGridCell col={2}><Text size={2}>2</Text></DataGridCell>,
      <DataGridCell col={3}><Text size={2}>3</Text></DataGridCell>,
    ]
  },
};
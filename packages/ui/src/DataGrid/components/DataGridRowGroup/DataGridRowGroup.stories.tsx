import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridCell } from '../DataGridCell';
import { DataGridRowGroup } from './DataGridRowGroup.tsx';
import { DataGridRow } from '../DataGridRow';
import { Text } from '../../../Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridRowGroup> = {
  title: 'Data/DataGrid/DataGridRowGroup',
  component: DataGridRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DataGridRow row={1}>
        <DataGridCell col={1}><Text size={2}>1</Text></DataGridCell>
        <DataGridCell col={2}><Text size={2}>2</Text></DataGridCell>
        <DataGridCell col={3}><Text size={2}>3</Text></DataGridCell>
      </DataGridRow>
    )
  },
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridSelectableCell } from '../DataGridSelectableCell';
import { DataGridSelectableRowGroup } from './DataGridSelectableRowGroup';
import { DataGridSelectableRow } from '../DataGridSelectableRow';
import { Text } from '../../../Text';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridSelectableRowGroup> = {
  title: 'Data/DataGridSelectable/DataGridSelectableRowGroup',
  component: DataGridSelectableRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <DataGridSelectableRow row={1}>
        <DataGridSelectableCell col={1}><Text size={2}>1</Text></DataGridSelectableCell>
        <DataGridSelectableCell col={2}><Text size={2}>2</Text></DataGridSelectableCell>
        <DataGridSelectableCell col={3}><Text size={2}>3</Text></DataGridSelectableCell>
      </DataGridSelectableRow>
    )
  },
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPickerRow } from './DataGridPickerRow.tsx';
import { Text } from '../../../Text';
import { DataGridPickerItem } from '../DataGridPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridPickerRow> = {
  title: 'Data/DataGridPicker/DataGridPickerRow',
  component: DataGridPickerRow,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    row: 1,
    children: [
      <DataGridPickerItem col={1}><Text size={2}>1</Text></DataGridPickerItem>,
      <DataGridPickerItem col={2}><Text size={2}>2</Text></DataGridPickerItem>,
      <DataGridPickerItem col={3}><Text size={2}>3</Text></DataGridPickerItem>,
    ]
  },
};
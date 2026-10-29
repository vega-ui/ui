import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPickerRowGroup } from './DataGridPickerRowGroup';
import { Text } from '../../../Text';
import { DataGridPickerItem } from '../DataGridPickerItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridPickerRowGroup> = {
  title: 'Data/DataGridPicker/DataGridPickerRowGroup',
  component: DataGridPickerRowGroup,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <DataGridPickerItem key={0} col={1}><Text size={2}>1</Text></DataGridPickerItem>,
      <DataGridPickerItem key={1} col={2}><Text size={2}>2</Text></DataGridPickerItem>,
      <DataGridPickerItem key={2} col={3}><Text size={2}>3</Text></DataGridPickerItem>,
    ]
  },
};
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridSelectableCell } from './DataGridSelectableCell.tsx';
import { Text } from '../../../Text'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridSelectableCell> = {
  title: 'Data/DataGridSelectable/DataGridSelectableCell',
  component: DataGridSelectableCell,
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
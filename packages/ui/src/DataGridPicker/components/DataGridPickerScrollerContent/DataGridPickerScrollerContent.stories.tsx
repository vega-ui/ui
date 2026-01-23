import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPickerScrollerContent } from './DataGridPickerScrollerContent';
import { DataGridPickerRow } from '../DataGridPickerRow';
import { DataGridPickerItem } from '../DataGridPickerItem';
import { DataGridPickerRowGroup } from '../DataGridPickerRowGroup';
import { DataGridPicker } from '../../DataGridPicker';
import { DataGridPickerScroller } from '../DataGridPickerScroller';

const matrix: number[][] = Array.from({ length: 7 }, () => Array.from({ length: 7 }))

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridPickerScrollerContent> = {
  title: 'Data/DataGridPicker/DataGridPickerScrollerContent',
  component: DataGridPickerScrollerContent,
  tags: ['autodocs'],
  decorators(Story) {
    return (
      <DataGridPicker style={{ width: 252 }} size='xs'>
        <DataGridPickerScroller>
          <Story />
        </DataGridPickerScroller>
      </DataGridPicker>
    )
  },
  args: {
    children: (
      <DataGridPickerRowGroup>
        {matrix.map((row, rowIndex) => (
          <DataGridPickerRow row={rowIndex} key={rowIndex}>
            {row.map((_, colIndex) => (
              <DataGridPickerItem col={colIndex} key={colIndex}>
                {colIndex + 1}
              </DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    )
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
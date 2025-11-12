import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataGrid } from './DataGrid';
import { DataGridRow, DataGridCell, DataGridRowGroup } from './components';
import { Text } from '../Text';

const matrix = Array.from({ length: 5 },
  (_, row) => Array.from({ length: 5 },
    (_, col) => ({
      index: [row, col] as [number, number],
    })
  ))

const meta = {
  title: 'Data/DataGrid/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: (
      <DataGridRowGroup>
        {matrix.map((row, index) => (
          <DataGridRow row={index} key={index}>
            {row.map(({ index: [, col] }) => (
              <DataGridCell style={{ width: 42, height: 42 }} col={col} key={index}>
                <Text size={2}>{col + 1}</Text>
              </DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    )
  },
  argTypes: {},
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultActive: '0:0',
  }
};

export const Wrapped: Story = {
  args: {
    defaultActive: '0:0',
    wrap: 'horizontal'
  }
};

export const WithExclude: Story = {
  args: {
    defaultActive: '1:0',
    wrap: 'horizontal',
    exclude: ['0:0', '0:1', '0:2', '0:3', '0:4']
  }
};
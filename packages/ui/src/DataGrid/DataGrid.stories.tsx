import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGrid } from './DataGrid';
import { DataGridRow, DataGridCell, DataGridRowGroup } from './components';
import { Text } from '../Text';

const rows = [0, 1, 2, 3, 4, 5, 6];
const cols = [0, 1, 2, 3, 4, 5, 6];

const meta = {
  title: 'Data/DataGrid',
  component: DataGrid,
  subcomponents: {
    DataGridRow,
    DataGridCell,
    DataGridRowGroup,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    wrap: {
      control: 'radio',
      options: [undefined, 'horizontal', 'vertical', 'both'],
    },
    exclude: {
      control: 'object',
    },
  },
  args: {
    'aria-label': 'Grid',
    wrap: 'horizontal',
    defaultActive: '0:0',
    exclude: [],
    children: (
      <DataGridRowGroup>
        {rows.map((row) => (
          <DataGridRow row={row} key={row}>
            {cols.map((col) => (
              <DataGridCell style={{ width: 42, height: 42 }} col={col} key={col}>
                <Text size={2}>{col + 1}</Text>
              </DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    ),
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

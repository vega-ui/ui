import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridSelectable } from './DataGridSelectable';
import { DataGridSelectableCell, DataGridSelectableRow, DataGridSelectableRowGroup } from './components';
import { Text } from '../Text';

const rows = [0, 1, 2, 3, 4];
const cols = [0, 1, 2, 3, 4];

const meta = {
  title: 'Data/DataGridSelectable',
  component: DataGridSelectable,
  subcomponents: {
    DataGridSelectableCell,
    DataGridSelectableRowGroup,
    DataGridSelectableRow,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    wrap: {
      control: 'radio',
      options: [undefined, 'horizontal', 'vertical', 'both'],
    },
    exclude: {
      control: 'object',
    },
    from: {
      control: 'text',
    },
    to: {
      control: 'text',
    },
  },
  args: {
    'aria-label': 'Grid',
    defaultActive: '0:0',
    exclude: [],
    children: (
      <DataGridSelectableRowGroup>
        {rows.map((row) => (
          <DataGridSelectableRow row={row} key={row}>
            {cols.map((col) => (
              <DataGridSelectableCell style={{ width: 42, height: 42 }} col={col} key={col}>
                <Text size={2}>{col + 1}</Text>
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    ),
  },
} satisfies Meta<typeof DataGridSelectable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

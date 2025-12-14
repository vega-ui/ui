import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataGridSelectable } from './DataGridSelectable.tsx';
import { DataGridSelectableCell, DataGridSelectableRow, DataGridSelectableRowGroup } from './components';
import { Text } from '../Text';

const matrix = Array.from({ length: 5 },
  (_, row) => Array.from({ length: 5 },
    (_, col) => ({
      index: [row, col] as [number, number],
    })
  ))

const meta = {
  title: 'Data/DataGridSelectable/DataGridSelectable',
  component: DataGridSelectable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: (
      <DataGridSelectableRowGroup>
        {matrix.map((row, index) => (
          <DataGridSelectableRow row={index} key={index}>
            {row.map(({ index: [, col] }) => (
              <DataGridSelectableCell style={{ width: 42, height: 42 }} col={col} key={index}>
                <Text size={2}>{col + 1}</Text>
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    )
  },
  argTypes: {
    wrap: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'both'],
    },
  },
} satisfies Meta<typeof DataGridSelectable>;

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

export const WithFromAndTo: Story = {
  args: {
    defaultActive: '1:0',
    wrap: 'horizontal',
    from: '1:0',
    to: '3:0'
  }
};
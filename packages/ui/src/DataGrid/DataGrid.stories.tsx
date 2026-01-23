import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataGrid } from './DataGrid';
import { DataGridRow, DataGridCell, DataGridRowGroup } from './components';
import { Text } from '../Text';
import { useState } from 'react';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { ArrowLeft, ArrowRight } from '@vega-ui/icons';

const matrix = Array.from({ length: 7 },
  (_, row) => Array.from({ length: 7 },
    (_, col) => ({
      index: [row, col] as [number, number],
    })
  ))

type MatrixCell = { index: [number, number] }

const getActiveKeyByShift = (
  matrix: readonly (readonly MatrixCell[])[],
  active: string,
  shift: -1 | 1,
): string | undefined => {
  const parts = active.split(':')
  if (parts.length !== 2) return undefined
  
  const r = Number(parts[0])
  const c = Number(parts[1])
  if (!Number.isFinite(r) || !Number.isFinite(c)) return undefined
  if (!matrix[r]?.[c]) return undefined
  
  const rows = matrix.length
  if (rows === 0) return undefined
  const cols = matrix[0]?.length ?? 0
  if (cols === 0) return undefined
  
  const i = r * cols + c
  const nextI = i + shift
  if (nextI < 0 || nextI >= rows * cols) return undefined
  
  const nextR = Math.floor(nextI / cols)
  const nextC = nextI % cols
  
  const nextCell = matrix[nextR]?.[nextC]
  if (!nextCell) return undefined
  
  return `${nextR}:${nextC}`
}

const meta = {
  title: 'Data/DataGrid/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    wrap: 'horizontal',
    children: (
      <DataGridRowGroup>
        {matrix.map((row, index) => (
          <DataGridRow row={index} key={index}>
            {row.map(({ index: [, col] }, index) => (
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

export const HorizontalWrapped: Story = {
  args: {
    defaultActive: '0:0',
    wrap: 'horizontal'
  }
};

export const VerticalWrapped: Story = {
  args: {
    defaultActive: '0:0',
    wrap: 'vertical'
  }
};

export const BothWrapped: Story = {
  args: {
    defaultActive: '0:0',
    wrap: 'both'
  }
};

export const Exclude: Story = {
  args: {
    defaultActive: '1:0',
    exclude: ['0:0', '0:1', '0:2', '0:3', '0:4']
  }
};

export const ControlledActive: Story = {
  args: {},
  render(props) {
    const [active, setActive] = useState('0:0')
    
    const onNextActive = () => {
      const next = getActiveKeyByShift(matrix, active, 1)
      if (!next) return
      
      setActive(next)
    }
    
    const onPrevActive = () => {
      const prev = getActiveKeyByShift(matrix, active, -1)
      if (!prev) return
      
      setActive(prev)
    }
    
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <IconButton onClick={onPrevActive} size='xs'><Icon><ArrowLeft /></Icon></IconButton>
          <Text>{active}</Text>
          <IconButton onClick={onNextActive} size='xs'><Icon><ArrowRight /></Icon></IconButton>
        </div>
        <DataGrid {...props} active={active} onChangeActive={(key) => setActive(String(key))}>
          <DataGridRowGroup>
            {matrix.map((row, r) => (
              <DataGridRow row={r} key={r}>
                {row.map(({ index: [, col] }, c) => (
                  <DataGridCell style={{ width: 42, height: 42 }} col={col} key={c}>
                    <Text size={2}>{col + 1}</Text>
                  </DataGridCell>
                ))}
              </DataGridRow>
            ))}
          </DataGridRowGroup>
        </DataGrid>
      </div>
    )
  }
};
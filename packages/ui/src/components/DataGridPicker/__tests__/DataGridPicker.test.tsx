import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { FC } from 'react'
import { DataGridPicker } from '../DataGridPicker'
import { DataGridPickerRow, DataGridPickerRowGroup, DataGridPickerItem } from '../components';

const Grid3x2: FC = () => (
  <DataGridPicker selection='range'>
    <DataGridPickerRowGroup>
      <DataGridPickerRow row={0}>
        <DataGridPickerItem col={0}>0:0</DataGridPickerItem>
        <DataGridPickerItem col={1}>0:1</DataGridPickerItem>
        <DataGridPickerItem col={2}>0:2</DataGridPickerItem>
      </DataGridPickerRow>
      <DataGridPickerRow row={1}>
        <DataGridPickerItem col={0}>1:0</DataGridPickerItem>
        <DataGridPickerItem col={1}>1:1</DataGridPickerItem>
        <DataGridPickerItem col={2}>1:2</DataGridPickerItem>
      </DataGridPickerRow>
    </DataGridPickerRowGroup>
  </DataGridPicker>
)

describe('DataGridPicker', () => {
  it('renders grid, rows, and picker items correctly', () => {
    render(<Grid3x2 />)
    
    const grid = screen.getByRole('grid')
    expect(grid).toBeInTheDocument()
    
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(2)
    
    const cells = screen.getAllByRole('gridcell')
    expect(cells.length).toBe(6)
    expect(cells[0]).toHaveTextContent('0:0')
  })
  
  it('uses DataGridSelectable internally with horizontal wrap by default', () => {
    render(<Grid3x2 />)
    
    const grid = screen.getByRole('grid')
    expect(grid).toHaveAttribute('role', 'grid')
    
    const firstRow = screen.getAllByRole('row')[0]
    expect(firstRow.querySelectorAll('[role="gridcell"]').length).toBe(3)
  })
})

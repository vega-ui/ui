import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

const years = [2024, 2025, 2026];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

export default function QuarterSelectorGrid() {
  return (
    <DataGridSelectable
      aria-label='Reporting quarter'
      defaultSelected='FY2025-Q3'
      defaultActive='FY2025-Q3'
      className='selectableGrid'
    >
      <DataGridSelectableRowGroup>
        {years.map((year, row) => (
          <DataGridSelectableRow key={year} row={row}>
            <div role='rowheader'>FY{year}</div>
            {quarters.map((quarter, col) => (
              <DataGridSelectableCell
                key={quarter}
                col={col}
                cellKey={`FY${year}-${quarter}`}
                aria-label={`${quarter} FY${year}`}
              >
                {quarter}
              </DataGridSelectableCell>
            ))}
          </DataGridSelectableRow>
        ))}
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}

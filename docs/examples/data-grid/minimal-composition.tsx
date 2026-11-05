import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGrid aria-label='Release checklist' defaultActive='0:0' className='dataGridSheet'>
      <DataGridRowGroup>
        <DataGridRow row={0}>
          <DataGridCell col={0}>Design</DataGridCell>
          <DataGridCell col={1}>Build</DataGridCell>
          <DataGridCell col={2}>Ship</DataGridCell>
        </DataGridRow>
        <DataGridRow row={1}>
          <DataGridCell col={0}>Done</DataGridCell>
          <DataGridCell col={1}>In progress</DataGridCell>
          <DataGridCell col={2}>Not started</DataGridCell>
        </DataGridRow>
      </DataGridRowGroup>
    </DataGrid>
  );
}

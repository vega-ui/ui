import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGridSelectable aria-label='Quarter' defaultActive='q1' className='selectableGrid'>
      <DataGridSelectableRowGroup>
        <DataGridSelectableRow row={0}>
          <DataGridSelectableCell col={0} cellKey='q1'>Q1</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q2'>Q2</DataGridSelectableCell>
        </DataGridSelectableRow>
        <DataGridSelectableRow row={1}>
          <DataGridSelectableCell col={0} cellKey='q3'>Q3</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q4'>Q4</DataGridSelectableCell>
        </DataGridSelectableRow>
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}

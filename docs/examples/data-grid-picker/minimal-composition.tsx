import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DataGridPicker aria-label='Plan length' defaultActive='1m' style={{ width: 240 }}>
      <DataGridPickerRowGroup>
        <DataGridPickerRow row={0}>
          <DataGridPickerItem col={0} value='1m'>1 mo</DataGridPickerItem>
          <DataGridPickerItem col={1} value='6m'>6 mo</DataGridPickerItem>
          <DataGridPickerItem col={2} value='12m'>12 mo</DataGridPickerItem>
        </DataGridPickerRow>
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}

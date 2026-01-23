import { DataGridApiRef } from '../../DataGrid';

export const focusPickerValue = <K = number>(api: DataGridApiRef<K> | null, value: K) => {
  if (!api) return
  
  const element = api.grid.getNodeByKey(value)?.payload
  if (!element) return;
  
  element.focus({ preventScroll: true })
}
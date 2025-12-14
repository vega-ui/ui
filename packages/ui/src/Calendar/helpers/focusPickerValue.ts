import { DataGridApiRef } from '../../DataGrid';

export const focusPickerValue = <K = number>(api: DataGridApiRef<K> | null, value: K) => {
  if (!api) return
  
  const position = api.keyMap.get(value)
  if (!position) return;
  
  const element = api.grid.getNode(position)
  if (!element) return;
  element.payload?.focus({ preventScroll: true })
}
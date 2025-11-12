export const getCellCoordinates = (element: HTMLElement): [number, number] | undefined => {
  const row = element.dataset?.row
  const col = element.dataset?.col
  if (row && col) return [Number(row), Number(col)]
  
  const closest = element.closest('[role="gridcell"]') as HTMLElement | null
  if (!closest) return
  
  const elemRow = closest.dataset.row ?? closest.getAttribute('data-row')
  const elemCol = closest.dataset.col ?? closest.getAttribute('data-col')
  if (row == null || col == null) return
  
  return [Number(elemRow), Number(elemCol)]
}
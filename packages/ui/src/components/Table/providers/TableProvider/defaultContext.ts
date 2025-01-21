export interface TableContextData {
  dataAlign?: 'start' | 'center' | 'end' | 'between'
  edgePadded?: boolean
}

export const defaultTableContext: TableContextData = {
  dataAlign: undefined,
  edgePadded: undefined
}
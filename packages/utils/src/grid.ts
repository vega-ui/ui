import { Matrix, MatrixNode, MatrixRow } from './matrix';

export type GridExcludeResolver<K> = (key: K) => boolean
export type GridExclude<K> = K | K[] | GridExcludeResolver<K>
export interface GridOptions<K> {
  exclude?: GridExclude<K>
}

export class Grid<N = HTMLElement, K = string> {
  private matrix = new Matrix<N, K>()
  
  compare(a: [number, number], b: [number, number]): -1 | 0 | 1 {
    return this.matrix.compare(a, b)
  }
  
  equals(a: [number, number], b: [number, number]): boolean {
    return this.matrix.equals(a, b)
  }
  
  getNode(position: [number, number]): MatrixNode<N, K> | undefined {
    return this.matrix.findCell(position)
  }
  
  addNode(position: [number, number], key: K, node: N): MatrixNode<N, K> {
    return this.matrix.addCell(position, key, node)
  }
  
  getRow(position: number) {
    return this.matrix.getRow(position)
  }
  
  getRowByDelta(position: number, delta: number) {
    const index = this.matrix.getRowIndex(position)
    const deltaIndex = this.matrix.getRowIndexes()[index + delta]
    return this.getRow(deltaIndex)
  }
  
  firstRow() {
    const index = this.matrix.getFirstRowIndex()
    return this.getRow(index)
  }
  
  lastRow() {
    const index = this.matrix.getLastRowIndex()
    return this.getRow(index)
  }
  
  next(position: [number, number]): MatrixNode<N, K> | undefined {
    const row = this.matrix.getRow(position[0])
    return row?.next(position[1])
  }
  
  prev(position: [number, number]): MatrixNode<N, K> | undefined {
    const row = this.matrix.getRow(position[0])
    return row?.prev(position[1])
  }
  
  above(position: [number, number]): MatrixNode<N, K> | undefined {
    const [rowIndex, colIndex] = position
    const prevRow = this.prevRow(rowIndex)
    if (!prevRow) return

    const node = prevRow.get(colIndex)
    if (!node && prevRow.index !== this.matrix.getFirstRowIndex()) return this.above([prevRow.index, colIndex])

    return node
  }
  
  below(position: [number, number]): MatrixNode<N, K> | undefined {
    const [rowIndex, colIndex] = position
    const nextRow = this.nextRow(rowIndex)
    if (!nextRow) return
    
    const node = nextRow.get(colIndex)
    if (!node && nextRow.index !== this.matrix.getLastRowIndex()) return this.below([nextRow.index, colIndex])
    
    return node
  }
  
  before(position: [number, number], axis: 0 | 1, wrap?: boolean): MatrixNode<N, K> | undefined {
    const [row, col] = position

    let node = axis === 0
      ? this.prev(position)
      : this.above(position)

    if (!node && wrap) {
      const lastRowIndex = this.lastRow()?.index
      if (lastRowIndex === undefined) return
      
      node = axis === 0
        ? this.prevRow(row)?.last()
        : this.prev([lastRowIndex, col])
    }
    
    return node
  }
  
  after(position: [number, number], axis: 0 | 1, wrap?: boolean): MatrixNode<N, K> | undefined {
    const [row, col] = position
    
    let node = axis === 0
      ? this.next(position)
      : this.below(position)

    if (!node && wrap) {
      const firstRowIndex = this.firstRow()?.index
      if (firstRowIndex === undefined) return
      
      node = axis === 0
        ? this.nextRow(row)?.first()
        : this.next([firstRowIndex, col])
    }
    
    return node
  }
  
  nextRow(position: number): MatrixRow<MatrixNode<N, K>> | undefined {
    const index = this.matrix.getRowIndex(position)
    const nextIndex = this.matrix.getRowIndexes()[index + 1]
    
    return this.matrix.getRow(nextIndex)
  }
  
  prevRow(position: number): MatrixRow<MatrixNode<N, K>> | undefined {
    const index = this.matrix.getRowIndex(position)
    const prevIndex = this.matrix.getRowIndexes()[index - 1]
    
    return this.matrix.getRow(prevIndex)
  }
}
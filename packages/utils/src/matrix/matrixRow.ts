import { MatrixIndexes } from './matrixIndexes';

export class MatrixRow<V = unknown> {
  readonly index: number
  
  private row = new Map<number, V>()
  private columnIndexes = new MatrixIndexes()
  
  constructor(index: number) {
    this.index = index
  }
  
  size(): number {
    return this.row.size
  }
  
  set(node: V, index: number) {
    this.columnIndexes.add(index)
    this.row.set(index, node)
  }
  
  get(index: number) {
    return this.row.get(index)
  }
  
  remove(index: number) {
    this.row.delete(index)
    this.columnIndexes.remove(index)
  }
  
  first(): V | undefined {
    const firstIndex = this.firstColumnIndex()
    return this.get(firstIndex)
  }
  
  last(): V | undefined {
    const lastIndex = this.lastColumnIndex()
    return this.get(lastIndex)
  }
  
  next(pos: number) {
    const index = this.getColumnIndex(pos)
    const nextIndex = this.getColumnIndexes()[index + 1]
    
    return this.get(nextIndex)
  }
  
  prev(pos: number) {
    const index = this.getColumnIndex(pos)
    const prevIndex = this.getColumnIndexes()[index - 1]
    
    return this.get(prevIndex)
  }
  
  getColumnIndexes(): number[] {
    return this.columnIndexes.indexes
  }
  
  getColumnIndex(pos: number) {
    return this.columnIndexes.indexes.indexOf(pos)
  }
  
  firstColumnIndex(): number {
    return this.columnIndexes.first()
  }
  
  lastColumnIndex(): number {
    return this.columnIndexes.last()
  }
  
  *[Symbol.iterator](): IterableIterator<V> {
    for (const columnIndex of this.columnIndexes.indexes) {
      const value = this.row.get(columnIndex);
      if (value !== undefined) yield value;
    }
  }
}


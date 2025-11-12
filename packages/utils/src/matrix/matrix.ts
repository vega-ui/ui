import { MatrixNode } from './matrixNode';
import { MatrixRow } from './matrixRow';
import { MatrixIndexes } from './matrixIndexes';

export class Matrix<P = unknown, K = string> {
  private matrix = new Map<number, MatrixRow<MatrixNode<P, K>>>();
  private rowIndexes = new MatrixIndexes()
  
  getRow(index: number): MatrixRow<MatrixNode<P, K>> | undefined {
    return this.matrix.get(index)
  }
  
  setRow(index: number): MatrixRow<MatrixNode<P, K>> {
    const row = new MatrixRow<MatrixNode<P, K>>(index)
    this.matrix.set(index, row)
    this.rowIndexes.add(index)
    
    return row
  }
  
  getOrCreateRow(index: number): MatrixRow<MatrixNode<P, K>> {
    const row = this.getRow(index)
    if (!row) return this.setRow(index)
    
    return row
  }
  
  findCell(index: [number, number]): MatrixNode<P, K> | undefined {
    return this.getRow(index[0])?.get(index[1])
  }
  
  addCell(index: [number, number], key?: K, payload?: P): MatrixNode<P, K> {
    const node = new MatrixNode(index, key, payload)
    this.insertCell(node, index)
    
    return node
  }
  
  compare(a: [number, number], b: [number, number]): -1 | 0 | 1 {
    if (a[0] < b[0]) return -1;
    if (a[0] > b[0]) return 1;
    
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    
    return 0
  }
  
  equals(a: [number, number], b: [number, number]): boolean {
    return a[0] === b[0] && a[1] === b[1]
  }
  
  head(count: number): MatrixRow<MatrixNode<P, K>>[] {
    const result: MatrixRow<MatrixNode<P, K>>[] = []
    const headIndexes = this.rowIndexes.head(count)
    
    for (let i = 0; i <= headIndexes.length - 1; i++) {
      result.push(this.getRow(headIndexes[i])!)
    }
    
    return result
  }
  
  tail(count: number): MatrixRow<MatrixNode<P, K>>[] {
    const result: MatrixRow<MatrixNode<P, K>>[] = []
    const tailIndexes = this.rowIndexes.tail(count)
    
    for (let i = 0; i <= tailIndexes.length - 1; i++) {
      result.push(this.getRow(tailIndexes[i])!)
    }
    
    return result
  }
  
  getRowIndexes() {
    return this.rowIndexes.indexes
  }
  
  getRowIndex(pos: number) {
    return this.rowIndexes.indexes.indexOf(pos)
  }
  
  getFirstRowIndex() {
    return this.rowIndexes.first()
  }
  
  getLastRowIndex() {
    return this.rowIndexes.last()
  }
  
  private insertCell(node: MatrixNode<P, K>, index: [number, number]) {
    const row = this.getOrCreateRow(index[0])
    row.set(node, index[1])
  }
}
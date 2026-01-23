import { describe, it, expect } from 'vitest';
import { Matrix, MatrixRow, MatrixNode } from '../../../data';

describe('Matrix', () => {
  it('getRow/setRow/getOrCreateRow manage rows and row indexes', () => {
    const m = new Matrix<number, string>();
    
    expect(m.getRow(5)).toBeUndefined();
    
    const r5 = m.setRow(5);
    expect(r5).toBeInstanceOf(MatrixRow);
    expect(m.getRow(5)).toBe(r5);
    
    const r5b = m.getOrCreateRow(5);
    expect(r5b).toBe(r5); // same instance
    
    const r2 = m.getOrCreateRow(2);
    expect(r2).toBeInstanceOf(MatrixRow);
    
    // row indexes are sorted
    expect(m.getRowIndexes()).toEqual([2, 5]);
    expect(m.getRowIndex(2)).toBe(0);
    expect(m.getRowIndex(5)).toBe(1);
    
    expect(m.getFirstRowIndex()).toBe(2);
    expect(m.getLastRowIndex()).toBe(5);
  });
  
  it('removeCell removes node from row', () => {
    const m = new Matrix<number, string>();
    
    m.addCell([0, 0], '0:0', 1);
    m.addCell([0, 2], '0:2', 2);
    m.addCell([1, 0], '1:0', 3);
    
    expect(m.findCell([0, 0])?.key).toBe('0:0');
    expect(m.findCell([0, 2])?.key).toBe('0:2');
    expect(m.getRow(0)?.getColumnIndexes()).toEqual([0, 2]);
    expect(m.getRowIndexes()).toEqual([0, 1]);
    
    m.removeCell([0, 0]);
    
    expect(m.findCell([0, 0])).toBeUndefined();
    expect(m.findCell([0, 2])?.key).toBe('0:2');
    expect(m.getRow(0)?.getColumnIndexes()).toEqual([2]);
    expect(m.getRowIndexes()).toEqual([0, 1]);
  });
  
  it('removeCell deletes empty row and updates rowIndexes', () => {
    const m = new Matrix<number, string>();
    
    m.addCell([0, 0], '0:0', 1);
    m.addCell([2, 0], '2:0', 2);
    
    expect(m.getRowIndexes()).toEqual([0, 2]);
    expect(m.getRow(0)).toBeInstanceOf(MatrixRow);
    
    m.removeCell([0, 0]);
    
    expect(m.findCell([0, 0])).toBeUndefined();
    expect(m.getRow(0)).toBeUndefined();
    expect(m.getRowIndexes()).toEqual([2]);
    expect(m.getFirstRowIndex()).toBe(2);
    expect(m.getLastRowIndex()).toBe(2);
  });
  
  it('removeCell is no-op when row does not exist', () => {
    const m = new Matrix<number, string>();
    
    m.addCell([1, 1], '1:1', 1);
    
    expect(m.getRowIndexes()).toEqual([1]);
    
    m.removeCell([99, 0]);
    
    expect(m.getRowIndexes()).toEqual([1]);
    expect(m.findCell([1, 1])?.key).toBe('1:1');
  });
  
  it('addCell creates rows as needed and findCell returns inserted nodes', () => {
    const m = new Matrix<number, string>();
    
    const n00 = m.addCell([0, 0], '0:0', 1);
    const n02 = m.addCell([0, 2], '0:2', 2);
    const n10 = m.addCell([1, 0], '1:0', 3);
    
    expect(n00).toBeInstanceOf(MatrixNode);
    expect(n00.index).toEqual([0, 0]);
    expect(n00.key).toBe('0:0');
    
    expect(m.findCell([0, 0])).toBe(n00);
    expect(m.findCell([0, 2])).toBe(n02);
    expect(m.findCell([1, 0])).toBe(n10);
    expect(m.findCell([9, 9])).toBeUndefined();
    
    expect(m.getRowIndexes()).toEqual([0, 1]);
    expect(m.getRow(0)?.getColumnIndexes()).toEqual([0, 2]);
    expect(m.getRow(1)?.getColumnIndexes()).toEqual([0]);
  });
  
  it('compare returns -1/0/1 in row-major order; equals checks exact coords', () => {
    const m = new Matrix();
    
    expect(m.compare([0, 0], [0, 1])).toBe(-1);
    expect(m.compare([0, 2], [0, 2])).toBe(0);
    expect(m.compare([1, 0], [0, 5])).toBe(1);
    
    expect(m.equals([1, 2], [1, 2])).toBe(true);
    expect(m.equals([1, 2], [2, 1])).toBe(false);
  });
  
  it('head returns first N rows by index (clamped)', () => {
    const m = new Matrix<number, string>();
    // create rows: 5, 1, 3 (unsorted insertion)
    m.setRow(5);
    m.setRow(1);
    m.setRow(3);
    
    // row order should be [1,3,5]
    const head0 = m.head(0);
    const head1 = m.head(1);
    const head2 = m.head(2);
    const head10 = m.head(10);
    
    expect(head0).toEqual([]);
    expect(head1.map(r => r.index)).toEqual([1]);
    expect(head2.map(r => r.index)).toEqual([1, 3]);
    expect(head10.map(r => r.index)).toEqual([1, 3, 5]);
  });
  
  it('tail returns last N rows by index (clamped)', () => {
    const m = new Matrix<number, string>();
    [2, 4, 7, 10].forEach(i => m.setRow(i));
    
    const t0 = m.tail(0);
    const t1 = m.tail(1);
    const t2 = m.tail(2);
    const t10 = m.tail(10);
    
    expect(t0).toEqual([]);
    expect(t1.map(r => r.index)).toEqual([10]);
    expect(t2.map(r => r.index)).toEqual([7, 10]);
    expect(t10.map(r => r.index)).toEqual([2, 4, 7, 10]);
  });
  
  it('rows receive inserted cells via insertCell path in addCell', () => {
    const m = new Matrix<string, string>();
    m.addCell([3, 5], '3:5', 'A');
    m.addCell([3, 1], '3:1', 'B');
    m.addCell([1, 2], '1:2', 'C');
    
    const r1 = m.getRow(1)!;
    const r3 = m.getRow(3)!;
    
    expect(r1.get(2)?.key).toBe('1:2');
    expect(r3.get(1)?.key).toBe('3:1');
    expect(r3.get(5)?.key).toBe('3:5');
    
    expect(r3.getColumnIndexes()).toEqual([1, 5]);
  });
});

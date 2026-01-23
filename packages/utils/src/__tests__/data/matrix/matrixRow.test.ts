import { describe, it, expect } from 'vitest';
import { MatrixRow } from '../../../data';

describe('MatrixRow', () => {
  it('initializes with index and is empty', () => {
    const row = new MatrixRow<string>(5);
    expect(row.index).toBe(5);
    expect(row.size()).toBe(0);
    expect(row.first()).toBeUndefined();
    expect(row.last()).toBeUndefined();
    expect(row.getColumnIndexes()).toEqual([]);
  });
  
  it('set/get store values by column index and keep sorted indexes', () => {
    const row = new MatrixRow<number>(0);
    
    row.set(100, 3);
    row.set(200, 1);
    row.set(300, 2);
    
    expect(row.size()).toBe(3);
    expect(row.get(1)).toBe(200);
    expect(row.get(2)).toBe(300);
    expect(row.get(3)).toBe(100);
    
    // column indexes are sorted
    expect(row.getColumnIndexes()).toEqual([1, 2, 3]);
  });
  
  it('first/last return boundary values', () => {
    const row = new MatrixRow<string>(0);
    row.set('b', 2);
    row.set('a', 1);
    row.set('c', 3);
    
    expect(row.first()).toBe('a'); // col 1
    expect(row.last()).toBe('c');  // col 3
    
    // boundary column indexes
    expect(row.firstColumnIndex()).toBe(1);
    expect(row.lastColumnIndex()).toBe(3);
  });
  
  it('next/prev navigate by column index (value argument is column index)', () => {
    const row = new MatrixRow<string>(0);
    row.set('a', 1);
    row.set('b', 3);
    row.set('c', 7);
    
    // indexes: [1, 3, 7]
    expect(row.next(1)).toBe('b'); // next after col 1 -> col 3
    expect(row.next(3)).toBe('c'); // next after col 3 -> col 7
    expect(row.next(7)).toBeUndefined(); // last has no next
    
    expect(row.prev(7)).toBe('b'); // prev before col 7 -> col 3
    expect(row.prev(3)).toBe('a'); // prev before col 3 -> col 1
    expect(row.prev(1)).toBeUndefined(); // first has no prev
  });
  
  it('remove deletes values and updates indexes', () => {
    const row = new MatrixRow<number>(0);
    row.set(10, 2);
    row.set(20, 4);
    row.set(30, 6);
    
    expect(row.size()).toBe(3);
    expect(row.getColumnIndexes()).toEqual([2, 4, 6]);
    
    row.remove(4);
    expect(row.size()).toBe(2);
    expect(row.getColumnIndexes()).toEqual([2, 6]);
    expect(row.get(4)).toBeUndefined();
    
    // removing non-existing index is a no-op
    row.remove(100);
    expect(row.size()).toBe(2);
    expect(row.getColumnIndexes()).toEqual([2, 6]);
  });
  
  it('getColumnIndex returns position in the internal index list', () => {
    const row = new MatrixRow<string>(0);
    row.set('x', 10);
    row.set('y', 20);
    row.set('z', 30);
    
    // indexes: [10, 20, 30]
    expect(row.getColumnIndex(10)).toBe(0);
    expect(row.getColumnIndex(20)).toBe(1);
    expect(row.getColumnIndex(30)).toBe(2);
    
    // unknown column index -> -1
    expect(row.getColumnIndex(999)).toBe(-1);
  });
  
  it('iterator yields values in ascending column order', () => {
    const row = new MatrixRow<string>(0);
    row.set('c', 3);
    row.set('a', 1);
    row.set('b', 2);
    
    const collected = Array.from(row);
    expect(collected).toEqual(['a', 'b', 'c']);
  });
  
  it('works with object payloads', () => {
    type Cell = { id: number; val: string };
    const row = new MatrixRow<Cell>(0);
    
    row.set({ id: 1, val: 'A' }, 5);
    row.set({ id: 2, val: 'B' }, 1);
    
    expect(row.first()).toEqual({ id: 2, val: 'B' }); // col 1
    expect(row.last()).toEqual({ id: 1, val: 'A' });  // col 5
  });
});

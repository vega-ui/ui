import { describe, it, expect } from 'vitest';
import { MatrixIndexes } from '../../matrix/matrixIndexes';

describe('MatrixIndexes', () => {
  it('adds values in sorted unique order', () => {
    const m = new MatrixIndexes();
    m.add(5);
    m.add(1);
    m.add(3);
    m.add(3); // duplicate
    m.add(2);
    m.add(4);
    
    expect(m.indexes).toEqual([1, 2, 3, 4, 5]);
  });
  
  it('remove returns true on existing value and false otherwise', () => {
    const m = new MatrixIndexes();
    [1, 2, 3].forEach(v => m.add(v));
    
    expect(m.remove(2)).toBe(true);
    expect(m.indexes).toEqual([1, 3]);
    
    expect(m.remove(2)).toBe(false);
    expect(m.indexes).toEqual([1, 3]);
  });
  
  it('first/last return boundary elements (or undefined when empty)', () => {
    const m = new MatrixIndexes();
    
    expect(m.first()).toBeUndefined();
    expect(m.last()).toBeUndefined();
    
    [10, 5, 7].forEach(v => m.add(v));
    expect(m.first()).toBe(5);
    expect(m.last()).toBe(10);
  });
  
  it('next/prev operate on positions (not values)', () => {
    const m = new MatrixIndexes();
    [10, 20, 30].forEach(v => m.add(v));
    
    // positions: 0 -> 10, 1 -> 20, 2 -> 30
    expect(m.next(0)).toBe(20);
    expect(m.next(1)).toBe(30);
    expect(m.next(2)).toBeUndefined();
    
    expect(m.prev(2)).toBe(20);
    expect(m.prev(1)).toBe(10);
    expect(m.prev(0)).toBeUndefined();
  });
  
  it('head returns first N items (clamped to length)', () => {
    const m = new MatrixIndexes();
    [1, 2, 3, 4, 5].forEach(v => m.add(v));
    
    expect(m.head(0)).toEqual([]);
    expect(m.head(1)).toEqual([1]);
    expect(m.head(3)).toEqual([1, 2, 3]);
    expect(m.head(10)).toEqual([1, 2, 3, 4, 5]);
  });
  
  it('tail returns last N items in natural order (clamped to length)', () => {
    const m = new MatrixIndexes();
    [1, 2, 3, 4, 5].forEach(v => m.add(v));
    
    // Expected behavior:
    // last 0 -> []
    // last 1 -> [5]
    // last 2 -> [4, 5]
    // last 10 -> [1,2,3,4,5]
    expect(m.tail(0)).toEqual([]);
    expect(m.tail(1)).toEqual([5]);
    expect(m.tail(2)).toEqual([4, 5]);
    expect(m.tail(10)).toEqual([1, 2, 3, 4, 5]);
  });
  
  it('remove works correctly at boundaries and maintains sort', () => {
    const m = new MatrixIndexes();
    [1, 2, 3, 4, 5].forEach(v => m.add(v));
    
    expect(m.remove(1)).toBe(true);
    expect(m.indexes).toEqual([2, 3, 4, 5]);
    
    expect(m.remove(5)).toBe(true);
    expect(m.indexes).toEqual([2, 3, 4]);
    
    expect(m.remove(3)).toBe(true);
    expect(m.indexes).toEqual([2, 4]);
    
    // Removing non-existing value leaves array unchanged
    expect(m.remove(42)).toBe(false);
    expect(m.indexes).toEqual([2, 4]);
  });
  
  it('handles many inserts in arbitrary order and stays sorted', () => {
    const m = new MatrixIndexes();
    const values = [7, 1, 9, 3, 8, 2, 6, 4, 5, 0, 10, 10, 3, 7];
    values.forEach(v => m.add(v));
    
    expect(m.indexes).toEqual([0,1,2,3,4,5,6,7,8,9,10]);
  });
});

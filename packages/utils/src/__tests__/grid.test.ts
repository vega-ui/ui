/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Grid } from '../grid';

// simple helper to create payload nodes
const el = (id: string) => {
  const d = document.createElement('div');
  d.id = id;
  return d;
};

describe('Grid', () => {
  let grid: Grid<HTMLElement, string>;
  
  beforeEach(() => {
    grid = new Grid<HTMLElement, string>();
  });
  
  it('addNode / getNode store and retrieve by [row, col]', () => {
    const a = grid.addNode([0, 0], '0:0', el('a'));
    const b = grid.addNode([0, 1], '0:1', el('b'));
    const c = grid.addNode([1, 0], '1:0', el('c'));
    
    expect(a.index).toEqual([0, 0]);
    expect(b.index).toEqual([0, 1]);
    expect(c.index).toEqual([1, 0]);
    
    expect(grid.getNode([0, 0])?.key).toBe('0:0');
    expect(grid.getNode([0, 1])?.key).toBe('0:1');
    expect(grid.getNode([1, 0])?.key).toBe('1:0');
    expect(grid.getNode([9, 9])).toBeUndefined();
  });
  
  it('getRow / firstRow / lastRow return MatrixRow wrappers', () => {
    // note: sparse/non-sequential row indices should still sort
    grid.addNode([10, 1], '10:1', el('x'));
    grid.addNode([5,  0], '5:0', el('y'));
    grid.addNode([20, 2], '20:2', el('z'));
    
    expect(grid.getRow(5)?.index).toBe(5);
    expect(grid.getRow(10)?.index).toBe(10);
    expect(grid.getRow(20)?.index).toBe(20);
    
    expect(grid.firstRow()?.index).toBe(5);
    expect(grid.lastRow()?.index).toBe(20);
  });
  
  it('getRowByDelta moves by row positions (sparse rows supported)', () => {
    grid.addNode([2, 0], '2:0', el('a'));
    grid.addNode([5, 0], '5:0', el('b'));
    grid.addNode([9, 0], '9:0', el('c'));
    // row index order: [2,5,9]
    
    // from row 5, -1 => row 2
    expect(grid.getRowByDelta(5, -1)?.index).toBe(2);
    // from row 5, +1 => row 9
    expect(grid.getRowByDelta(5, 1)?.index).toBe(9);
    // out of range returns undefined
    expect(grid.getRowByDelta(2, -1)).toBeUndefined();
    expect(grid.getRowByDelta(9, 1)).toBeUndefined();
  });
  
  it('next / prev move horizontally within the same row', () => {
    grid.addNode([0, 0], '0:0', el('a'));
    grid.addNode([0, 2], '0:2', el('b'));
    grid.addNode([0, 5], '0:5', el('c'));
    // columns in row 0: [0,2,5]
    
    expect(grid.next([0, 0])?.key).toBe('0:2');
    expect(grid.next([0, 2])?.key).toBe('0:5');
    expect(grid.next([0, 5])).toBeUndefined();
    
    expect(grid.prev([0, 5])?.key).toBe('0:2');
    expect(grid.prev([0, 2])?.key).toBe('0:0');
    expect(grid.prev([0, 0])).toBeUndefined();
  });
  
  it('above / below search vertically in same column, skipping empty rows', () => {
    // Column 1 has nodes on rows 0, 4, 10; rows 1..3,5..9 are empty
    grid.addNode([0, 1], '0:1', el('r0'));
    grid.addNode([4, 1], '4:1', el('r4'));
    grid.addNode([10,1], '10:1', el('r10'));
    
    expect(grid.below([0, 1])?.key).toBe('4:1');
    expect(grid.below([4, 1])?.key).toBe('10:1');
    expect(grid.below([10,1])).toBeUndefined();
    
    expect(grid.above([10,1])?.key).toBe('4:1');
    expect(grid.above([4, 1])?.key).toBe('0:1');
    expect(grid.above([0, 1])).toBeUndefined();
  });
  
  it('before (axis=0) and after (axis=0) move horizontally; wrap switches row edges when enabled', () => {
    // Row 0: cols [1,3]; Row 1: cols [0,2]
    grid.addNode([0, 1], '0:1', el('a'));
    grid.addNode([0, 3], '0:3', el('b'));
    grid.addNode([1, 0], '1:0', el('c'));
    grid.addNode([1, 2], '1:2', el('d'));
    
    // Without wrap: at row 0, col 1 -> before = undefined, after = 0:3
    expect(grid.before([0, 1], 0, false)).toBeUndefined();
    expect(grid.after([0, 1], 0, false)?.key).toBe('0:3');
    
    // With wrap horizontally: before from first in row0 should go to last of prev row (none) -> undefined
    // because there is no previous row to row 0
    expect(grid.before([0, 1], 0, true)).toBeUndefined();
    
    // From row1, col0: before (wrap) goes to last of previous row (row0 -> col3)
    expect(grid.before([1, 0], 0, true)?.key).toBe('0:3');
    
    // From row0, col3: after (wrap) goes to first of next row (row1 -> col0)
    expect(grid.after([0, 3], 0, true)?.key).toBe('1:0');
  });
  
  it('before (axis=1) and after (axis=1) move vertically; wrap jumps to last/first row respectively', () => {
    // Column 2 exists on rows 0 and 3 only
    grid.addNode([0, 2], '0:2', el('a'));
    grid.addNode([3, 2], '3:2', el('b'));
    
    // No wrap: before from top is undefined; after from bottom is undefined
    expect(grid.before([0, 2], 1, false)).toBeUndefined();
    expect(grid.after([3, 2], 1, false)).toBeUndefined();
  });
  
  it('nextRow / prevRow follow row order', () => {
    grid.addNode([2, 0], '2:0', el('r2'));
    grid.addNode([5, 0], '5:0', el('r5'));
    grid.addNode([9, 0], '9:0', el('r9'));
    
    expect(grid.prevRow(5)?.index).toBe(2);
    expect(grid.prevRow(2)).toBeUndefined();
    
    expect(grid.nextRow(5)?.index).toBe(9);
    expect(grid.nextRow(9)).toBeUndefined();
  });
});

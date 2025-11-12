import { describe, it, expect } from 'vitest';
import { MatrixNode } from '../../matrix/matrixNode';

describe('MatrixNode', () => {
  it('creates a node with index only', () => {
    const index: [number, number] = [2, 3];
    const node = new MatrixNode(index);
    
    expect(node.index).toBe(index); // same reference
    expect(node.index).toEqual([2, 3]);
    expect(node.key).toBeUndefined();
    expect(node.payload).toBeUndefined();
  });
  
  it('creates a node with index and key', () => {
    const node = new MatrixNode<[number, number], string>([0, 1], '0:1');
    
    expect(node.index).toEqual([0, 1]);
    expect(node.key).toBe('0:1');
    expect(node.payload).toBeUndefined();
  });
  
  it('creates a node with index, key, and payload (object payload)', () => {
    const payload = { id: 42, focus: true };
    const node = new MatrixNode<typeof payload, string>([5, 6], '5:6', payload);
    
    expect(node.index).toEqual([5, 6]);
    expect(node.key).toBe('5:6');
    expect(node.payload).toBe(payload);
  });
  
  it('allows undefined key and defined payload', () => {
    const payload = { value: 'x' };
    const node = new MatrixNode<typeof payload, string>([3, 4], undefined, payload);
    
    expect(node.index).toEqual([3, 4]);
    expect(node.key).toBeUndefined();
    expect(node.payload).toEqual({ value: 'x' });
  });
  
  it('does not clone index array (keeps reference)', () => {
    const idx: [number, number] = [7, 8];
    const node = new MatrixNode(idx, '7:8');
    expect(node.index).toBe(idx);
    
    idx[0] = 9;
    expect(node.index).toEqual([9, 8]);
  });
});

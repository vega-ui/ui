import { describe, it, expect } from 'vitest';
import { BiMap } from '../../data';

describe('BiMap', () => {
  it('creates empty map', () => {
    const map = new BiMap<string, number>();
    expect(map.size).toBe(0);
  });
  
  it('initializes with values', () => {
    const map = new BiMap<string, number>([['A', 1], ['B', 2]]);
    expect(map.size).toBe(2);
    expect(map.getByKey('A')).toBe(1);
    expect(map.getByValue(2)).toBe('B');
  });
  
  it('sets and gets values by key and value', () => {
    const map = new BiMap<string, number>();
    map.set('A', 5);
    
    expect(map.getByKey('A')).toBe(5);
    expect(map.getByValue(5)).toBe('A');
  });
  
  it('overwrites value for existing key', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    map.set('A', 2);
    
    expect(map.size).toBe(1);
    expect(map.getByKey('A')).toBe(2);
    expect(map.getByValue(1)).toBeUndefined();
    expect(map.getByValue(2)).toBe('A');
  });
  
  it('overwrites key for existing value', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    map.set('B', 1);
    
    expect(map.size).toBe(1);
    expect(map.getByKey('A')).toBeUndefined();
    expect(map.getByKey('B')).toBe(1);
    expect(map.getByValue(1)).toBe('B');
  });
  
  it('maintains bijection on conflicting set', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    map.set('B', 2);
    map.set('A', 2);
    
    expect(map.size).toBe(1);
    expect(map.getByKey('A')).toBe(2);
    expect(map.getByKey('B')).toBeUndefined();
    expect(map.getByValue(2)).toBe('A');
  });
  
  it('hasKey / hasValue', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    
    expect(map.hasKey('A')).toBe(true);
    expect(map.hasValue(1)).toBe(true);
    expect(map.hasKey('B')).toBe(false);
    expect(map.hasValue(2)).toBe(false);
  });
  
  it('deleteByKey', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    
    expect(map.deleteByKey('A')).toBe(true);
    expect(map.size).toBe(0);
    expect(map.getByValue(1)).toBeUndefined();
  });
  
  it('deleteByValue', () => {
    const map = new BiMap<string, number>();
    map.set('A', 1);
    
    expect(map.deleteByValue(1)).toBe(true);
    expect(map.size).toBe(0);
    expect(map.getByKey('A')).toBeUndefined();
  });
  
  it('delete returns false for missing entries', () => {
    const map = new BiMap<string, number>();
    
    expect(map.deleteByKey('A')).toBe(false);
    expect(map.deleteByValue(1)).toBe(false);
  });
  
  it('clear removes all entries', () => {
    const map = new BiMap<string, number>([['A', 1], ['B', 2]]);
    map.clear();
    
    expect(map.size).toBe(0);
    expect(map.getByKey('A')).toBeUndefined();
    expect(map.getByValue(2)).toBeUndefined();
  });
  
  it('keys, values, entries', () => {
    const map = new BiMap<string, number>([['A', 1], ['B', 2]]);
    
    expect(Array.from(map.keys())).toEqual(['A', 'B']);
    expect(Array.from(map.values())).toEqual([1, 2]);
    expect(Array.from(map.entries())).toEqual([['A', 1], ['B', 2]]);
  });
  
  it('snapshot returns stable array copy', () => {
    const map = new BiMap<string, number>([['A', 1]]);
    const snap = map.snapshot();
    
    expect(snap).toEqual([['A', 1]]);
    map.set('B', 2);
    expect(snap).toEqual([['A', 1]]);
  });
  
  it('supports symbol keys', () => {
    const k = Symbol('key');
    const v = Symbol('value');
    const map = new BiMap<symbol, symbol>();
    
    map.set(k, v);
    expect(map.getByKey(k)).toBe(v);
    expect(map.getByValue(v)).toBe(k);
  });
});
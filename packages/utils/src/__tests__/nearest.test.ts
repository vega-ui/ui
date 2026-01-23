import { describe, expect, it } from 'vitest';
import { nearest } from '../nearest';

describe('nearest', () => {
  it('returns -1 for empty array', () => {
    expect(nearest([], 10)).toBe(-1);
  });
  
  it('returns 0 for single-element array', () => {
    expect(nearest([5], -100)).toBe(0);
    expect(nearest([5], 5)).toBe(0);
    expect(nearest([5], 100)).toBe(0);
  });
  
  it('returns 0 when x is less than or equal to the first element', () => {
    expect(nearest([10, 20, 30], -1)).toBe(0);
    expect(nearest([10, 20, 30], 10)).toBe(0);
  });
  
  it('returns last index when x is greater than or equal to the last element', () => {
    expect(nearest([10, 20, 30], 30)).toBe(2);
    expect(nearest([10, 20, 30], 999)).toBe(2);
  });
  
  it('returns index of exact match', () => {
    expect(nearest([1, 4, 7, 10], 7)).toBe(2);
  });
  
  it('returns nearest lower when x is closer to prev', () => {
    expect(nearest([0, 10, 20], 12)).toBe(1); // |12-10|=2 vs |20-12|=8
  });
  
  it('returns nearest higher when x is closer to next', () => {
    expect(nearest([0, 10, 20], 18)).toBe(2); // |18-10|=8 vs |20-18|=2
  });
  
  it('breaks ties towards prev (lower index)', () => {
    expect(nearest([0, 10, 20], 15)).toBe(1); // tie: 5 and 5 -> prev
  });
  
  it('works with negative numbers', () => {
    expect(nearest([-10, -5, 0, 5], -7)).toBe(1); // -5 closer than -10
    expect(nearest([-10, -5, 0, 5], -9)).toBe(0); // -10 closer than -5
  });
  
  it('works with floats', () => {
    expect(nearest([0.1, 0.2, 0.3], 0.26)).toBe(2);
    expect(nearest([0.1, 0.2, 0.3], 0.24)).toBe(1);
    expect(nearest([0.1, 0.2, 0.3], 0.25)).toBe(1); // tie -> prev (0.2)
  });
  
  it('handles arrays with duplicate values', () => {
    expect(nearest([1, 2, 2, 2, 3], 2)).toBe(1); // first occurrence due to lower_bound search
    expect(nearest([1, 2, 2, 2, 3], 2.1)).toBe(3); // nearest among 2s (lo ends at 4 -> compare 2 vs 3)
  });
});
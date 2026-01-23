import { describe, expect, it } from 'vitest';
import { getClampedDate } from '../../date';

describe('getClampedDate', () => {
  it('returns a new Date instance with the same time when within bounds', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-02-01T00:00:00.000Z');
    
    const result = getClampedDate(date, min, max);
    
    expect(result).not.toBe(date);
    expect(result.getTime()).toBe(date.getTime());
  });
  
  it('clamps to min when date is below min', () => {
    const date = new Date('2023-12-31T23:59:59.000Z');
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-02-01T00:00:00.000Z');
    
    const result = getClampedDate(date, min, max);
    
    expect(result.getTime()).toBe(min.getTime());
    expect(result).not.toBe(min);
  });
  
  it('clamps to max when date is above max', () => {
    const date = new Date('2024-02-01T00:00:01.000Z');
    const min = new Date('2024-01-01T00:00:00.000Z');
    const max = new Date('2024-02-01T00:00:00.000Z');
    
    const result = getClampedDate(date, min, max);
    
    expect(result.getTime()).toBe(max.getTime());
    expect(result).not.toBe(max);
  });
  
  it('works without min/max and returns a new Date instance', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    
    const result = getClampedDate(date);
    
    expect(result).not.toBe(date);
    expect(result.getTime()).toBe(date.getTime());
  });
  
  it('handles min only', () => {
    const date = new Date('2023-12-31T00:00:00.000Z');
    const min = new Date('2024-01-01T00:00:00.000Z');
    
    const result = getClampedDate(date, min);
    
    expect(result.getTime()).toBe(min.getTime());
  });
  
  it('handles max only', () => {
    const date = new Date('2024-02-02T00:00:00.000Z');
    const max = new Date('2024-02-01T00:00:00.000Z');
    
    const result = getClampedDate(date, undefined, max);
    
    expect(result.getTime()).toBe(max.getTime());
  });
  
  it('prefers min when min is after max and date is outside', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    const min = new Date('2024-02-01T00:00:00.000Z');
    const max = new Date('2024-01-01T00:00:00.000Z');
    
    const result = getClampedDate(date, min, max);
    
    expect(result.getTime()).toBe(min.getTime());
  });
});
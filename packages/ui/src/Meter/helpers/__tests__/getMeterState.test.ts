import { describe, expect, it } from 'vitest';
import { getMeterState } from '../getMeterState';

describe('getMeterState', () => {
  it('has no state without optimum', () => {
    expect(getMeterState({ value: 50, min: 0, max: 100 })).toBeNull();
  });

  it('is good inside the optimum region and bad outside it', () => {
    expect(getMeterState({ value: 50, min: 0, max: 100, low: 30, high: 70, optimum: 50 })).toBe('good');
    expect(getMeterState({ value: 80, min: 0, max: 100, low: 30, high: 70, optimum: 50 })).toBe('bad');
  });

  it('grades from good to bad away from a low optimum', () => {
    const range = { min: 0, max: 100, low: 30, high: 70, optimum: 10 };

    expect(getMeterState({ value: 20, ...range })).toBe('good');
    expect(getMeterState({ value: 50, ...range })).toBe('warn');
    expect(getMeterState({ value: 90, ...range })).toBe('bad');
  });

  it('grades from good to bad away from a high optimum', () => {
    const range = { min: 0, max: 100, low: 30, high: 70, optimum: 90 };

    expect(getMeterState({ value: 80, ...range })).toBe('good');
    expect(getMeterState({ value: 50, ...range })).toBe('warn');
    expect(getMeterState({ value: 10, ...range })).toBe('bad');
  });

  it('clamps the value into min and max', () => {
    expect(getMeterState({ value: 500, min: 0, max: 100, low: 30, high: 70, optimum: 90 })).toBe('good');
  });
});

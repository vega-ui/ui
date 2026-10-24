import { describe, expect, it } from 'vitest';
import { snapToStep } from '../snapToStep';

describe('snapToStep', () => {
  it('rounds to the nearest step', () => {
    expect(snapToStep(23, { min: 0, max: 100, step: 10 })).toBe(20);
    expect(snapToStep(26, { min: 0, max: 100, step: 10 })).toBe(30);
  });

  it('counts steps from min', () => {
    expect(snapToStep(4, { min: 1, max: 9, step: 2 })).toBe(5);
    expect(snapToStep(2.9, { min: 1, max: 9, step: 2 })).toBe(3);
  });

  it('clamps to min and max', () => {
    expect(snapToStep(-2, { min: 0, max: 100, step: 5 })).toBe(0);
    expect(snapToStep(140, { min: 0, max: 100, step: 5 })).toBe(100);
  });

  it('stops at the last step that fits in max', () => {
    expect(snapToStep(100, { min: 0, max: 100, step: 30 })).toBe(90);
    expect(snapToStep(98, { min: 0, max: 100, step: 30 })).toBe(90);
  });

  it('rounds to the precision of the step', () => {
    expect(snapToStep(0.1 + 0.2, { min: 0, max: 1, step: 0.1 })).toBe(0.3);
    expect(snapToStep(0.7, { min: 0, max: 1, step: 0.1 })).toBe(0.7);
  });

  it('reaches a max that is a step away in floating point', () => {
    expect(snapToStep(0.3, { min: 0, max: 0.3, step: 0.1 })).toBe(0.3);
  });

  it('rounds to the precision of min', () => {
    expect(snapToStep(1.3, { min: 0.25, max: 5, step: 1 })).toBe(1.25);
  });

  it('only clamps with step any', () => {
    expect(snapToStep(12.345, { min: 0, max: 100, step: 'any' })).toBe(12.345);
    expect(snapToStep(-1, { min: 0, max: 100, step: 'any' })).toBe(0);
  });

  it('only clamps with a non-positive step', () => {
    expect(snapToStep(12.5, { min: 0, max: 100, step: 0 })).toBe(12.5);
  });
});

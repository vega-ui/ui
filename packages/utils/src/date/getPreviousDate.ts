import { shiftDays } from './shiftDays';

export const getPreviousDate = (d: Date, shift: number = 1): Date => shiftDays(d, -Math.trunc(shift))
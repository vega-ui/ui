import type { KeyboardSpec } from './types';

const example = 'time-field/quarter-hour-step.tsx';
const input = { role: 'textbox', name: 'Class starts' };
const left = (count: number) => Array.from({ length: count }, () => ({ press: 'ArrowLeft' }));

export default [
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'With the caret in the hours: steps them by one. In the minutes or seconds: steps them by `step` (1 by default). A segment wraps around its range without changing the others. `step={0}` turns stepping off.',
    ru: 'С кареткой в часах: меняет их на единицу. В минутах или секундах: меняет их на `step` (по умолчанию 1). Сегмент переходит по кругу, не затрагивая остальные. `step={0}` выключает изменение стрелками.',
    checks: [
      { example, steps: [{ focus: input }], press: 'ArrowDown', before: [{ value: '18:45', of: input }], expect: [{ value: '18:30', of: input }] },
      { example, steps: [{ focus: input }], press: 'ArrowUp', expect: [{ value: '18:00', of: input }] },
      { example, steps: [{ focus: input }, ...left(4)], press: 'ArrowUp', expect: [{ value: '19:45', of: input }] },
      { example, steps: [{ focus: input }, ...left(4)], press: 'ArrowDown', expect: [{ value: '17:45', of: input }] },
    ],
  },
] satisfies KeyboardSpec;

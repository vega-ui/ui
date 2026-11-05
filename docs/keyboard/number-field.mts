import type { KeyboardSpec } from './types';

const example = 'number-field/seat-count.tsx';
const seats = { role: 'textbox', name: 'Seats' };

export default [
  {
    keys: ['ArrowUp'],
    en: 'Increases the value by one `step`, up to `max`. An empty field gets `min`, or 0 without it.',
    ru: 'Увеличивает значение на один `step`, не выше `max`. Пустое поле получает `min`, а без него 0.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'ArrowUp', before: [{ value: '5', of: seats }], expect: [{ value: '6', of: seats }, { focused: seats }] },
      { example, steps: [{ focus: seats }, { press: 'ControlOrMeta+a' }, { press: 'Backspace' }], press: 'ArrowUp', before: [{ value: '', of: seats }], expect: [{ value: '1', of: seats }] },
    ],
  },
  {
    keys: ['ArrowDown'],
    en: 'Decreases the value by one `step`, down to `min`.',
    ru: 'Уменьшает значение на один `step`, не ниже `min`.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'ArrowDown', before: [{ value: '5', of: seats }], expect: [{ value: '4', of: seats }] },
      { example, steps: [{ focus: seats }, { press: 'ArrowDown' }, { press: 'ArrowDown' }, { press: 'ArrowDown' }, { press: 'ArrowDown' }], press: 'ArrowDown', before: [{ value: '1', of: seats }], expect: [{ value: '1', of: seats }] },
    ],
  },
] satisfies KeyboardSpec;

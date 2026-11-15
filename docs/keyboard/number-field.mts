import type { KeyboardSpec } from './types';

const example = 'number-field/seat-count.tsx';
const seats = { role: 'spinbutton', name: 'Seats' };

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
  {
    keys: ['PageUp'],
    en: 'Increases the value by ten steps, up to `max`.',
    ru: 'Увеличивает значение на десять шагов, не выше `max`.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'PageUp', before: [{ value: '5', of: seats }], expect: [{ value: '15', of: seats }] },
    ],
  },
  {
    keys: ['PageDown'],
    en: 'Decreases the value by ten steps, down to `min`.',
    ru: 'Уменьшает значение на десять шагов, не ниже `min`.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'PageDown', before: [{ value: '5', of: seats }], expect: [{ value: '1', of: seats }] },
    ],
  },
  {
    keys: ['Home'],
    en: 'Sets the value to `min`. Without `min` the caret moves as in a plain input.',
    ru: 'Ставит значение `min`. Без `min` каретка двигается как в обычном поле.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'Home', before: [{ value: '5', of: seats }], expect: [{ value: '1', of: seats }] },
    ],
  },
  {
    keys: ['End'],
    en: 'Sets the value to `max`. Without `max` the caret moves as in a plain input.',
    ru: 'Ставит значение `max`. Без `max` каретка двигается как в обычном поле.',
    checks: [
      { example, steps: [{ focus: seats }], press: 'End', before: [{ value: '5', of: seats }], expect: [{ value: '50', of: seats }] },
    ],
  },
] satisfies KeyboardSpec;

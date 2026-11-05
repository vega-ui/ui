import type { KeyboardSpec } from './types';

const example = 'date-time-field/quarter-hour-steps.tsx';
const input = { role: 'textbox', name: 'Pickup' };
const trigger = { role: 'button', name: 'Choose pickup date' };
const previous = { role: 'button', name: 'Previous month' };
const left = (count: number) => Array.from({ length: count }, () => ({ press: 'ArrowLeft' }));

export default [
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'With the caret in the hours: steps them by one. In the minutes or seconds: steps them by `timeStep`. A segment wraps around its range without changing the others; in the date part the arrows do not change the value. `timeStep={0}` turns stepping off.',
    ru: 'С кареткой в часах: меняет их на единицу. В минутах или секундах: меняет их на `timeStep`. Сегмент переходит по кругу, не затрагивая остальные; в части с датой стрелки не меняют значение. `timeStep={0}` выключает изменение стрелками.',
    checks: [
      { example, steps: [{ focus: input }], press: 'ArrowDown', before: [{ value: '15.07.2026, 12:45', of: input }], expect: [{ value: '15.07.2026, 12:30', of: input }] },
      { example, steps: [{ focus: input }], press: 'ArrowUp', expect: [{ value: '15.07.2026, 12:00', of: input }] },
      { example, steps: [{ focus: input }, ...left(4)], press: 'ArrowUp', expect: [{ value: '15.07.2026, 13:45', of: input }] },
      { example, steps: [{ focus: input }, ...left(15)], press: 'ArrowDown', expect: [{ value: '15.07.2026, 12:45', of: input }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger button: opens or closes the calendar popup. The focus stays on the button.',
    ru: 'На кнопке-триггере: открывает или закрывает всплывающий календарь. Фокус остаётся на кнопке.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: previous }], expect: [{ visible: previous }, { focused: trigger }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }], press: 'Space', before: [{ visible: previous }], expect: [{ hidden: previous }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'From the open trigger: moves the focus into the popup, to its first header button.',
    ru: 'С открытого триггера: переносит фокус во всплывающий календарь, на первую кнопку шапки.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }], press: 'Tab', before: [{ visible: previous }], expect: [{ focused: previous }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'On a day in the popup: writes the day into the input and keeps the time. The other calendar keys work as in Calendar.',
    ru: 'На дне во всплывающем календаре: записывает день в поле, сохраняя время. Остальные клавиши календаря работают как в Calendar.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '16', nth: 2 } }], press: 'Enter', expect: [{ value: '16.07.2026, 12:45', of: input }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popup and returns the focus to the trigger button.',
    ru: 'Закрывает всплывающий календарь и возвращает фокус на кнопку-триггер.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '16', nth: 2 } }], press: 'Escape', expect: [{ hidden: previous }, { focused: trigger }, { value: '15.07.2026, 12:45', of: input }] },
    ],
  },
] satisfies KeyboardSpec;

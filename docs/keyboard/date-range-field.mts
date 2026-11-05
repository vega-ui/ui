import type { KeyboardSpec } from './types';

const example = 'date-range-field/booking-range-with-a-calendar-popover.tsx';
const input = { role: 'textbox', name: 'Stay' };
const trigger = { role: 'button', name: 'Choose stay dates' };
const previous = { role: 'button', name: 'Previous month' };
const range = (start: string, end: string) => `${start}\u00a0–\u00a0${end}`;
const july = (day: number) => ({ role: 'gridcell', name: String(day), nth: 2 });

export default [
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
    en: 'On a day in the popup: the first press starts a new range, the second ends it, and the range is written into the input. The other calendar keys work as in Calendar.',
    ru: 'На дне во всплывающем календаре: первое нажатие начинает новый диапазон, второе завершает его, и диапазон записывается в поле. Остальные клавиши календаря работают как в Calendar.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(11) }], press: 'Enter', before: [{ value: range('10.07.2026', '14.07.2026'), of: input }], expect: [{ value: '11.07.2026', of: input }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(11) }, { press: 'Enter' }, { focus: july(13) }], press: 'Enter', expect: [{ value: range('11.07.2026', '13.07.2026'), of: input }] },
    ],
  },
  {
    keys: ['Shift+ArrowLeft', 'Shift+ArrowRight', 'Shift+ArrowUp', 'Shift+ArrowDown'],
    en: 'On the start or end day of the range: moves that edge of the range with the focus.',
    ru: 'На первом или последнем дне диапазона: двигает этот край диапазона вместе с фокусом.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(10) }], press: 'Shift+ArrowRight', expect: [{ focused: july(11) }, { value: range('11.07.2026', '14.07.2026'), of: input }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(10) }], press: 'Shift+ArrowLeft', expect: [{ focused: july(9) }, { value: range('09.07.2026', '14.07.2026'), of: input }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(14) }], press: 'Shift+ArrowDown', expect: [{ focused: july(21) }, { value: range('10.07.2026', '21.07.2026'), of: input }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(14) }], press: 'Shift+ArrowUp', expect: [{ focused: july(7) }, { value: range('07.07.2026', '10.07.2026'), of: input }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popup and returns the focus to the trigger button.',
    ru: 'Закрывает всплывающий календарь и возвращает фокус на кнопку-триггер.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(11) }], press: 'Escape', expect: [{ hidden: previous }, { focused: trigger }, { value: range('10.07.2026', '14.07.2026'), of: input }] },
    ],
  },
] satisfies KeyboardSpec;

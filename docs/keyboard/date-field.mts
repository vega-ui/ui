import type { KeyboardSpec } from './types';

const example = 'date-field/typed-date-with-a-calendar-popover.tsx';
const input = { role: 'textbox', name: 'Payment due' };
const trigger = { role: 'button', name: 'Choose due date' };
const previous = { role: 'button', name: 'Previous month' };

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
    en: 'On a day in the popup: writes the day into the input. The popup stays open; the other calendar keys work as in Calendar.',
    ru: 'На дне во всплывающем календаре: записывает день в поле. Календарь остаётся открытым; остальные клавиши календаря работают как в Calendar.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '30', nth: 1 } }], press: 'Enter', before: [{ value: '31.03.2026', of: input }], expect: [{ value: '30.03.2026', of: input }, { visible: previous }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popup without changing the date and returns the focus to the trigger button.',
    ru: 'Закрывает всплывающий календарь, не меняя дату, и возвращает фокус на кнопку-триггер.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '30', nth: 1 } }, { press: 'ArrowLeft' }], press: 'Escape', expect: [{ hidden: previous }, { focused: trigger }, { value: '31.03.2026', of: input }] },
    ],
  },
] satisfies KeyboardSpec;

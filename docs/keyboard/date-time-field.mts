import type { KeyboardSpec } from './types';

const example = 'date-time-field/quarter-hour-steps.tsx';
const input = { role: 'textbox', name: 'Pickup' };
const trigger = { role: 'button', name: 'Choose pickup date' };
const previous = { role: 'button', name: 'Previous month' };
const next = { role: 'button', name: 'Next month' };
const july = (day: number) => ({ role: 'gridcell', name: String(day), nth: 2 });
const wheels = 'date-time-field/calendar-and-time-wheels.tsx';
const callInput = { role: 'textbox', name: 'Call starts at' };
const callTrigger = { role: 'button', name: 'Choose call date and time' };
const hours = { role: 'spinbutton', name: 'Hours' };
const timeButton = { role: 'button', name: 'Time 18:30' };
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
    en: 'On the trigger button: opens the calendar popup and moves the focus into the day grid: to the selected day, otherwise today, otherwise the first available day. On the time button under the calendar: opens the time wheels in a nested popover.',
    ru: 'На кнопке-триггере: открывает всплывающий календарь и переносит фокус в сетку дней: на выбранный день, иначе на сегодня, иначе на первый доступный день. На кнопке времени под календарём: открывает колёса времени во вложенном поповере.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: previous }], expect: [{ visible: previous }, { focused: july(15) }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: previous }], expect: [{ visible: previous }, { focused: july(15) }] },
      { example: wheels, steps: [{ focus: callTrigger }, { press: 'Enter' }, { focus: timeButton }], press: 'Enter', expect: [{ focused: hours }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'In the popup: moves the focus between the header buttons, the day grid and the time button. The popup is not modal: Tab from its last element leaves it, and it stays open until Escape, an outside click or the trigger.',
    ru: 'Во всплывающем окне: переносит фокус между кнопками шапки, сеткой дней и кнопкой времени. Окно не модальное: Tab с его последнего элемента выводит фокус наружу, а окно остаётся открытым до Escape, клика снаружи или нажатия на триггер.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }], press: 'Shift+Tab', before: [{ focused: july(15) }], expect: [{ focused: next }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: next }], press: 'Tab', before: [{ focused: next }], expect: [{ focused: july(15) }] },
      { example: wheels, steps: [{ focus: callTrigger }, { press: 'Enter' }], press: 'Tab', before: [{ focused: july(15) }], expect: [{ focused: timeButton }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On a day in the popup: writes the day into the input and keeps the time, and the popup stays open with the focus on the day for the time wheels, like a native `datetime-local` picker. The other calendar keys work as in Calendar.',
    ru: 'На дне во всплывающем окне: записывает день в поле, сохраняя время, и окно остаётся открытым с фокусом на дне для колёс времени, как нативный пикер `datetime-local`. Остальные клавиши календаря работают как в Calendar.',
    checks: [
      { example: wheels, steps: [{ focus: callTrigger }, { press: 'Enter' }, { focus: july(16) }], press: 'Enter', expect: [{ value: '16.07.2026, 18:30', of: callInput }, { visible: previous }, { focused: july(16) }] },
      { example: wheels, steps: [{ focus: callTrigger }, { press: 'Enter' }, { focus: july(16) }], press: 'Space', expect: [{ value: '16.07.2026, 18:30', of: callInput }, { visible: previous }, { focused: july(16) }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popup and returns the focus to the trigger button. In the time wheels: closes only them and returns the focus to the time button.',
    ru: 'Закрывает всплывающее окно и возвращает фокус на кнопку-триггер. В колёсах времени: закрывает только их и возвращает фокус на кнопку времени.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: july(16) }], press: 'Escape', expect: [{ hidden: previous }, { focused: trigger }, { value: '15.07.2026, 12:45', of: input }] },
      { example: wheels, steps: [{ focus: callTrigger }, { press: 'Enter' }, { focus: timeButton }, { press: 'Enter' }], press: 'Escape', before: [{ focused: hours }], expect: [{ focused: timeButton }, { visible: previous }] },
    ],
  },
] satisfies KeyboardSpec;

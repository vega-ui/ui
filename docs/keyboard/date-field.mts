import type { KeyboardSpec } from './types';

const example = 'date-field/typed-date-with-a-calendar-popover.tsx';
const input = { role: 'textbox', name: 'Payment due' };
const trigger = { role: 'button', name: 'Choose due date' };
const previous = { role: 'button', name: 'Previous month' };
const next = { role: 'button', name: 'Next month' };
const day = (name: string) => ({ role: 'gridcell', name, nth: 1 });

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger button: opens the calendar popup and moves the focus into the day grid: to the selected date, otherwise today, otherwise the first available date.',
    ru: 'На кнопке-триггере: открывает всплывающий календарь и переносит фокус в сетку дней: на выбранную дату, иначе на сегодня, иначе на первую доступную дату.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: previous }], expect: [{ visible: previous }, { focused: day('31') }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: previous }], expect: [{ visible: previous }, { focused: day('31') }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'In the popup: moves the focus between the header buttons and the day grid. The popup is not modal: Tab from its last element leaves it, and it stays open until Escape, an outside click or a pick.',
    ru: 'Во всплывающем календаре: переносит фокус между кнопками шапки и сеткой дней. Календарь не модальный: Tab с его последнего элемента выводит фокус наружу, а календарь остаётся открытым до Escape, клика снаружи или выбора дня.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }], press: 'Shift+Tab', before: [{ focused: day('31') }], expect: [{ focused: next }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: next }], press: 'Tab', before: [{ focused: next }], expect: [{ focused: day('31') }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On a day in the popup: writes the day into the input, closes the popup and returns the focus to the trigger button. The other calendar keys work as in Calendar.',
    ru: 'На дне во всплывающем календаре: записывает день в поле, закрывает календарь и возвращает фокус на кнопку-триггер. Остальные клавиши календаря работают как в Calendar.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: day('30') }], press: 'Enter', before: [{ value: '31.03.2026', of: input }], expect: [{ value: '30.03.2026', of: input }, { hidden: previous }, { focused: trigger }] },
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { focus: day('30') }], press: 'Space', expect: [{ value: '30.03.2026', of: input }, { hidden: previous }, { focused: trigger }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popup without changing the date and returns the focus to the trigger button.',
    ru: 'Закрывает всплывающий календарь, не меняя дату, и возвращает фокус на кнопку-триггер.',
    checks: [
      { example, steps: [{ focus: trigger }, { press: 'Enter' }, { press: 'ArrowLeft' }], press: 'Escape', expect: [{ hidden: previous }, { focused: trigger }, { value: '31.03.2026', of: input }] },
    ],
  },
] satisfies KeyboardSpec;

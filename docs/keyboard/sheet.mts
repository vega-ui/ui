import type { KeyboardSpec } from './types';

const example = 'sheet/minimal-composition.tsx';
const snaps = 'sheet/controlled-snap-point.tsx';
const trigger = { role: 'button', name: 'Order summary' };
const sheet = { role: 'dialog', name: 'Order summary' };
const close = { role: 'button', name: 'Close' };
const open = [{ focus: trigger }, { press: 'Enter' }];
const handle = { role: 'button', name: 'Resize sheet' };
const snap = (name: string) => ({ role: 'button', name });

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger: opens the sheet. The sheet itself takes the focus, or the child with `autoFocus`.',
    ru: 'На триггере: открывает шторку. Фокус получает сама шторка или дочерний элемент с `autoFocus`.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: sheet }], expect: [{ visible: sheet }, { focused: sheet }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: sheet }], expect: [{ visible: sheet }, { focused: sheet }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous control inside the sheet. The page behind is inert, so the focus does not reach it. A `SheetHandle` without several snap points is disabled and skipped.',
    ru: 'Переносит фокус на следующий или предыдущий элемент управления внутри шторки. Страница за ней инертна, и фокус на неё не попадает. `SheetHandle` без нескольких точек остановки отключён и пропускается.',
    checks: [
      { example, steps: open, press: 'Tab', before: [{ focused: sheet }], expect: [{ focused: close }] },
      { example, steps: [...open, { press: 'Tab' }, { press: 'Tab' }], press: 'Shift+Tab', before: [{ focused: { role: 'button', name: 'Pay $13.40' } }], expect: [{ focused: close }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On `SheetHandle` with several snap points: moves the sheet to the next higher snap point, and from the highest one back to the lowest.',
    ru: 'На `SheetHandle` с несколькими точками остановки: переводит шторку в следующую, более высокую точку, а из самой высокой — обратно в самую низкую.',
    checks: [
      { example: snaps, steps: [{ focus: { role: 'button', name: 'Bus 42 route' } }, { press: 'Enter' }, { focus: handle }], press: 'Enter', before: [{ attr: 'aria-pressed', of: snap('Peek'), is: 'true' }], expect: [{ attr: 'aria-pressed', of: snap('Half'), is: 'true' }, { focused: handle }] },
      { example: snaps, steps: [{ focus: { role: 'button', name: 'Bus 42 route' } }, { press: 'Enter' }, { click: snap('Full') }, { focus: handle }], press: 'Space', before: [{ attr: 'aria-pressed', of: snap('Full'), is: 'true' }], expect: [{ attr: 'aria-pressed', of: snap('Peek'), is: 'true' }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the sheet and returns the focus to the element that opened it. With `closedBy=\'none\'` it does nothing.',
    ru: 'Закрывает шторку и возвращает фокус на элемент, который её открыл. С `closedBy=\'none\'` ничего не делает.',
    checks: [
      { example, steps: [...open, { press: 'Tab' }], press: 'Escape', before: [{ visible: sheet }], expect: [{ hidden: sheet }, { focused: trigger }] },
    ],
  },
] satisfies KeyboardSpec;

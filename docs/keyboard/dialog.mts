import type { KeyboardSpec } from './types';

const example = 'dialog/minimal-composition.tsx';
const blocking = 'dialog/blocking-dialog.tsx';
const trigger = { role: 'button', name: 'Leave workspace' };
const dialog = { role: 'dialog', name: 'Leave Northwind Studio?' };
const timeout = { role: 'dialog', name: 'Your session is about to expire' };
const timeoutTrigger = { role: 'button', name: 'Simulate session timeout' };
const open = [{ focus: trigger }, { press: 'Enter' }];

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger: opens the dialog. The dialog itself takes the focus, or the child with `autoFocus`.',
    ru: 'На триггере: открывает диалог. Фокус получает сам диалог или дочерний элемент с `autoFocus`.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: dialog }], expect: [{ visible: dialog }, { focused: dialog }] },
      { example: blocking, steps: [{ focus: timeoutTrigger }], press: 'Space', before: [{ hidden: timeout }], expect: [{ visible: timeout }, { focused: { role: 'button', name: 'Stay signed in' } }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous control inside the dialog. The page behind is inert, so the focus does not reach it.',
    ru: 'Переносит фокус на следующий или предыдущий элемент управления внутри диалога. Страница за ним инертна, и фокус на неё не попадает.',
    checks: [
      { example, steps: open, press: 'Tab', before: [{ focused: dialog }], expect: [{ focused: { role: 'button', name: 'Close' } }] },
      { example, steps: [...open, { press: 'Tab' }, { press: 'Tab' }], press: 'Shift+Tab', before: [{ focused: { role: 'button', name: 'Stay' } }], expect: [{ focused: { role: 'button', name: 'Close' } }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the dialog and returns the focus to the element that opened it. With `closedBy=\'none\'` it does nothing.',
    ru: 'Закрывает диалог и возвращает фокус на элемент, который его открыл. С `closedBy=\'none\'` ничего не делает.',
    checks: [
      { example, steps: [...open, { press: 'Tab' }], press: 'Escape', before: [{ visible: dialog }], expect: [{ hidden: dialog }, { focused: trigger }] },
      { example: blocking, steps: [{ focus: timeoutTrigger }, { press: 'Enter' }], press: 'Escape', before: [{ visible: timeout }], expect: [{ visible: timeout }, { focused: { role: 'button', name: 'Stay signed in' } }] },
    ],
  },
] satisfies KeyboardSpec;

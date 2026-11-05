import type { KeyboardSpec } from './types';

const example = 'drawer/minimal-composition.tsx';
const trigger = { role: 'button', name: 'Keyboard shortcuts' };
const drawer = { role: 'dialog', name: 'Keyboard shortcuts' };
const close = { role: 'button', name: 'Close' };
const open = [{ focus: trigger }, { press: 'Enter' }];

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger: opens the drawer. The drawer itself takes the focus, or the child with `autoFocus`.',
    ru: 'На триггере: открывает панель. Фокус получает сама панель или дочерний элемент с `autoFocus`.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: drawer }], expect: [{ visible: drawer }, { focused: drawer }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: drawer }], expect: [{ visible: drawer }, { focused: drawer }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous control inside the drawer. The page behind is inert, so the focus does not reach it.',
    ru: 'Переносит фокус на следующий или предыдущий элемент управления внутри панели. Страница за ней инертна, и фокус на неё не попадает.',
    checks: [
      { example, steps: open, press: 'Tab', before: [{ focused: drawer }], expect: [{ focused: close }] },
      { example: 'drawer/short-form-flow.tsx', steps: [{ focus: { role: 'button', name: 'Invite members' } }, { press: 'Enter' }, { focus: { role: 'textbox', name: 'Emails' } }], press: 'Shift+Tab', expect: [{ focused: close }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the drawer and returns the focus to the element that opened it. With `closedBy=\'none\'` it does nothing.',
    ru: 'Закрывает панель и возвращает фокус на элемент, который её открыл. С `closedBy=\'none\'` ничего не делает.',
    checks: [
      { example, steps: [...open, { press: 'Tab' }], press: 'Escape', before: [{ visible: drawer }], expect: [{ hidden: drawer }, { focused: trigger }] },
    ],
  },
] satisfies KeyboardSpec;

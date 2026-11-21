import type { KeyboardSpec } from './types';

const example = 'toast/undo-archive.tsx';
const archive = { role: 'button', name: 'Archive' };
const archived = { role: 'status', name: 'Conversation archived' };
const undo = { role: 'button', name: 'Undo' };
const dismiss = { role: 'button', name: 'Dismiss' };

const overDialog = 'toast/toasts-over-dialog.tsx';
const share = { role: 'button', name: 'Share' };
const dialog = { role: 'dialog', name: 'Share Launch plan' };
const removed = { role: 'status', name: 'Mira Chen removed' };
const removeMira = { role: 'button', name: 'Remove Mira Chen' };
const removeJonas = { role: 'button', name: 'Remove Jonas Berg' };

export default [
  {
    keys: ['Escape'],
    en: 'With the focus in a toast: closes that toast, and only that toast, so a dialog around the toasts stays open. The focus moves into the next toast, or back to where it was before the toasts once the last one closes.',
    ru: 'Когда фокус в тосте: закрывает этот тост, и только его, поэтому диалог вокруг тостов остаётся открытым. Фокус переходит в следующий тост, а когда закрывается последний — возвращается туда, где был до тостов.',
    checks: [
      { example, steps: [{ click: archive }, { focus: undo }], press: 'Escape', before: [{ visible: archived }], expect: [{ hidden: archived }, { focused: archive }] },
      { example: overDialog, steps: [{ focus: share }, { press: 'Enter' }, { click: removeMira }, { focus: undo }], press: 'Escape', before: [{ visible: removed }, { visible: dialog }], expect: [{ hidden: removed }, { visible: dialog }, { focused: removeJonas }] },
      { example, steps: [{ click: archive }, { click: archive }, { focus: undo }], press: 'Escape', before: [{ visible: { ...archived, nth: 1 } }], expect: [{ hidden: { ...archived, nth: 1 } }, { focused: undo }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On a `ToastClose`: runs your `onClick`, like an Undo, and closes the toast unless the handler calls `preventDefault()`. It is a native `<button>`, or your own with `asChild`.',
    ru: 'На `ToastClose`: выполняет ваш `onClick`, например отмену, и закрывает тост, если обработчик не вызвал `preventDefault()`. Это нативный `<button>` или ваш собственный через `asChild`.',
    checks: [
      { example, steps: [{ click: archive }, { focus: undo }], press: 'Enter', before: [{ visible: archived }, { visible: { role: 'button', name: 'Move to inbox' } }], expect: [{ hidden: archived }, { hidden: { role: 'button', name: 'Move to inbox' } }, { focused: archive }] },
      { example, steps: [{ click: archive }, { focus: dismiss }], press: 'Space', before: [{ visible: archived }], expect: [{ hidden: archived }, { visible: { role: 'button', name: 'Move to inbox' } }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus through the buttons of the toasts like through any buttons. The toasts come last in the Tab order of the page, or of a modal dialog they are shown over. While the focus is in the toasts, the deck is expanded and the timers are paused.',
    ru: 'Переносит фокус по кнопкам тостов, как по любым кнопкам. Тосты идут последними в порядке табуляции страницы или модального диалога, над которым они показаны. Пока фокус в тостах, колода раскрыта, а таймеры на паузе.',
    checks: [
      { example, steps: [{ click: archive }, { focus: undo }], press: 'Tab', before: [{ visible: archived }], expect: [{ focused: dismiss }] },
      { example, steps: [{ click: archive }, { focus: dismiss }], press: 'Shift+Tab', before: [{ visible: archived }], expect: [{ focused: undo }] },
    ],
  },
] satisfies KeyboardSpec;

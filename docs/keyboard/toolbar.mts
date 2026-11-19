import type { KeyboardSpec } from './types';

const example = 'toolbar/minimal-composition.tsx';
const bold = { role: 'button', name: 'Bold' };
const italic = { role: 'button', name: 'Italic' };
const link = { role: 'button', name: 'Insert link' };

const editor = 'toolbar/text-editor.tsx';
const underline = { role: 'button', name: 'Underline' };
const alignStart = { role: 'radio', name: 'Align start' };
const alignCenter = { role: 'radio', name: 'Align center' };
const more = { role: 'button', name: 'More formatting' };
const moreMenu = { role: 'menu', name: 'More formatting' };
const strikethrough = { role: 'menuitemcheckbox', name: 'Strikethrough' };
const clear = { role: 'menuitem', name: 'Clear formatting' };

const vertical = 'toolbar/vertical-tools.tsx';
const select = { role: 'radio', name: 'Select' };
const hand = { role: 'radio', name: 'Hand' };
const eraser = { role: 'radio', name: 'Eraser' };
const zoomIn = { role: 'button', name: 'Zoom in' };
const zoomOut = { role: 'button', name: 'Zoom out' };

const readOnly = 'toolbar/read-only.tsx';
const editing = { role: 'switch', name: 'Editing' };
const readOnlyBold = { role: 'button', name: 'Bold' };
const readOnlyItalic = { role: 'button', name: 'Italic' };
const comment = { role: 'button', name: 'Add comment' };
const share = { role: 'button', name: 'Share' };

const browser = 'toolbar/file-browser.tsx';
const search = { role: 'searchbox', name: 'Search files' };

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'In a horizontal toolbar: moves the focus to the next or previous enabled item, skipping disabled ones; the items of a `ToggleGroup` are items of the toolbar. From the last item it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left.',
    ru: 'В горизонтальной панели: переносит фокус на следующий или предыдущий доступный элемент, пропуская отключённые; элементы `ToggleGroup` — тоже элементы панели. С последнего элемента переходит на первый, а с первого — на последний. Клавиши следуют направлению текста, поэтому в right-to-left они зеркальны.',
    checks: [
      { example, steps: [{ focus: bold }], press: 'ArrowRight', expect: [{ focused: italic }] },
      { example, steps: [{ focus: bold }, { press: 'ArrowRight' }], press: 'ArrowLeft', expect: [{ focused: bold }] },
      { example, steps: [{ focus: bold }], press: 'ArrowLeft', expect: [{ focused: link }] },
      { example, steps: [{ focus: bold }, { press: 'ArrowLeft' }], press: 'ArrowRight', expect: [{ focused: bold }] },
      { example, dir: 'rtl', steps: [{ focus: bold }], press: 'ArrowLeft', expect: [{ focused: italic }] },
      { example: editor, steps: [{ focus: underline }], press: 'ArrowRight', expect: [{ focused: alignStart }] },
      { example: readOnly, steps: [{ focus: editing }, { press: 'Space' }, { focus: comment }], press: 'ArrowLeft', before: [{ attr: 'disabled', of: readOnlyBold, is: '' }], expect: [{ focused: share }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In a vertical toolbar: moves the focus to the next or previous enabled item, wrapping around the ends. Moving the focus to an item of a `ToggleGroup` does not press it.',
    ru: 'В вертикальной панели: переносит фокус на следующий или предыдущий доступный элемент; с краёв переходит на противоположный конец. Переход фокуса на элемент `ToggleGroup` его не нажимает.',
    checks: [
      { example: vertical, steps: [{ focus: select }], press: 'ArrowDown', expect: [{ focused: hand }, { attr: 'aria-checked', of: hand, is: 'false' }] },
      { example: vertical, steps: [{ focus: eraser }], press: 'ArrowDown', expect: [{ focused: zoomIn }] },
      { example: vertical, steps: [{ focus: select }], press: 'ArrowUp', expect: [{ focused: zoomOut }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In a horizontal toolbar, on an item that opens a `Menu`: opens the menu with the focus on its first item (Down) or on its last item (Up). While the menu is open, the arrow keys move between its items, and Escape gives the focus back to the item.',
    ru: 'В горизонтальной панели, на элементе, который открывает `Menu`: открывает меню с фокусом на первом пункте (вниз) или на последнем (вверх). Пока меню открыто, стрелки ходят по его пунктам, а Escape возвращает фокус на элемент.',
    checks: [
      { example: editor, steps: [{ focus: more }], press: 'ArrowDown', before: [{ hidden: moreMenu }], expect: [{ visible: moreMenu }, { focused: strikethrough }] },
      { example: editor, steps: [{ focus: more }], press: 'ArrowUp', expect: [{ visible: moreMenu }, { focused: clear }] },
      { example: editor, steps: [{ focus: more }, { press: 'ArrowDown' }], press: 'ArrowRight', expect: [{ focused: strikethrough }] },
      { example: editor, steps: [{ focus: more }, { press: 'ArrowDown' }], press: 'Escape', expect: [{ hidden: moreMenu }, { focused: more }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last enabled item.',
    ru: 'Переносит фокус на первый или последний доступный элемент.',
    checks: [
      { example, steps: [{ focus: bold }], press: 'End', expect: [{ focused: link }] },
      { example, steps: [{ focus: bold }, { press: 'End' }], press: 'Home', expect: [{ focused: bold }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Does what the focused control does: a button runs, a `Toggle` is pressed or released, an item of a `ToggleGroup` is pressed, a `MenuTrigger` opens its menu.',
    ru: 'Делает то же, что контрол в фокусе: кнопка срабатывает, `Toggle` нажимается или отжимается, элемент `ToggleGroup` нажимается, `MenuTrigger` открывает своё меню.',
    checks: [
      { example, steps: [{ focus: bold }], press: 'Enter', before: [{ attr: 'aria-pressed', of: bold, is: 'false' }], expect: [{ attr: 'aria-pressed', of: bold, is: 'true' }, { focused: bold }] },
      { example, steps: [{ focus: bold }], press: 'Space', before: [{ attr: 'aria-pressed', of: bold, is: 'false' }], expect: [{ attr: 'aria-pressed', of: bold, is: 'true' }] },
      { example: editor, steps: [{ focus: alignStart }, { press: 'ArrowRight' }], press: 'Space', before: [{ attr: 'aria-checked', of: alignCenter, is: 'false' }], expect: [{ attr: 'aria-checked', of: alignCenter, is: 'true' }, { attr: 'aria-checked', of: alignStart, is: 'false' }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'The toolbar is one tab stop: Tab enters it on the first enabled item, or on the item that had the focus last, and Tab or Shift+Tab from any item leaves it.',
    ru: 'Панель — одна остановка табуляции: Tab входит в неё на первом доступном элементе или на элементе, который был в фокусе последним, а Tab или Shift+Tab с любого элемента выводит из неё.',
    checks: [
      { example: readOnly, steps: [{ focus: editing }], press: 'Tab', expect: [{ focused: readOnlyBold }] },
      { example: readOnly, steps: [{ focus: editing }, { press: 'Space' }], press: 'Tab', expect: [{ focused: comment }] },
      { example: readOnly, steps: [{ focus: readOnlyBold }, { press: 'ArrowRight' }], press: 'Shift+Tab', expect: [{ focused: editing }] },
      { example: readOnly, steps: [{ focus: readOnlyBold }, { press: 'ArrowRight' }, { press: 'Shift+Tab' }], press: 'Tab', expect: [{ focused: readOnlyItalic }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowRight', 'Home', 'End'],
    en: 'In a text field item: moves the caret, and the focus stays in the field. Put the field last in a horizontal toolbar, as the arrow keys do not move the focus out of it.',
    ru: 'В элементе-текстовом поле: двигает каретку, а фокус остаётся в поле. Ставьте поле последним в горизонтальной панели, потому что стрелки не выводят фокус из него.',
    checks: [
      { example: browser, steps: [{ focus: search }], press: 'ArrowRight', expect: [{ focused: search }] },
      { example: browser, steps: [{ focus: search }], press: 'ArrowLeft', expect: [{ focused: search }] },
      { example: browser, steps: [{ focus: search }], press: 'Home', expect: [{ focused: search }] },
      { example: browser, steps: [{ focus: search }], press: 'End', expect: [{ focused: search }] },
    ],
  },
] satisfies KeyboardSpec;

import type { KeyboardSpec } from './types';

const example = 'context-menu/photo-selection.tsx';
const photo = { role: 'button', name: 'Lisbon.jpg' };
const menu = { role: 'menu', name: 'Lisbon.jpg' };
const item = (name: string) => ({ role: 'menuitem', name });
const open = [{ focus: photo }, { press: 'Shift+F10' }, { focus: item('Download') }];

const files = 'context-menu/file-list.tsx';
const more = { role: 'button', name: 'Actions for Q3 report.pdf' };
const fileMenu = { role: 'menu', name: 'Q3 report.pdf' };
const shareItem = item('Share');
const shareMenu = { role: 'menu', name: 'Share' };
const onShare = [{ focus: more }, { press: 'Shift+F10' }, { press: 'End' }, { press: 'ArrowUp' }];
const inShare = [...onShare, { press: 'ArrowRight' }];

export default [
  {
    keys: ['Shift+F10'],
    en: 'With the focus on an element inside the area: opens the menu at that element instead of the menu of the browser, and moves the focus to its first item. The context menu key does the same where the keyboard has one.',
    ru: 'Когда фокус на элементе внутри области: открывает меню у этого элемента вместо меню браузера и переносит фокус на его первый пункт. Клавиша контекстного меню делает то же самое, если она есть на клавиатуре.',
    checks: [
      { example, steps: [{ focus: photo }], press: 'Shift+F10', before: [{ hidden: menu }], expect: [{ visible: menu }, { focused: item('Download') }] },
      { example: files, steps: [{ focus: more }], press: 'Shift+F10', before: [{ hidden: fileMenu }], expect: [{ visible: fileMenu }, { focused: item('Open') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In the menu: moves the focus to the next or previous item. From the last item it moves to the first, and from the first to the last. Disabled items take the focus too.',
    ru: 'В меню: переносит фокус на следующий или предыдущий пункт. С последнего пункта переходит на первый, а с первого — на последний. Отключённые пункты тоже получают фокус.',
    checks: [
      { example, steps: open, press: 'ArrowDown', before: [{ focused: item('Download') }], expect: [{ focused: item('Copy link') }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'ArrowUp', expect: [{ focused: item('Download') }] },
      { example, steps: open, press: 'ArrowUp', before: [{ focused: item('Download') }], expect: [{ focused: item('Set as cover') }] },
      { example, steps: [...open, { press: 'ArrowUp' }], press: 'ArrowDown', expect: [{ focused: item('Download') }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'In the menu: moves the focus to the first or last item.',
    ru: 'В меню: переносит фокус на первый или последний пункт.',
    checks: [
      { example, steps: open, press: 'End', expect: [{ focused: item('Set as cover') }] },
      { example, steps: [...open, { press: 'End' }], press: 'Home', expect: [{ focused: item('Download') }] },
    ],
  },
  {
    keys: ['c'],
    en: 'Typeahead: a printable character moves the focus to the next item whose label starts with the typed text. Disabled items are included. The label is the text of the item, or its `label` prop.',
    ru: 'Поиск при наборе: печатный символ переносит фокус на следующий пункт, чья подпись начинается с набранного текста. Отключённые пункты тоже участвуют. Подпись — текст пункта или его проп `label`.',
    checks: [
      { example, steps: open, press: 'c', before: [{ focused: item('Download') }], expect: [{ focused: item('Copy link') }] },
      { example, steps: open, press: 's', expect: [{ focused: item('Set as cover') }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'In the menu: runs the focused item and closes the menu; the browser gives the focus back to the element that had it when the menu opened. An item of a submenu closes every menu. A disabled item does nothing, and a `preventDefault()` in the `onClick` of an item keeps the menu open.',
    ru: 'В меню: выполняет пункт в фокусе и закрывает меню; браузер возвращает фокус на элемент, который был в фокусе, когда меню открылось. Пункт вложенного меню закрывает все меню. Отключённый пункт ничего не делает, а `preventDefault()` в `onClick` пункта оставляет меню открытым.',
    checks: [
      { example, steps: open, press: 'Enter', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: photo }] },
      { example: files, steps: inShare, press: 'Enter', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { hidden: fileMenu }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On an item that opens a submenu: opens the submenu and moves the focus to its first item.',
    ru: 'На пункте, который открывает вложенное меню: открывает его и переносит фокус на его первый пункт.',
    checks: [
      { example: files, steps: onShare, press: 'Enter', before: [{ focused: shareItem }, { hidden: shareMenu }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }] },
      { example: files, steps: onShare, press: 'Space', before: [{ hidden: shareMenu }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }] },
    ],
  },
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'On an item that opens a submenu, the Right arrow opens the submenu with the focus on its first item; in a submenu, the Left arrow closes it and returns the focus to its item. In a right-to-left page the two arrows swap.',
    ru: 'На пункте, который открывает вложенное меню, стрелка вправо открывает его с фокусом на первом пункте; во вложенном меню стрелка влево закрывает его и возвращает фокус на его пункт. На странице с письмом справа налево стрелки меняются местами.',
    checks: [
      { example: files, steps: onShare, press: 'ArrowRight', before: [{ hidden: shareMenu }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }] },
      { example: files, steps: inShare, press: 'ArrowLeft', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { visible: fileMenu }, { focused: shareItem }] },
    ],
  },
  {
    keys: ['Space'],
    en: 'In the menu: runs a plain item like Enter. A checkbox or radio item is checked or unchecked, and the menu stays open.',
    ru: 'В меню: выполняет обычный пункт, как Enter. Пункт-флажок или радиопункт отмечается или снимается, а меню остаётся открытым.',
    checks: [
      { example, steps: open, press: 'Space', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: photo }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the menu without running an item; the browser gives the focus back to the element that had it when the menu opened. In a submenu it closes only the submenu and returns the focus to its item.',
    ru: 'Закрывает меню, не выполняя пункт; браузер возвращает фокус на элемент, который был в фокусе, когда меню открылось. Во вложенном меню закрывает только его и возвращает фокус на его пункт.',
    checks: [
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Escape', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: photo }] },
      { example: files, steps: inShare, press: 'Escape', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { visible: fileMenu }, { focused: shareItem }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'In the menu: closes the menu and moves the focus on to the next or the previous element.',
    ru: 'В меню: закрывает меню и переносит фокус на следующий или предыдущий элемент.',
    checks: [
      { example, steps: open, press: 'Tab', before: [{ visible: menu }], expect: [{ hidden: menu }] },
      { example, steps: open, press: 'Shift+Tab', before: [{ visible: menu }], expect: [{ hidden: menu }] },
    ],
  },
] satisfies KeyboardSpec;

import type { KeyboardSpec } from './types';

const example = 'menu/minimal-composition.tsx';
const trigger = { role: 'button', name: 'Edit' };
const menu = { role: 'menu', name: 'Edit' };
const item = (name: string) => ({ role: 'menuitem', name });
const open = [{ focus: trigger }, { press: 'Enter' }, { focus: item('Undo') }];

const view = 'menu/view-options.tsx';
const viewTrigger = { role: 'button', name: 'View' };
const viewMenu = { role: 'menu', name: 'View' };
const showCompleted = { role: 'menuitemcheckbox', name: 'Show completed' };
const title = { role: 'menuitemradio', name: 'Title' };
const openView = [{ focus: viewTrigger }, { press: 'Enter' }, { focus: showCompleted }];

const zoom = 'menu/zoom-keep-open.tsx';
const zoomMenu = { role: 'menu', name: 'Zoom' };
const zoomIn = item('Zoom in');
const openZoom = [{ focus: { role: 'button', name: 'Zoom 100%' } }, { press: 'Enter' }, { focus: zoomIn }];

const priority = 'menu/priority-typeahead.tsx';
const openPriority = [{ focus: { role: 'button', name: 'Priority: Medium' } }, { press: 'Enter' }, { focus: { role: 'menuitemradio', name: 'Urgent' } }];

const share = 'menu/file-submenus.tsx';
const fileTrigger = { role: 'button', name: 'Actions for Q3 report.pdf' };
const fileMenu = { role: 'menu', name: 'Actions for Q3 report.pdf' };
const shareItem = item('Share');
const shareMenu = { role: 'menu', name: 'Share' };
const onShare = [{ focus: fileTrigger }, { press: 'Enter' }, { focus: item('Open') }, { press: 'End' }, { press: 'ArrowUp' }, { press: 'ArrowUp' }];
const inShare = [...onShare, { press: 'ArrowRight' }];

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger: opens the menu and moves the focus to its first item.',
    ru: 'На триггере: открывает меню и переносит фокус на его первый пункт.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: menu }, { attr: 'aria-expanded', of: trigger, is: 'false' }], expect: [{ visible: menu }, { focused: item('Undo') }, { attr: 'aria-expanded', of: trigger, is: 'true' }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: menu }], expect: [{ visible: menu }, { focused: item('Undo') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'On the trigger: opens the menu with the focus on the first item (Down) or on the last item (Up).',
    ru: 'На триггере: открывает меню с фокусом на первом пункте (вниз) или на последнем (вверх).',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'ArrowDown', before: [{ hidden: menu }], expect: [{ visible: menu }, { focused: item('Undo') }] },
      { example, steps: [{ focus: trigger }], press: 'ArrowUp', before: [{ hidden: menu }], expect: [{ visible: menu }, { focused: item('Paste') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In the menu: moves the focus to the next or previous item. From the last item it moves to the first, and from the first to the last. Disabled items take the focus too.',
    ru: 'В меню: переносит фокус на следующий или предыдущий пункт. С последнего пункта переходит на первый, а с первого — на последний. Отключённые пункты тоже получают фокус.',
    checks: [
      { example, steps: open, press: 'ArrowDown', before: [{ focused: item('Undo') }], expect: [{ focused: item('Redo') }, { attr: 'aria-disabled', of: item('Redo'), is: 'true' }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'ArrowUp', expect: [{ focused: item('Undo') }] },
      { example, steps: open, press: 'ArrowUp', before: [{ focused: item('Undo') }], expect: [{ focused: item('Paste') }] },
      { example, steps: [...open, { press: 'ArrowUp' }], press: 'ArrowDown', expect: [{ focused: item('Undo') }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'In the menu: moves the focus to the first or last item.',
    ru: 'В меню: переносит фокус на первый или последний пункт.',
    checks: [
      { example, steps: open, press: 'End', expect: [{ focused: item('Paste') }] },
      { example, steps: [...open, { press: 'End' }], press: 'Home', expect: [{ focused: item('Undo') }] },
    ],
  },
  {
    keys: ['c'],
    en: 'Typeahead: a printable character moves the focus to the next item whose label starts with the typed text; characters typed quickly add up, and the same character typed again moves on to the next item that starts with it. Disabled items are included. The label is the text of the item, or its `label` prop.',
    ru: 'Поиск при наборе: печатный символ переносит фокус на следующий пункт, чья подпись начинается с набранного текста; быстро набранные символы складываются, а тот же символ, набранный снова, переходит к следующему пункту на эту букву. Отключённые пункты тоже участвуют. Подпись — текст пункта или его проп `label`.',
    checks: [
      { example, steps: open, press: 'c', before: [{ focused: item('Undo') }], expect: [{ focused: item('Cut') }] },
      { example, steps: [...open, { press: 'c' }], press: 'c', before: [{ focused: item('Cut') }], expect: [{ focused: item('Copy') }] },
      { example, steps: open, press: 'r', expect: [{ focused: item('Redo') }] },
      { example: priority, steps: openPriority, press: 'h', before: [{ focused: { role: 'menuitemradio', name: 'Urgent' } }], expect: [{ focused: { role: 'menuitemradio', name: 'High' } }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'In the menu: runs the focused item, closes the menu and returns the focus to the trigger. An item of a submenu closes every menu. A checkbox or radio item is checked or unchecked and the menu stays open, unless the item has `keepOpen={false}`. A disabled item does nothing, and a `preventDefault()` in the `onClick` of an item keeps the menu open.',
    ru: 'В меню: выполняет пункт в фокусе, закрывает меню и возвращает фокус на триггер. Пункт вложенного меню закрывает все меню. Пункт-флажок или радиопункт отмечается или снимается, а меню остаётся открытым, если у пункта нет `keepOpen={false}`. Отключённый пункт ничего не делает, а `preventDefault()` в `onClick` пункта оставляет меню открытым.',
    checks: [
      { example: share, steps: inShare, press: 'Enter', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { hidden: fileMenu }, { focused: fileTrigger }] },
      { example, steps: open, press: 'Enter', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: trigger }, { attr: 'aria-expanded', of: trigger, is: 'false' }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Enter', before: [{ focused: item('Redo') }], expect: [{ visible: menu }, { focused: item('Redo') }] },
      { example: view, steps: openView, press: 'Enter', before: [{ attr: 'aria-checked', of: showCompleted, is: 'false' }], expect: [{ attr: 'aria-checked', of: showCompleted, is: 'true' }, { visible: viewMenu }, { focused: showCompleted }] },
      { example: zoom, steps: openZoom, press: 'Enter', before: [{ focused: zoomIn }], expect: [{ visible: zoomMenu }, { focused: zoomIn }, { visible: { role: 'button', name: 'Zoom 125%' } }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'On an item that opens a submenu: opens the submenu and moves the focus to its first item.',
    ru: 'На пункте, который открывает вложенное меню: открывает его и переносит фокус на его первый пункт.',
    checks: [
      { example: share, steps: onShare, press: 'Enter', before: [{ hidden: shareMenu }, { attr: 'aria-expanded', of: shareItem, is: 'false' }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }, { attr: 'aria-expanded', of: shareItem, is: 'true' }] },
      { example: share, steps: onShare, press: 'Space', before: [{ hidden: shareMenu }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }] },
    ],
  },
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'On an item that opens a submenu, the Right arrow opens the submenu with the focus on its first item; in a submenu, the Left arrow closes it and returns the focus to its item. In a right-to-left page the two arrows swap.',
    ru: 'На пункте, который открывает вложенное меню, стрелка вправо открывает его с фокусом на первом пункте; во вложенном меню стрелка влево закрывает его и возвращает фокус на его пункт. На странице с письмом справа налево стрелки меняются местами.',
    checks: [
      { example: share, steps: onShare, press: 'ArrowRight', before: [{ hidden: shareMenu }], expect: [{ visible: shareMenu }, { focused: item('Copy link') }] },
      { example: share, steps: inShare, press: 'ArrowLeft', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { visible: fileMenu }, { focused: shareItem }] },
    ],
  },
  {
    keys: ['Space'],
    en: 'In the menu: runs a plain item like Enter. A checkbox or radio item is checked or unchecked, and the menu stays open even with `keepOpen={false}`.',
    ru: 'В меню: выполняет обычный пункт, как Enter. Пункт-флажок или радиопункт отмечается или снимается, а меню остаётся открытым даже с `keepOpen={false}`.',
    checks: [
      { example, steps: open, press: 'Space', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: trigger }] },
      { example: view, steps: openView, press: 'Space', before: [{ attr: 'aria-checked', of: showCompleted, is: 'false' }], expect: [{ attr: 'aria-checked', of: showCompleted, is: 'true' }, { visible: viewMenu }, { focused: showCompleted }] },
      { example: view, steps: [...openView, { press: 'End' }], press: 'Space', before: [{ attr: 'aria-checked', of: title, is: 'false' }], expect: [{ attr: 'aria-checked', of: title, is: 'true' }, { attr: 'aria-checked', of: { role: 'menuitemradio', name: 'Due date' }, is: 'false' }, { visible: viewMenu }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the menu without running an item and returns the focus to the trigger. In a submenu it closes only the submenu and returns the focus to its item.',
    ru: 'Закрывает меню, не выполняя пункт, и возвращает фокус на триггер. Во вложенном меню закрывает только его и возвращает фокус на его пункт.',
    checks: [
      { example: share, steps: inShare, press: 'Escape', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { visible: fileMenu }, { focused: shareItem }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Escape', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: trigger }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'In the menu: Tab closes the menu and moves the focus on to the next element after it; Shift+Tab closes the menu and returns the focus to the trigger. From a submenu both close every menu.',
    ru: 'В меню: Tab закрывает меню и переносит фокус дальше, на следующий за ним элемент; Shift+Tab закрывает меню и возвращает фокус на триггер. Из вложенного меню оба закрывают все меню.',
    checks: [
      { example: share, steps: inShare, press: 'Shift+Tab', before: [{ visible: shareMenu }], expect: [{ hidden: shareMenu }, { hidden: fileMenu }, { focused: fileTrigger }] },
      { example, steps: open, press: 'Tab', before: [{ visible: menu }], expect: [{ hidden: menu }] },
      { example, steps: open, press: 'Shift+Tab', before: [{ visible: menu }], expect: [{ hidden: menu }, { focused: trigger }] },
    ],
  },
] satisfies KeyboardSpec;

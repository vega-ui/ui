import type { KeyboardSpec } from './types';

const example = 'pagination/button-based-pagination.tsx';
const page = (number: number) => ({ role: 'button', name: `Page ${number}` });
const next = { role: 'button', name: 'Next page' };

export default [
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus through the previous and next triggers and the page items in order. Ellipses and disabled triggers are not focusable.',
    ru: 'Переносит фокус по порядку через кнопки «назад» и «вперёд» и элементы страниц. Многоточия и отключённые кнопки не получают фокус.',
    checks: [
      { example, steps: [{ focus: page(1) }], press: 'Tab', expect: [{ focused: page(2) }] },
      { example, steps: [{ focus: page(5) }], press: 'Tab', expect: [{ focused: page(12) }] },
      { example, steps: [{ focus: next }], press: 'Shift+Tab', expect: [{ focused: page(12) }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Activates the focused item or trigger natively: buttons react to both keys, links only to Enter. The current page carries `aria-current=\'page\'`.',
    ru: 'Нативно активирует элемент или кнопку в фокусе: кнопки реагируют на обе клавиши, ссылки — только на Enter. Текущая страница получает `aria-current=\'page\'`.',
    checks: [
      { example, steps: [{ focus: page(2) }], press: 'Enter', before: [{ attr: 'aria-current', of: page(1), is: 'page' }], expect: [{ attr: 'aria-current', of: page(2), is: 'page' }, { attr: 'aria-current', of: page(1), is: null }] },
      { example, steps: [{ focus: next }], press: 'Space', expect: [{ attr: 'aria-current', of: page(2), is: 'page' }, { focused: next }] },
    ],
  },
] satisfies KeyboardSpec;

import type { KeyboardSpec } from './types';

const example = 'accordion/faq.tsx';
const shipping = { role: 'button', name: 'How long does shipping take?' };
const returns = { role: 'button', name: 'Can I return an item?' };

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Expands or collapses the section of the focused trigger. Without `multiple`, expanding a section collapses the open one.',
    ru: 'Раскрывает или сворачивает секцию триггера в фокусе. Без `multiple` раскрытие секции сворачивает открытую.',
    checks: [
      { example, steps: [{ focus: returns }], press: 'Enter', before: [{ attr: 'aria-expanded', of: returns, is: 'false' }], expect: [{ attr: 'aria-expanded', of: returns, is: 'true' }, { attr: 'aria-expanded', of: shipping, is: 'false' }, { focused: returns }] },
      { example, steps: [{ focus: shipping }], press: 'Space', before: [{ attr: 'aria-expanded', of: shipping, is: 'true' }], expect: [{ attr: 'aria-expanded', of: shipping, is: 'false' }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous trigger, through any focusable content of an expanded section.',
    ru: 'Переносит фокус на следующий или предыдущий триггер, проходя через фокусируемое содержимое раскрытой секции.',
    checks: [
      { example, steps: [{ focus: returns }], press: 'Tab', expect: [{ focused: { role: 'button', name: 'Which payment methods do you accept?' } }] },
      { example, steps: [{ focus: returns }], press: 'Shift+Tab', expect: [{ focused: shipping }] },
    ],
  },
] satisfies KeyboardSpec;

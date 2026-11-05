import type { KeyboardSpec } from './types';

const example = 'checkbox-card/plan-option-tile.tsx';
const support = { role: 'checkbox', name: /^Priority support/ };
const audit = { role: 'checkbox', name: /^Audit log/ };

export default [
  {
    keys: ['Space'],
    en: 'Checks or unchecks the focused card. The whole card is one native checkbox.',
    ru: 'Отмечает или снимает отметку с карточки в фокусе. Вся карточка — один нативный чекбокс.',
    checks: [
      { example, steps: [{ focus: support }], press: 'Space', before: [{ checked: false, of: support }], expect: [{ checked: true, of: support }] },
      { example, steps: [{ focus: audit }], press: 'Space', before: [{ checked: true, of: audit }], expect: [{ checked: false, of: audit }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus to the next or previous card. Each card is its own tab stop.',
    ru: 'Переносит фокус на следующую или предыдущую карточку. Каждая карточка — отдельная остановка табуляции.',
    checks: [
      { example, steps: [{ focus: support }], press: 'Tab', expect: [{ focused: audit }] },
      { example, steps: [{ focus: audit }], press: 'Shift+Tab', expect: [{ focused: support }] },
    ],
  },
] satisfies KeyboardSpec;

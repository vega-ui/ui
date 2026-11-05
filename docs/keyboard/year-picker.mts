import type { KeyboardSpec } from './types';

const example = 'year-picker/a-page-of-years.tsx';
const year = (value: number) => ({ role: 'gridcell', name: String(value) });

export default [
  {
    keys: ['ArrowLeft', 'ArrowRight'],
    en: 'Moves the focus to the previous or next year, wrapping to the neighbouring row. In RTL the arrows are mirrored: ← moves to the next year.',
    ru: 'Переносит фокус на предыдущий или следующий год с переходом на соседнюю строку. В RTL стрелки зеркальны: ← ведёт к следующему году.',
    checks: [
      { example, steps: [{ focus: year(2030) }], press: 'ArrowRight', expect: [{ focused: year(2031) }] },
      { example, steps: [{ focus: year(2029) }], press: 'ArrowLeft', expect: [{ focused: year(2028) }] },
      { example, dir: 'rtl', steps: [{ focus: year(2030) }], press: 'ArrowLeft', expect: [{ focused: year(2031) }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Moves the focus to the year above or below in the same column.',
    ru: 'Переносит фокус на год выше или ниже в том же столбце.',
    checks: [
      { example, steps: [{ focus: year(2030) }], press: 'ArrowDown', expect: [{ focused: year(2033) }] },
      { example, steps: [{ focus: year(2030) }], press: 'ArrowUp', expect: [{ focused: year(2027) }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last year of the row.',
    ru: 'Переносит фокус на первый или последний год строки.',
    checks: [
      { example, steps: [{ focus: year(2030) }], press: 'Home', expect: [{ focused: year(2029) }] },
      { example, steps: [{ focus: year(2030) }], press: 'End', expect: [{ focused: year(2031) }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown', 'Control+Home', 'Control+End'],
    en: 'In a `YearPickerLayout` page: Page Up and Page Down move the focus to the first or last row in the same column; Ctrl + Home and Ctrl + End to the first or last year.',
    ru: 'На странице `YearPickerLayout`: Page Up и Page Down переносят фокус в первую или последнюю строку того же столбца; Ctrl + Home и Ctrl + End — на первый или последний год.',
    checks: [
      { example, steps: [{ focus: year(2033) }], press: 'PageUp', expect: [{ focused: year(2027) }] },
      { example, steps: [{ focus: year(2030) }], press: 'PageDown', expect: [{ focused: year(2036) }] },
      { example, steps: [{ focus: year(2030) }], press: 'Control+Home', expect: [{ focused: year(2026) }] },
      { example, steps: [{ focus: year(2030) }], press: 'Control+End', expect: [{ focused: year(2037) }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused year.',
    ru: 'Выбирает год в фокусе.',
    checks: [
      { example, steps: [{ focus: year(2030) }], press: 'Enter', before: [{ attr: 'aria-selected', of: year(2030), is: 'false' }], expect: [{ attr: 'aria-selected', of: year(2030), is: 'true' }, { attr: 'aria-selected', of: year(2026), is: 'false' }] },
      { example, steps: [{ focus: year(2030) }], press: 'Space', expect: [{ attr: 'aria-selected', of: year(2030), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;

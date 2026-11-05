import type { KeyboardSpec } from './types';

const example = 'month-picker/months-of-one-year.tsx';
const month = (name: string) => ({ role: 'gridcell', name });

export default [
  {
    keys: ['ArrowLeft', 'ArrowRight'],
    en: 'Moves the focus to the previous or next month, wrapping to the neighbouring row. In RTL the arrows are mirrored: ← moves to the next month.',
    ru: 'Переносит фокус на предыдущий или следующий месяц с переходом на соседнюю строку. В RTL стрелки зеркальны: ← ведёт к следующему месяцу.',
    checks: [
      { example, steps: [{ focus: month('March') }], press: 'ArrowRight', expect: [{ focused: month('April') }] },
      { example, steps: [{ focus: month('March') }], press: 'ArrowLeft', expect: [{ focused: month('February') }] },
      { example, dir: 'rtl', steps: [{ focus: month('March') }], press: 'ArrowLeft', expect: [{ focused: month('April') }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Moves the focus to the month above or below in the same column.',
    ru: 'Переносит фокус на месяц выше или ниже в том же столбце.',
    checks: [
      { example, steps: [{ focus: month('March') }], press: 'ArrowDown', expect: [{ focused: month('June') }] },
      { example, steps: [{ focus: month('June') }], press: 'ArrowUp', expect: [{ focused: month('March') }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last month of the row.',
    ru: 'Переносит фокус на первый или последний месяц строки.',
    checks: [
      { example, steps: [{ focus: month('May') }], press: 'Home', expect: [{ focused: month('April') }] },
      { example, steps: [{ focus: month('May') }], press: 'End', expect: [{ focused: month('June') }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown', 'Control+Home', 'Control+End'],
    en: 'Page Up and Page Down move the focus to the first or last row in the same column; Ctrl + Home and Ctrl + End to the first or last month.',
    ru: 'Page Up и Page Down переносят фокус в первую или последнюю строку того же столбца; Ctrl + Home и Ctrl + End — на первый или последний месяц.',
    checks: [
      { example, steps: [{ focus: month('August') }], press: 'PageUp', expect: [{ focused: month('February') }] },
      { example, steps: [{ focus: month('May') }], press: 'PageDown', expect: [{ focused: month('November') }] },
      { example, steps: [{ focus: month('May') }], press: 'Control+Home', expect: [{ focused: month('January') }] },
      { example, steps: [{ focus: month('May') }], press: 'Control+End', expect: [{ focused: month('December') }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused month.',
    ru: 'Выбирает месяц в фокусе.',
    checks: [
      { example, steps: [{ focus: month('May') }], press: 'Enter', before: [{ attr: 'aria-selected', of: month('May'), is: 'false' }], expect: [{ attr: 'aria-selected', of: month('May'), is: 'true' }, { attr: 'aria-selected', of: month('March'), is: 'false' }] },
      { example, steps: [{ focus: month('May') }], press: 'Space', expect: [{ attr: 'aria-selected', of: month('May'), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;

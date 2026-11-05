import type { KeyboardSpec } from './types';

const example = 'data-grid-picker/compact-month-like-matrix.tsx';
const month = (name: string) => ({ role: 'gridcell', name });

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused item.',
    ru: 'Выбирает элемент в фокусе.',
    checks: [
      { example, steps: [{ focus: month('Feb') }], press: 'Enter', before: [{ attr: 'aria-selected', of: month('Feb'), is: 'false' }], expect: [{ attr: 'aria-selected', of: month('Feb'), is: 'true' }, { attr: 'aria-selected', of: month('May'), is: 'false' }] },
      { example, steps: [{ focus: month('Jul') }], press: 'Space', expect: [{ attr: 'aria-selected', of: month('Jul'), is: 'true' }] },
    ],
  },
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'Moves the focus to the next or previous item, wrapping across rows by default (`wrap=\'horizontal\'`). Follows the text direction: in right-to-left, → moves to the previous item.',
    ru: 'Переносит фокус на следующий или предыдущий элемент, по умолчанию переходя через границу строк (`wrap=\'horizontal\'`). Следует направлению текста: в right-to-left → ведёт к предыдущему элементу.',
    checks: [
      { example, steps: [{ focus: month('May') }], press: 'ArrowRight', expect: [{ focused: month('Jun') }] },
      { example, steps: [{ focus: month('Apr') }], press: 'ArrowRight', expect: [{ focused: month('May') }] },
      { example, steps: [{ focus: month('May') }], press: 'ArrowLeft', expect: [{ focused: month('Apr') }] },
      { example, dir: 'rtl', steps: [{ focus: month('May') }], press: 'ArrowLeft', expect: [{ focused: month('Jun') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'Moves the focus to the item below or above.',
    ru: 'Переносит фокус на элемент ниже или выше.',
    checks: [
      { example, steps: [{ focus: month('Feb') }], press: 'ArrowDown', expect: [{ focused: month('Jun') }] },
      { example, steps: [{ focus: month('Oct') }], press: 'ArrowUp', expect: [{ focused: month('Jun') }] },
    ],
  },
  {
    keys: ['Home', 'End', 'PageUp', 'PageDown'],
    en: 'Move the focus to the first or last item of the row, or to the first or last row of the column, as in `DataGrid`.',
    ru: 'Переносят фокус на первый или последний элемент строки либо на первую или последнюю строку колонки, как в `DataGrid`.',
    checks: [
      { example, steps: [{ focus: month('Jul') }], press: 'Home', expect: [{ focused: month('May') }] },
      { example, steps: [{ focus: month('Jun') }], press: 'End', expect: [{ focused: month('Aug') }] },
      { example, steps: [{ focus: month('Oct') }], press: 'PageUp', expect: [{ focused: month('Feb') }] },
      { example, steps: [{ focus: month('Feb') }], press: 'PageDown', expect: [{ focused: month('Oct') }] },
    ],
  },
] satisfies KeyboardSpec;

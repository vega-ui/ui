import type { KeyboardSpec } from './types';

const minimal = 'data-grid-selectable/minimal-composition.tsx';
const blocked = 'data-grid-selectable/exclude-blocked-cells-from-movement.tsx';
const multiple = 'data-grid-selectable/parent-managed-multi-select.tsx';
const range = 'data-grid-selectable/custom-range-grid.tsx';
const cell = (name: string) => ({ role: 'gridcell', name });
const q1 = cell('Q1');
const q2 = cell('Q2');

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused cell. With `selection=\'multiple\'` toggles it in or out of the selection. Disabled cells ignore the key.',
    ru: 'Выбирает ячейку в фокусе. При `selection=\'multiple\'` добавляет её в выбор или убирает из него. Отключённые ячейки игнорируют клавишу.',
    checks: [
      { example: minimal, steps: [{ focus: q1 }], press: 'Enter', before: [{ attr: 'aria-selected', of: q1, is: 'false' }], expect: [{ attr: 'aria-selected', of: q1, is: 'true' }] },
      { example: minimal, steps: [{ focus: q2 }], press: 'Space', before: [{ attr: 'aria-selected', of: q2, is: 'false' }], expect: [{ attr: 'aria-selected', of: q2, is: 'true' }] },
      { example: multiple, steps: [{ focus: cell('Tue Morning') }], press: 'Space', before: [{ attr: 'aria-selected', of: cell('Tue Morning'), is: 'true' }], expect: [{ attr: 'aria-selected', of: cell('Tue Morning'), is: 'false' }, { attr: 'aria-selected', of: cell('Thu Afternoon'), is: 'true' }] },
      { example: multiple, steps: [{ focus: cell('Mon Morning') }], press: 'Enter', expect: [{ attr: 'aria-selected', of: cell('Mon Morning'), is: 'true' }, { attr: 'aria-selected', of: cell('Tue Morning'), is: 'true' }] },
      { example: blocked, steps: [{ focus: cell('Atlas 10:00, booked') }], press: 'Enter', before: [{ attr: 'aria-disabled', of: cell('Atlas 10:00, booked'), is: 'true' }], expect: [{ attr: 'aria-selected', of: cell('Atlas 10:00, booked'), is: 'false' }] },
    ],
  },
  {
    keys: ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'],
    en: 'Move the focus between cells as in `DataGrid`. Disabled cells are skipped unless `excludeDisabled` is `false`.',
    ru: 'Переносят фокус между ячейками как в `DataGrid`. Отключённые ячейки пропускаются, если `excludeDisabled` не равен `false`.',
    checks: [
      { example: blocked, steps: [{ focus: cell('Atlas 09:00') }], press: 'ArrowRight', expect: [{ focused: cell('Atlas 12:00') }] },
      { example: blocked, steps: [{ focus: cell('Atlas 12:00') }], press: 'ArrowLeft', expect: [{ focused: cell('Atlas 09:00') }] },
      { example: blocked, steps: [{ focus: cell('Atlas 13:00') }], press: 'ArrowDown', expect: [{ focused: cell('Borealis 13:00') }] },
      { example: blocked, steps: [{ focus: cell('Cosmos 11:00') }], press: 'ArrowUp', expect: [{ focused: cell('Borealis 11:00') }] },
    ],
  },
  {
    keys: ['Home', 'End', 'PageDown', 'PageUp'],
    en: 'Move the focus to the first or last enabled cell of the row, or to the last or first row of the column, as in `DataGrid`.',
    ru: 'Переносят фокус на первую или последнюю доступную ячейку строки либо на последнюю или первую строку колонки, как в `DataGrid`.',
    checks: [
      { example: blocked, steps: [{ focus: cell('Atlas 13:00') }], press: 'Home', expect: [{ focused: cell('Atlas 09:00') }] },
      { example: blocked, steps: [{ focus: cell('Cosmos 09:00') }], press: 'End', expect: [{ focused: cell('Cosmos 11:00') }] },
      { example: blocked, steps: [{ focus: cell('Atlas 09:00') }], press: 'PageDown', expect: [{ focused: cell('Cosmos 09:00') }] },
      { example: blocked, steps: [{ focus: cell('Cosmos 09:00') }], press: 'PageUp', expect: [{ focused: cell('Atlas 09:00') }] },
    ],
  },
  {
    keys: ['Shift+ArrowDown', 'Shift+ArrowRight'],
    en: 'With `selection=\'range\'` and a selected cell, moves the focus and extends the range to the new cell. `expandable={false}` turns it off.',
    ru: 'При `selection=\'range\'` и выбранной ячейке переносит фокус и расширяет диапазон до новой ячейки. `expandable={false}` отключает это.',
    checks: [
      { example: range, steps: [{ focus: cell('Mon 09:00') }, { press: 'Enter' }], press: 'Shift+ArrowDown', before: [{ attr: 'aria-selected', of: cell('Mon 11:00'), is: 'false' }], expect: [{ focused: cell('Mon 11:00') }, { attr: 'aria-selected', of: cell('Mon 09:00'), is: 'true' }, { attr: 'aria-selected', of: cell('Mon 11:00'), is: 'true' }] },
      { example: range, steps: [{ focus: cell('Mon 09:00') }, { press: 'Enter' }], press: 'Shift+ArrowRight', expect: [{ focused: cell('Tue 09:00') }, { attr: 'aria-selected', of: cell('Tue 09:00'), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;

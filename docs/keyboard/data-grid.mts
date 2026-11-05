import type { KeyboardSpec } from './types';

const example = 'data-grid/minimal-composition.tsx';
const cell = (name: string) => ({ role: 'gridcell', name });
const design = cell('Design');
const build = cell('Build');
const ship = cell('Ship');
const done = cell('Done');
const progress = cell('In progress');
const notStarted = cell('Not started');

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'Moves the focus to the next or previous cell in the row. Follows the text direction: in right-to-left, → moves to the previous cell. Stops at the row edge unless `wrap` is set.',
    ru: 'Переносит фокус на следующую или предыдущую ячейку строки. Следует направлению текста: в right-to-left → ведёт к предыдущей ячейке. Останавливается на краю строки, если не задан `wrap`.',
    checks: [
      { example, steps: [{ focus: design }], press: 'ArrowRight', expect: [{ focused: build }] },
      { example, steps: [{ focus: build }], press: 'ArrowLeft', expect: [{ focused: design }] },
      { example, steps: [{ focus: ship }], press: 'ArrowRight', expect: [{ focused: ship }] },
      { example, dir: 'rtl', steps: [{ focus: design }], press: 'ArrowLeft', expect: [{ focused: build }] },
      { example, dir: 'rtl', steps: [{ focus: build }], press: 'ArrowRight', expect: [{ focused: design }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'Moves the focus to the cell below or above in the same column.',
    ru: 'Переносит фокус на ячейку ниже или выше в той же колонке.',
    checks: [
      { example, steps: [{ focus: design }], press: 'ArrowDown', expect: [{ focused: done }] },
      { example, steps: [{ focus: progress }], press: 'ArrowUp', expect: [{ focused: build }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last cell of the row.',
    ru: 'Переносит фокус на первую или последнюю ячейку строки.',
    checks: [
      { example, steps: [{ focus: ship }], press: 'Home', expect: [{ focused: design }] },
      { example, steps: [{ focus: done }], press: 'End', expect: [{ focused: notStarted }] },
    ],
  },
  {
    keys: ['Control+Home', 'Control+End'],
    en: 'Moves the focus to the first cell of the first row or the last cell of the last row.',
    ru: 'Переносит фокус на первую ячейку первой строки или последнюю ячейку последней строки.',
    checks: [
      { example, steps: [{ focus: notStarted }], press: 'Control+Home', expect: [{ focused: design }] },
      { example, steps: [{ focus: design }], press: 'Control+End', expect: [{ focused: notStarted }] },
    ],
  },
  {
    keys: ['PageDown', 'PageUp'],
    en: 'Moves the focus to the last or first row in the same column, or by `rowDelta` rows when it is set.',
    ru: 'Переносит фокус на последнюю или первую строку в той же колонке, а при заданном `rowDelta` — на столько строк.',
    checks: [
      { example, steps: [{ focus: build }], press: 'PageDown', expect: [{ focused: progress }] },
      { example, steps: [{ focus: notStarted }], press: 'PageUp', expect: [{ focused: ship }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'Moves the focus into the grid on the last active cell and then out of it: the whole grid is one tab stop.',
    ru: 'Вводит фокус в сетку на последнюю активную ячейку и затем выводит из неё: вся сетка — одна остановка табуляции.',
    checks: [
      { example, steps: [{ focus: design }, { press: 'ArrowRight' }, { press: 'Shift+Tab' }], press: 'Tab', before: [{ attr: 'tabindex', of: build, is: '0' }], expect: [{ focused: build }] },
    ],
  },
] satisfies KeyboardSpec;

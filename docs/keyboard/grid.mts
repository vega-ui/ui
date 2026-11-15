import type { KeyboardSpec } from './types';

const example = 'grid/minimal-composition.tsx';
const minimal = 'grid/selection-minimal-composition.tsx';
const blocked = 'grid/booked-rooms.tsx';
const multiple = 'grid/parent-managed-multi-select.tsx';
const range = 'grid/custom-range-grid.tsx';
const sortable = 'grid/sortable-table.tsx';
const editable = 'grid/inline-editing.tsx';
const buttons = 'grid/cell-as-a-button.tsx';
const cell = (name: string) => ({ role: 'gridcell', name });
const design = cell('Design');
const build = cell('Build');
const ship = cell('Ship');
const done = cell('Done');
const progress = cell('In progress');
const notStarted = cell('Not started');
const q1 = cell('Q1');
const q2 = cell('Q2');
const amount = { role: 'columnheader', name: 'Amount' };
const sortByAmount = { role: 'button', name: 'Amount' };
const rentPlanned = { role: 'gridcell', nth: 0 };
const rentPlannedInput = { role: 'textbox', name: 'Rent planned' };

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'Moves the focus to the next or previous cell in the row. Follows the text direction: in right-to-left, → moves to the previous cell. Stops at the row edge unless `wrap` is set. Disabled cells stay reachable; excluded cells are skipped.',
    ru: 'Переносит фокус на следующую или предыдущую ячейку строки. Следует направлению текста: в right-to-left → ведёт к предыдущей ячейке. Останавливается на краю строки, если не задан `wrap`. Отключённые ячейки остаются достижимыми, исключённые пропускаются.',
    checks: [
      { example, steps: [{ focus: design }], press: 'ArrowRight', expect: [{ focused: build }] },
      { example, steps: [{ focus: build }], press: 'ArrowLeft', expect: [{ focused: design }] },
      { example, steps: [{ focus: ship }], press: 'ArrowRight', expect: [{ focused: ship }] },
      { example, dir: 'rtl', steps: [{ focus: design }], press: 'ArrowLeft', expect: [{ focused: build }] },
      { example, dir: 'rtl', steps: [{ focus: build }], press: 'ArrowRight', expect: [{ focused: design }] },
      { example: blocked, steps: [{ focus: cell('Atlas 09:00') }], press: 'ArrowRight', expect: [{ focused: cell('Atlas 12:00') }] },
      { example: blocked, steps: [{ focus: cell('Atlas 12:00') }], press: 'ArrowLeft', expect: [{ focused: cell('Atlas 09:00') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'Moves the focus to the cell below or above in the same column.',
    ru: 'Переносит фокус на ячейку ниже или выше в той же колонке.',
    checks: [
      { example, steps: [{ focus: design }], press: 'ArrowDown', expect: [{ focused: done }] },
      { example, steps: [{ focus: progress }], press: 'ArrowUp', expect: [{ focused: build }] },
      { example: blocked, steps: [{ focus: cell('Atlas 13:00') }], press: 'ArrowDown', expect: [{ focused: cell('Borealis 13:00') }] },
      { example: blocked, steps: [{ focus: cell('Cosmos 11:00') }], press: 'ArrowUp', expect: [{ focused: cell('Borealis 11:00') }] },
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
    en: 'Moves the focus to the last or first row in the same column; `getNextKey` can give another step. When that row has no focusable cell in the column, the focus moves to the nearest row towards the current one that has it.',
    ru: 'Переносит фокус на последнюю или первую строку в той же колонке; `getNextKey` может задать другой шаг. Если в этой строке нет фокусируемой ячейки в колонке, фокус переходит на ближайшую к текущей строку, в которой она есть.',
    checks: [
      { example, steps: [{ focus: build }], press: 'PageDown', expect: [{ focused: progress }] },
      { example, steps: [{ focus: notStarted }], press: 'PageUp', expect: [{ focused: ship }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'With `selection`, selects the focused cell. With `selection=\'multiple\'` toggles it in or out of the selection. Disabled cells ignore the key.',
    ru: 'При `selection` выбирает ячейку в фокусе. При `selection=\'multiple\'` добавляет её в выбор или убирает из него. Отключённые ячейки игнорируют клавишу.',
    checks: [
      { example: minimal, steps: [{ focus: q1 }], press: 'Enter', before: [{ attr: 'aria-selected', of: q1, is: 'false' }], expect: [{ attr: 'aria-selected', of: q1, is: 'true' }] },
      { example: minimal, steps: [{ focus: q2 }], press: 'Space', before: [{ attr: 'aria-selected', of: q2, is: 'false' }], expect: [{ attr: 'aria-selected', of: q2, is: 'true' }] },
      { example: multiple, steps: [{ focus: cell('Tue Morning') }], press: 'Space', before: [{ attr: 'aria-selected', of: cell('Tue Morning'), is: 'true' }], expect: [{ attr: 'aria-selected', of: cell('Tue Morning'), is: 'false' }, { attr: 'aria-selected', of: cell('Thu Afternoon'), is: 'true' }] },
      { example: multiple, steps: [{ focus: cell('Mon Morning') }], press: 'Enter', expect: [{ attr: 'aria-selected', of: cell('Mon Morning'), is: 'true' }, { attr: 'aria-selected', of: cell('Tue Morning'), is: 'true' }] },
      { example: blocked, steps: [{ focus: cell('Atlas 10:00, booked') }], press: 'Enter', before: [{ attr: 'aria-disabled', of: cell('Atlas 10:00, booked'), is: 'true' }], expect: [{ attr: 'aria-selected', of: cell('Atlas 10:00, booked'), is: 'false' }] },
    ],
  },
  {
    keys: ['Shift+ArrowDown', 'Shift+ArrowRight'],
    en: 'With `selection=\'range\'` and a selected cell, moves the focus and extends the range to the new cell. With `selection=\'multiple\'`, moves the focus and adds the cells from the most recently selected cell, or from the focused one when it is not selected anymore, to the new cell.',
    ru: 'При `selection=\'range\'` и выбранной ячейке переносит фокус и расширяет диапазон до новой ячейки. При `selection=\'multiple\'` переносит фокус и добавляет в выбор ячейки от последней выбранной, а если её выбор снят — от ячейки в фокусе, до новой.',
    checks: [
      { example: range, steps: [{ focus: cell('Mon 09:00') }, { press: 'Enter' }], press: 'Shift+ArrowDown', before: [{ attr: 'aria-selected', of: cell('Mon 11:00'), is: 'false' }], expect: [{ focused: cell('Mon 11:00') }, { attr: 'aria-selected', of: cell('Mon 09:00'), is: 'true' }, { attr: 'aria-selected', of: cell('Mon 11:00'), is: 'true' }] },
      { example: range, steps: [{ focus: cell('Mon 09:00') }, { press: 'Enter' }], press: 'Shift+ArrowRight', expect: [{ focused: cell('Tue 09:00') }, { attr: 'aria-selected', of: cell('Tue 09:00'), is: 'true' }] },
      { example: multiple, steps: [{ focus: cell('Mon Morning') }], press: 'Shift+ArrowRight', before: [{ attr: 'aria-selected', of: cell('Mon Morning'), is: 'false' }], expect: [{ focused: cell('Tue Morning') }, { attr: 'aria-selected', of: cell('Mon Morning'), is: 'true' }, { attr: 'aria-selected', of: cell('Tue Morning'), is: 'true' }] },
    ],
  },
  {
    keys: ['Enter', 'F2'],
    en: 'On a cell or header with interactive content, like an input or a sort button, moves the focus to its first focusable element. Without such content Enter selects the cell as above, and a cell that is itself a button, `<GridCell asChild><button /></GridCell>`, is pressed like a button.',
    ru: 'На ячейке или заголовке с интерактивным содержимым, например полем ввода или кнопкой сортировки, переносит фокус на его первый фокусируемый элемент. Без такого содержимого Enter выбирает ячейку, как описано выше, а ячейка, которая сама является кнопкой, `<GridCell asChild><button /></GridCell>`, нажимается, как кнопка.',
    checks: [
      { example: sortable, steps: [{ focus: amount }], press: 'Enter', expect: [{ focused: sortByAmount }] },
      { example: editable, steps: [{ focus: rentPlanned }], press: 'F2', expect: [{ focused: rentPlannedInput }] },
      { example: editable, steps: [{ focus: rentPlanned }], press: 'Enter', expect: [{ focused: rentPlannedInput }] },
      { example: buttons, steps: [{ focus: cell('Degree sign') }], press: 'Enter', expect: [{ value: 'Oven at 180°', of: { role: 'textbox', name: 'Note' } }, { focused: cell('Degree sign') }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Inside the cell content, returns the focus to the cell. Other keys pressed inside the content, like the arrows in an input, stay with the content.',
    ru: 'Внутри содержимого ячейки возвращает фокус на ячейку. Остальные клавиши, нажатые внутри содержимого, например стрелки в поле ввода, остаются у содержимого.',
    checks: [
      { example: editable, steps: [{ focus: rentPlanned }, { press: 'Enter' }], press: 'Escape', expect: [{ focused: rentPlanned }] },
      { example: sortable, steps: [{ focus: amount }, { press: 'Enter' }], press: 'Escape', expect: [{ focused: amount }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus into the grid on the last active cell and then out of it: the whole grid is one tab stop, and the buttons and inputs inside the cells are skipped. Inside the cell content, moves the focus between the focusable elements of that cell in a loop.',
    ru: 'Вводит фокус в сетку на последнюю активную ячейку и затем выводит из неё: вся сетка — одна остановка табуляции, а кнопки и поля ввода внутри ячеек пропускаются. Внутри содержимого ячейки переносит фокус по кругу между фокусируемыми элементами этой ячейки.',
    checks: [
      { example, steps: [{ focus: design }, { press: 'ArrowRight' }, { press: 'Shift+Tab' }], press: 'Tab', before: [{ attr: 'tabindex', of: build, is: '0' }], expect: [{ focused: build }] },
      { example: editable, steps: [{ focus: rentPlanned }], press: 'Tab', expect: [{ focused: { role: 'button', name: 'Reset' } }] },
      { example: editable, steps: [{ focus: rentPlanned }, { press: 'Enter' }], press: 'Tab', expect: [{ focused: rentPlannedInput }] },
    ],
  },
  {
    keys: ['Control+A'],
    en: 'With `selection=\'multiple\'`, selects every enabled cell that is not excluded. Command+A on macOS. A `range` selection has two ends picked by the user, so it does not select all.',
    ru: 'При `selection=\'multiple\'` выбирает все включённые и не исключённые ячейки. На macOS — Command+A. У выбора `range` два конца, которые выбирает пользователь, поэтому «выбрать всё» в нём нет.',
    checks: [
      { example: multiple, steps: [{ focus: cell('Mon Morning') }], press: 'Control+a', before: [{ attr: 'aria-selected', of: cell('Fri Evening'), is: 'false' }], expect: [{ attr: 'aria-selected', of: cell('Mon Morning'), is: 'true' }, { attr: 'aria-selected', of: cell('Fri Evening'), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;

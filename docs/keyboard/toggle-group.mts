import type { KeyboardSpec } from './types';

const example = 'toggle-group/minimal-composition.tsx';
const start = { role: 'radio', name: 'Align start' };
const center = { role: 'radio', name: 'Align center' };
const end = { role: 'radio', name: 'Align end' };

const filters = 'toggle-group/priority-filters.tsx';
const urgent = { role: 'button', name: 'Urgent' };
const high = { role: 'button', name: 'High' };
const clear = { role: 'button', name: 'Clear' };

const quality = 'toggle-group/video-quality.tsx';
const auto = { role: 'radio', name: 'Auto' };
const fullHd = { role: 'radio', name: '1080p' };

export default [
  {
    keys: ['ArrowRight', 'ArrowDown'],
    en: 'Moves the focus to the next enabled item without pressing it, skipping disabled ones. From the last item it moves to the first. The Left and Right arrows follow the text direction, so they are mirrored in right-to-left.',
    ru: 'Переносит фокус на следующий доступный элемент, не нажимая его и пропуская отключённые. С последнего элемента переходит на первый. Стрелки влево и вправо следуют направлению текста, поэтому в right-to-left они зеркальны.',
    checks: [
      { example, steps: [{ focus: start }], press: 'ArrowRight', before: [{ attr: 'aria-checked', of: start, is: 'true' }], expect: [{ focused: center }, { attr: 'aria-checked', of: center, is: 'false' }, { attr: 'aria-checked', of: start, is: 'true' }] },
      { example, steps: [{ focus: start }], press: 'ArrowDown', expect: [{ focused: center }] },
      { example, steps: [{ focus: start }, { press: 'End' }], press: 'ArrowRight', expect: [{ focused: start }] },
      { example, dir: 'rtl', steps: [{ focus: start }], press: 'ArrowLeft', expect: [{ focused: center }] },
      { example: quality, steps: [{ focus: auto }, { press: 'End' }], press: 'ArrowRight', before: [{ focused: fullHd }], expect: [{ focused: auto }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowUp'],
    en: 'Moves the focus to the previous enabled item without pressing it. From the first item it moves to the last.',
    ru: 'Переносит фокус на предыдущий доступный элемент, не нажимая его. С первого элемента переходит на последний.',
    checks: [
      { example, steps: [{ focus: start }, { press: 'ArrowRight' }], press: 'ArrowLeft', expect: [{ focused: start }] },
      { example, steps: [{ focus: start }], press: 'ArrowLeft', expect: [{ focused: end }, { attr: 'aria-checked', of: end, is: 'false' }] },
      { example, steps: [{ focus: start }], press: 'ArrowUp', expect: [{ focused: end }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last enabled item without pressing it.',
    ru: 'Переносит фокус на первый или последний доступный элемент, не нажимая его.',
    checks: [
      { example, steps: [{ focus: start }], press: 'End', expect: [{ focused: end }, { attr: 'aria-checked', of: start, is: 'true' }] },
      { example, steps: [{ focus: start }, { press: 'End' }], press: 'Home', expect: [{ focused: start }] },
    ],
  },
  {
    keys: ['Space', 'Enter'],
    en: 'Presses the focused item. Without `multiple`, it releases the item that was pressed, and pressing the pressed item keeps it pressed; with `multiple`, it presses or releases the focused item by itself.',
    ru: 'Нажимает элемент в фокусе. Без `multiple` отжимает тот, что был нажат, а нажатый элемент остаётся нажатым; с `multiple` нажимает или отжимает элемент в фокусе сам по себе.',
    checks: [
      { example, steps: [{ focus: start }, { press: 'ArrowRight' }], press: 'Space', expect: [{ attr: 'aria-checked', of: center, is: 'true' }, { attr: 'aria-checked', of: start, is: 'false' }, { focused: center }] },
      { example, steps: [{ focus: start }, { press: 'ArrowRight' }], press: 'Enter', expect: [{ attr: 'aria-checked', of: center, is: 'true' }] },
      { example, steps: [{ focus: start }], press: 'Space', expect: [{ attr: 'aria-checked', of: start, is: 'true' }] },
      { example: filters, steps: [{ focus: urgent }], press: 'Space', before: [{ attr: 'aria-pressed', of: urgent, is: 'true' }], expect: [{ attr: 'aria-pressed', of: urgent, is: 'false' }] },
      { example: filters, steps: [{ focus: high }], press: 'Enter', expect: [{ attr: 'aria-pressed', of: high, is: 'true' }, { attr: 'aria-pressed', of: urgent, is: 'true' }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'The group is one tab stop on the pressed item, or on the first enabled item when none is pressed. Tab and Shift+Tab leave the group from any item, and once the focus has left, the tab stop goes back to the pressed item.',
    ru: 'Группа — одна остановка табуляции на нажатом элементе или, если нажатого нет, на первом доступном. Tab и Shift+Tab выводят из группы с любого элемента, а когда фокус ушёл, остановка возвращается на нажатый элемент.',
    checks: [
      { example: filters, steps: [{ focus: urgent }, { press: 'ArrowRight' }], press: 'Tab', expect: [{ focused: clear }] },
      { example: filters, steps: [{ focus: urgent }, { press: 'ArrowRight' }, { press: 'Tab' }], press: 'Shift+Tab', before: [{ attr: 'tabindex', of: urgent, is: '0' }], expect: [{ focused: urgent }] },
      { example, steps: [{ focus: start }, { press: 'ArrowRight' }, { press: 'Tab' }], press: 'Shift+Tab', expect: [{ focused: start }] },
    ],
  },
] satisfies KeyboardSpec;

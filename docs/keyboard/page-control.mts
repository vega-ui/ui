import type { KeyboardSpec } from './types';

const example = 'page-control/carousel-indicators.tsx';
const first = { role: 'tab', name: 'Plan your week, 1 of 3' };
const second = { role: 'tab', name: 'Share with your team, 2 of 3' };
const third = { role: 'tab', name: 'Stay on track, 3 of 3' };

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'Activates and focuses the next or previous enabled item, skipping disabled ones. From the last item it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left.',
    ru: 'Активирует следующий или предыдущий доступный элемент и переносит на него фокус, пропуская отключённые. С последнего элемента переходит на первый, а с первого — на последний. Клавиши следуют направлению текста, поэтому в right-to-left они зеркальны.',
    checks: [
      { example, steps: [{ focus: first }], press: 'ArrowRight', before: [{ attr: 'aria-selected', of: second, is: 'false' }], expect: [{ focused: second }, { attr: 'aria-selected', of: second, is: 'true' }, { attr: 'aria-selected', of: first, is: 'false' }] },
      { example, steps: [{ focus: first }, { press: 'ArrowRight' }], press: 'ArrowLeft', expect: [{ focused: first }, { attr: 'aria-selected', of: first, is: 'true' }] },
      { example, steps: [{ focus: first }, { press: 'ArrowRight' }, { press: 'ArrowRight' }], press: 'ArrowRight', expect: [{ focused: first }, { attr: 'aria-selected', of: first, is: 'true' }] },
      { example, steps: [{ focus: first }], press: 'ArrowLeft', expect: [{ focused: third }, { attr: 'aria-selected', of: third, is: 'true' }] },
      { example, dir: 'rtl', steps: [{ focus: first }], press: 'ArrowLeft', expect: [{ focused: second }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Activates and focuses the first or last enabled item.',
    ru: 'Активирует первый или последний доступный элемент и переносит на него фокус.',
    checks: [
      { example, steps: [{ focus: first }], press: 'End', expect: [{ focused: third }, { attr: 'aria-selected', of: third, is: 'true' }] },
      { example, steps: [{ focus: first }, { press: 'End' }], press: 'Home', expect: [{ focused: first }, { attr: 'aria-selected', of: first, is: 'true' }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'Moves the focus to the active item and then out of the control: the items are one tab stop.',
    ru: 'Переносит фокус на активный элемент и затем за пределы контрола: элементы — одна остановка табуляции.',
    checks: [
      { example, steps: [{ focus: first }, { press: 'ArrowRight' }, { press: 'Shift+Tab' }], press: 'Tab', before: [{ attr: 'tabindex', of: second, is: '0' }], expect: [{ focused: second }] },
    ],
  },
] satisfies KeyboardSpec;

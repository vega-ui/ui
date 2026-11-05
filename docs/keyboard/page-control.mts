import type { KeyboardSpec } from './types';

const example = 'page-control/carousel-indicators.tsx';
const first = { role: 'tab', name: 'Plan your week, 1 of 3' };
const second = { role: 'tab', name: 'Share with your team, 2 of 3' };
const third = { role: 'tab', name: 'Stay on track, 3 of 3' };

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'Activates and focuses the next or previous item. Stops at the first and last item. The keys do not follow the text direction: → always moves to the next index, also in right-to-left.',
    ru: 'Активирует следующий или предыдущий элемент и переносит на него фокус. Останавливается на первом и последнем элементе. Клавиши не следуют направлению текста: → всегда ведёт к следующему индексу, в том числе в right-to-left.',
    checks: [
      { example, steps: [{ focus: first }], press: 'ArrowRight', before: [{ attr: 'aria-selected', of: second, is: 'false' }], expect: [{ focused: second }, { attr: 'aria-selected', of: second, is: 'true' }, { attr: 'aria-selected', of: first, is: 'false' }] },
      { example, steps: [{ focus: first }, { press: 'ArrowRight' }], press: 'ArrowLeft', expect: [{ focused: first }, { attr: 'aria-selected', of: first, is: 'true' }] },
      { example, steps: [{ focus: first }, { press: 'ArrowRight' }, { press: 'ArrowRight' }], press: 'ArrowRight', expect: [{ focused: third }, { attr: 'aria-selected', of: third, is: 'true' }] },
      { example, dir: 'rtl', steps: [{ focus: first }], press: 'ArrowRight', expect: [{ focused: second }] },
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

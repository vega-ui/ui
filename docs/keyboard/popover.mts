import type { KeyboardSpec } from './types';

const example = 'popover/anchored-user-menu.tsx';
const trigger = { role: 'button', name: 'Maria Chen' };
const popover = { role: 'dialog', name: 'Account' };
const profile = { role: 'link', name: 'Profile' };
const open = [{ focus: trigger }, { press: 'Enter' }];

export default [
  {
    keys: ['Enter', 'Space'],
    en: 'On the trigger: opens or closes the popover. The focus stays on the trigger.',
    ru: 'На триггере: открывает или закрывает поповер. Фокус остаётся на триггере.',
    checks: [
      { example, steps: [{ focus: trigger }], press: 'Enter', before: [{ hidden: popover }], expect: [{ visible: popover }, { focused: trigger }] },
      { example, steps: [{ focus: trigger }], press: 'Space', before: [{ hidden: popover }], expect: [{ visible: popover }, { focused: trigger }] },
      { example, steps: open, press: 'Enter', before: [{ visible: profile }], expect: [{ hidden: popover }, { focused: trigger }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'From the trigger of an open popover, `Tab` moves the focus into its content, which follows the trigger in the tab order. Leaving the content with the focus does not close the popover.',
    ru: 'С триггера открытого поповера `Tab` переносит фокус в его содержимое, которое идёт в порядке табуляции сразу за триггером. Уход фокуса из содержимого поповер не закрывает.',
    checks: [
      { example, steps: open, press: 'Tab', before: [{ visible: profile }], expect: [{ focused: profile }] },
      { example, steps: [...open, { focus: profile }], press: 'Shift+Tab', before: [{ focused: profile }], expect: [{ focused: trigger }, { visible: popover }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the popover. If the focus was inside, it returns to the trigger.',
    ru: 'Закрывает поповер. Если фокус был внутри, он возвращается на триггер.',
    checks: [
      { example, steps: [...open, { focus: profile }], press: 'Escape', before: [{ focused: profile }], expect: [{ hidden: popover }, { focused: trigger }] },
      { example, steps: open, press: 'Escape', before: [{ visible: profile }], expect: [{ hidden: popover }, { focused: trigger }] },
    ],
  },
] satisfies KeyboardSpec;

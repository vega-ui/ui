import type { KeyboardSpec } from './types';

const example = 'tabs/minimal-composition.tsx';
const overview = { role: 'tab', name: 'Overview' };
const activity = { role: 'tab', name: 'Activity' };
const settings = { role: 'tab', name: 'Settings' };

const vertical = 'tabs/vertical-settings.tsx';
const notifications = { role: 'tab', name: 'Notifications' };
const privacy = { role: 'tab', name: 'Privacy' };
const security = { role: 'tab', name: 'Security' };

const manual = 'tabs/manual-activation-loading.tsx';
const invoices = { role: 'tab', name: 'Invoices' };
const payouts = { role: 'tab', name: 'Payouts' };

const limited = 'tabs/plan-limited-tab.tsx';
const members = { role: 'tab', name: 'Members' };
const roles = { role: 'tab', name: 'Roles' };
const audit = { role: 'tab', name: 'Audit log' };

export default [
  {
    keys: ['ArrowRight', 'ArrowLeft'],
    en: 'In a horizontal list: moves the focus to the next or previous enabled tab, skipping disabled ones, and shows it unless `activation` is `manual`. From the last tab it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left.',
    ru: 'В горизонтальном списке: переносит фокус на следующую или предыдущую доступную вкладку, пропуская отключённые, и показывает её, если `activation` не `manual`. С последней вкладки переходит на первую, а с первой — на последнюю. Клавиши следуют направлению текста, поэтому в right-to-left они зеркальны.',
    checks: [
      { example, steps: [{ focus: overview }], press: 'ArrowRight', before: [{ attr: 'aria-selected', of: activity, is: 'false' }], expect: [{ focused: activity }, { attr: 'aria-selected', of: activity, is: 'true' }, { attr: 'aria-selected', of: overview, is: 'false' }] },
      { example, steps: [{ focus: overview }, { press: 'ArrowRight' }], press: 'ArrowLeft', expect: [{ focused: overview }, { attr: 'aria-selected', of: overview, is: 'true' }] },
      { example, steps: [{ focus: overview }], press: 'ArrowLeft', expect: [{ focused: settings }, { attr: 'aria-selected', of: settings, is: 'true' }] },
      { example, steps: [{ focus: overview }, { press: 'ArrowLeft' }], press: 'ArrowRight', expect: [{ focused: overview }] },
      { example, dir: 'rtl', steps: [{ focus: overview }], press: 'ArrowLeft', expect: [{ focused: activity }] },
      { example: limited, steps: [{ focus: members }], press: 'ArrowRight', expect: [{ focused: roles }] },
      { example: limited, steps: [{ focus: members }, { press: 'ArrowRight' }], press: 'ArrowRight', expect: [{ focused: members }, { attr: 'aria-selected', of: audit, is: 'false' }] },
      { example: manual, steps: [{ focus: invoices }], press: 'ArrowRight', expect: [{ focused: payouts }, { attr: 'aria-selected', of: payouts, is: 'false' }, { attr: 'aria-selected', of: invoices, is: 'true' }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In a vertical list: moves the focus to the next or previous enabled tab and shows it unless `activation` is `manual`, wrapping around the ends.',
    ru: 'В вертикальном списке: переносит фокус на следующую или предыдущую доступную вкладку и показывает её, если `activation` не `manual`; с краёв переходит на противоположный конец.',
    checks: [
      { example: vertical, steps: [{ focus: notifications }], press: 'ArrowDown', expect: [{ focused: privacy }, { attr: 'aria-selected', of: privacy, is: 'true' }] },
      { example: vertical, steps: [{ focus: notifications }], press: 'ArrowUp', expect: [{ focused: security }, { attr: 'aria-selected', of: security, is: 'true' }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last enabled tab and shows it unless `activation` is `manual`.',
    ru: 'Переносит фокус на первую или последнюю доступную вкладку и показывает её, если `activation` не `manual`.',
    checks: [
      { example, steps: [{ focus: overview }], press: 'End', expect: [{ focused: settings }, { attr: 'aria-selected', of: settings, is: 'true' }] },
      { example, steps: [{ focus: overview }, { press: 'End' }], press: 'Home', expect: [{ focused: overview }, { attr: 'aria-selected', of: overview, is: 'true' }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'With `activation="manual"`: shows the focused tab.',
    ru: 'При `activation="manual"`: показывает вкладку в фокусе.',
    checks: [
      { example: manual, steps: [{ focus: invoices }, { press: 'ArrowRight' }], press: 'Enter', expect: [{ focused: payouts }, { attr: 'aria-selected', of: payouts, is: 'true' }] },
      { example: manual, steps: [{ focus: invoices }, { press: 'ArrowRight' }], press: 'Space', expect: [{ attr: 'aria-selected', of: payouts, is: 'true' }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'The list is one tab stop on the selected tab: Tab moves the focus from it to the shown panel, and Shift+Tab from the panel back to the selected tab.',
    ru: 'Список — одна остановка табуляции на выбранной вкладке: Tab переносит фокус с неё на показанную панель, а Shift+Tab — с панели обратно на выбранную вкладку.',
    checks: [
      { example, steps: [{ focus: overview }, { press: 'ArrowRight' }], press: 'Tab', expect: [{ focused: { role: 'tabpanel', name: 'Activity' } }] },
      { example, steps: [{ focus: overview }, { press: 'ArrowRight' }, { press: 'Tab' }], press: 'Shift+Tab', expect: [{ focused: activity }] },
      { example: manual, steps: [{ focus: invoices }, { press: 'ArrowRight' }, { press: 'Tab' }], press: 'Shift+Tab', before: [{ attr: 'tabindex', of: invoices, is: '0' }], expect: [{ focused: invoices }] },
    ],
  },
] satisfies KeyboardSpec;

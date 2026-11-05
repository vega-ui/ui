import type { KeyboardSpec } from './types';

const example = 'select/field-variant.tsx';
const combobox = { role: 'combobox', name: 'Route the ticket to' };
const option = (name: string) => ({ role: 'option', name });
const closed = { attr: 'aria-expanded', of: combobox, is: 'false' };
const opened = { attr: 'aria-expanded', of: combobox, is: 'true' };
const open = [{ focus: combobox }, { press: 'ArrowDown' }];

export default [
  {
    keys: ['ArrowDown', 'ArrowUp', 'Enter', 'Space'],
    en: 'On the closed combobox: opens the list and makes the selected option, or the first one, active. The focus stays on the combobox.',
    ru: 'На закрытом комбобоксе: открывает список и делает активным выбранный вариант или первый. Фокус остаётся на комбобоксе.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 'ArrowDown', before: [closed], expect: [opened, { active: option('Billing') }, { focused: combobox }] },
      { example, steps: [{ focus: combobox }], press: 'ArrowUp', before: [closed], expect: [opened, { active: option('Billing') }] },
      { example, steps: [{ focus: combobox }], press: 'Enter', before: [closed], expect: [opened, { active: option('Billing') }] },
      { example, steps: [{ focus: combobox }], press: 'Space', before: [closed], expect: [opened, { active: option('Billing') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In the open list: moves the active option to the next or previous enabled one and stops at the ends.',
    ru: 'В открытом списке: переносит активный вариант на следующий или предыдущий доступный и останавливается на краях.',
    checks: [
      { example, steps: open, press: 'ArrowDown', before: [{ active: option('Billing') }], expect: [{ active: option('Onboarding') }, { focused: combobox }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'ArrowUp', before: [{ active: option('Onboarding') }], expect: [{ active: option('Billing') }] },
      { example, steps: open, press: 'ArrowUp', expect: [{ active: option('Billing') }, opened] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Makes the first or last enabled option active, opening the list if it is closed.',
    ru: 'Делает активным первый или последний доступный вариант и открывает список, если он закрыт.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 'End', before: [closed], expect: [opened, { active: option('Customer success') }] },
      { example, steps: [...open, { press: 'End' }], press: 'Home', before: [{ active: option('Customer success') }], expect: [{ active: option('Billing') }] },
    ],
  },
  {
    keys: ['PageDown', 'PageUp'],
    en: 'Moves the active option 10 options down or up, stopping at the last or first one.',
    ru: 'Переносит активный вариант на 10 вариантов вниз или вверх, останавливаясь на последнем или первом.',
    checks: [
      { example, steps: open, press: 'PageDown', before: [{ active: option('Billing') }], expect: [{ active: option('Customer success') }] },
      { example, steps: [...open, { press: 'End' }], press: 'PageUp', before: [{ active: option('Customer success') }], expect: [{ active: option('Billing') }] },
    ],
  },
  {
    keys: ['s'],
    en: 'Typeahead: a printable character makes the next option whose label starts with the typed text active; characters typed quickly add up. On the closed combobox it also opens the list without selecting.',
    ru: 'Поиск при наборе: печатный символ делает активным следующий вариант, чья подпись начинается с набранного текста; быстро набранные символы складываются. На закрытом комбобоксе он также открывает список, не выбирая вариант.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 's', before: [closed], expect: [opened, { active: option('Security & compliance') }, { attr: 'aria-selected', of: option('Security & compliance'), is: 'false' }] },
      { example, steps: open, press: 's', before: [{ active: option('Billing') }], expect: [{ active: option('Security & compliance') }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'In the open list: selects the active option and closes the list. The focus stays on the combobox.',
    ru: 'В открытом списке: выбирает активный вариант и закрывает список. Фокус остаётся на комбобоксе.',
    checks: [
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Enter', before: [opened], expect: [closed, { focused: combobox }] },
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Space', before: [opened], expect: [closed, { focused: combobox }] },
      { example, steps: [...open, { press: 'ArrowDown' }, { press: 'Enter' }], press: 'ArrowDown', before: [closed], expect: [{ attr: 'aria-selected', of: option('Onboarding'), is: 'true' }, { active: option('Onboarding') }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the list without changing the value. The focus stays on the combobox.',
    ru: 'Закрывает список, не меняя значение. Фокус остаётся на комбобоксе.',
    checks: [
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Escape', before: [opened], expect: [closed, { focused: combobox }] },
      { example, steps: [...open, { press: 'ArrowDown' }, { press: 'Escape' }], press: 'ArrowDown', before: [closed], expect: [{ attr: 'aria-selected', of: option('Onboarding'), is: 'false' }, { active: option('Billing') }] },
    ],
  },
  {
    keys: ['Alt+ArrowUp'],
    en: 'Closes the list without changing the value.',
    ru: 'Закрывает список, не меняя значение.',
    checks: [
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Alt+ArrowUp', before: [opened], expect: [closed, { focused: combobox }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'In the open list: selects the active option if it was moved to from the keyboard, closes the list and moves the focus on.',
    ru: 'В открытом списке: выбирает активный вариант, если к нему перешли с клавиатуры, закрывает список и переносит фокус дальше.',
    checks: [
      { example, steps: [...open, { press: 'ArrowDown' }], press: 'Tab', before: [opened], expect: [closed] },
      { example, steps: [...open, { press: 'ArrowDown' }, { press: 'Tab' }, { focus: combobox }], press: 'ArrowDown', before: [closed], expect: [{ attr: 'aria-selected', of: option('Onboarding'), is: 'true' }] },
    ],
  },
] satisfies KeyboardSpec;

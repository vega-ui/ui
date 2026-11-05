import type { KeyboardSpec } from './types';

const basic = 'listbox/basic-usage.tsx';
const disabled = 'listbox/disabled-options.tsx';
const several = 'listbox/several-choices.tsx';
const filtered = 'listbox/filtered-options.tsx';
const labels = { role: 'listbox', name: 'Labels' };
const delivery = { role: 'listbox', name: 'Delivery method' };
const sizes = { role: 'listbox', name: 'Size' };
const toppings = { role: 'listbox', name: 'Toppings' };
const option = (name: string | RegExp) => ({ role: 'option', name });

export default [
  {
    keys: ['Tab'],
    en: 'Moves the focus to the list, which makes the selected option, or the first enabled one, active. The list is one tab stop.',
    ru: 'Переносит фокус на список, и активным становится выбранный вариант или первый доступный. Список — одна остановка табуляции.',
    checks: [
      { example: filtered, steps: [{ focus: { role: 'textbox', name: 'Filter labels' } }], press: 'Tab', expect: [{ focused: labels }, { active: option('bug') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'Makes the next or previous enabled option active, skipping disabled ones and stopping at the ends. The focus stays on the list.',
    ru: 'Делает активным следующий или предыдущий доступный вариант, пропуская отключённые и останавливаясь на краях. Фокус остаётся на списке.',
    checks: [
      { example: disabled, steps: [{ focus: sizes }], press: 'ArrowDown', before: [{ active: option(/^M/) }], expect: [{ active: option(/^XL/) }, { focused: sizes }] },
      { example: disabled, steps: [{ focus: sizes }, { press: 'ArrowUp' }], press: 'ArrowUp', before: [{ active: option(/^S\s?\d/) }], expect: [{ active: option(/^S\s?\d/) }] },
      { example: basic, steps: [{ focus: delivery }], press: 'ArrowUp', before: [{ active: option('Courier to the door') }], expect: [{ active: option('Pickup point') }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Makes the first or last enabled option active.',
    ru: 'Делает активным первый или последний доступный вариант.',
    checks: [
      { example: disabled, steps: [{ focus: sizes }], press: 'Home', before: [{ active: option(/^M/) }], expect: [{ active: option(/^S\s?\d/) }] },
      { example: disabled, steps: [{ focus: sizes }, { press: 'Home' }], press: 'End', expect: [{ active: option(/^XL/) }] },
    ],
  },
  {
    keys: ['PageDown', 'PageUp'],
    en: 'Moves the active option 10 options down or up, stopping at the last or first enabled one.',
    ru: 'Переносит активный вариант на 10 вариантов вниз или вверх, останавливаясь на последнем или первом доступном.',
    checks: [
      { example: filtered, steps: [{ focus: labels }], press: 'PageDown', before: [{ active: option('bug') }], expect: [{ active: option('wontfix') }] },
      { example: filtered, steps: [{ focus: labels }, { press: 'End' }], press: 'PageUp', before: [{ active: option('duplicate') }], expect: [{ active: option('feature') }] },
      { example: basic, steps: [{ focus: delivery }], press: 'PageDown', before: [{ active: option('Courier to the door') }], expect: [{ active: option('Parcel locker') }] },
    ],
  },
  {
    keys: ['p'],
    en: 'Typeahead: a printable character makes the next option whose label starts with the typed text active; characters typed quickly add up. Turned off with `typeahead={false}`.',
    ru: 'Поиск при наборе: печатный символ делает активным следующий вариант, чья подпись начинается с набранного текста; быстро набранные символы складываются. Отключается через `typeahead={false}`.',
    checks: [
      { example: basic, steps: [{ focus: delivery }], press: 'p', before: [{ active: option('Courier to the door') }], expect: [{ active: option('Parcel locker') }, { attr: 'aria-selected', of: option('Parcel locker'), is: 'false' }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the active option. With `multiple`, toggles it and keeps the other selected options.',
    ru: 'Выбирает активный вариант. С `multiple` переключает его, сохраняя остальные выбранные варианты.',
    checks: [
      { example: basic, steps: [{ focus: delivery }, { press: 'ArrowDown' }], press: 'Enter', before: [{ attr: 'aria-selected', of: option('Parcel locker'), is: 'false' }], expect: [{ attr: 'aria-selected', of: option('Parcel locker'), is: 'true' }, { attr: 'aria-selected', of: option('Courier to the door'), is: 'false' }] },
      { example: several, steps: [{ focus: toppings }, { press: 'ArrowDown' }], press: 'Space', before: [{ active: option('Mushrooms') }, { attr: 'aria-selected', of: option('Mushrooms'), is: 'false' }], expect: [{ attr: 'aria-selected', of: option('Mushrooms'), is: 'true' }, { attr: 'aria-selected', of: option('Extra mozzarella'), is: 'true' }] },
      { example: several, steps: [{ focus: toppings }], press: 'Space', before: [{ active: option('Extra mozzarella') }], expect: [{ attr: 'aria-selected', of: option('Extra mozzarella'), is: 'false' }] },
    ],
  },
] satisfies KeyboardSpec;
